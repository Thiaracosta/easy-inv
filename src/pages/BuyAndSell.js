import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Buttons from '../components/Buttons';
import invContext from '../context/invContext';
import Table from '../components/Table';
import InputValue from '../components/InputValue';
import Message from '../components/Message';
import stockExchange from '../stockExchangeAPI';

import './buyAndSell.css'

function BuyAndSell() {
  const history = useHistory();
  // const { actions } = useContext(invContext);
  const [actions ,  setActions] = useState(stockExchange);
  const [filterCompany, setFilterCompany] = React.useState([]);
  const [transaction, setTransaction] = useState({});
  const [myActions, setMyActions] = useState(() => {
    const response = JSON.parse(localStorage.getItem('user'));
    return response.myActions;
  });
  const [clientAccount, setClientAccount] = useState(() => {
    const response = JSON.parse(localStorage.getItem('user'));
    return response.account;
  });
  const [company, setCompany ] = useState(() => {
    const response = JSON.parse(localStorage.getItem('user'));
    return response.company;
  })
  const [visibleMsg, setVisibleMsg] = useState(false);
  const [textMsg, setTextMsg] = useState("");
  
  useEffect(() => {
    console.log('---------------', company);
      const response = JSON.parse(localStorage.getItem('user'));
      setFilterCompany(response.myActions);
      
      const filterAction = myActions.filter((item) => item.company === company)
      setFilterCompany(filterAction);
      if(filterAction.length === 0) {
        const filter = actions.filter((item) => item.company === company);
        const newAction = [{company: filter[0].company, quantity: 0, price: filter[0].price}]
        setFilterCompany(newAction);
      } else {
        setFilterCompany(filterAction);
        console.log('debug', filterCompany);
      }
  }, []);

  const hadleValueType = (e) => {
    const value = e.target.value;
    const type = e.target.name;
    setTransaction({
      value, type
    })
  }

  const handleTransactionConfirm = () => {
    const response = JSON.parse(localStorage.getItem('user'));
    setClientAccount(response.account);
    setMyActions(response.myActions);

    const valueCompany = Number(filterCompany[0].price);
    const { type, value } = transaction;

    const index = myActions.findIndex((item) => {
      return item.company === filterCompany[0].company
    });

    const amount = value * valueCompany;

    if (type === "Comprar") {
      if(amount > clientAccount || clientAccount === 0) {
        setTextMsg("Saldo insuficente");
        return setVisibleMsg(true);
      } else {
        const balance = clientAccount - amount;

        if(index === -1) {
          const filter = filterCompany[0];
          filter.quantity = Number(value);
          localStorage.setItem('user', JSON.stringify({ ...response,
            account: balance, myActions: [...response.myActions, filter]
          }));
        } else {
          const actions = myActions[index];
          actions.quantity = Number(actions.quantity) + Number(value);
          const atualiza = myActions.filter((item) => item.company !== actions.company)
          
          localStorage.setItem('user', JSON.stringify({ ...response,
            account: balance, myActions: [...atualiza, actions],
          }));
        }
        setClientAccount(balance);
        setTextMsg("Compra feita com sucesso");
        return setVisibleMsg(true);
      }
    }

    if (type === "Vender") {
      if(index === -1) {
        setTextMsg("Não possui nenhuma ação dessa companhia");
        return setVisibleMsg(true);
      }
      if (Number(myActions[index].quantity) < Number(value)) {
        setTextMsg("Você não possui essa quantidade de ações");
        return setVisibleMsg(true);
      }
      const balance = clientAccount + amount;
      const actions = myActions[index];
      actions.quantity = Number(actions.quantity) - Number(value);
      const atualiza = myActions.filter((item) => item.company !== actions.company)
      if (actions.quantity === 0) {
        localStorage.setItem('user', JSON.stringify({ ...response,
          account: balance, myActions: atualiza,
        }));
      } else {
        localStorage.setItem('user', JSON.stringify({ ...response,
          account: balance, myActions: [...atualiza, actions],
        }));
      }
      
      setClientAccount(balance);
      setTextMsg("Venda feita com sucesso");
      return setVisibleMsg(true);
      
    }
    if(textMsg === '') return history.push('/listActions')
  }

  return (
    <div className='main-buyAndSell'>
      <Header/>
        {visibleMsg ? <Message message={textMsg}/> : (
          <section className='contanier-buyAndSell'>
            <div className='card-table-buyAndSell'>
              <div>
                <h1 className='title-buyAndSell-myActions' data-testId="h1-buyandSell" >Minhas Ações:</h1> 
                <h2 className='title-buyAndSell'>Comprar/Vender Ações</h2>
              </div>
              <Table
                actions={ filterCompany }
                isVisible={false}
                isInvisibleButtons={false}
                />
          </div>
          <div className='contanier-input-buyAndSell'>
            <div className='card-input-buyAndSell'>
              <InputValue
                type="Number"
                name="Comprar"
                hadleValueType={ hadleValueType }
                className="input-value-buyAndSell"
                classNameLabel="label-value-buyAndSell label-value-blue"
                classNameP="p-value-buyAndSell"
                datatestId="input-buy"
              />
              <InputValue
                type="Number"
                name="Vender"
                hadleValueType={ hadleValueType }
                className="input-value-buyAndSell"
                classNameLabel="label-value-buyAndSell label-value-green"
                classNameP="p-value-buyAndSell"
                datatestId="input-sell"
              />
            </div>
          </div>
        </section>
            )}
        <Buttons
          handleTransactionConfirm={ handleTransactionConfirm }
        />
    </div>
  );
}

export default BuyAndSell;