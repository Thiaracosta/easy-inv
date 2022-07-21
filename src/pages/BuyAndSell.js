import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Buttons from '../components/Buttons';
import invContext from '../context/invContext';
import Table from '../components/Table';
import InputValue from '../components/InputValue';
import Message from '../components/Message';

import './buyAndSell.css'

function BuyAndSell() {
  const history = useHistory();
  const { company, actions  } = useContext(invContext);
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
  const [visibleMsg, setVisibleMsg] = useState(false);
  const [textMsg, setTextMsg] = useState("");
  useEffect(() => {
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
        setTextMsg("Saldo insuficente")
      } else {
        const balance = clientAccount - amount;

        if(index === -1) {
          console.log('index === -1');
          const filter = filterCompany[0];
          filter.quantity = Number(value);
          localStorage.setItem('user', JSON.stringify({ ...response,
            account: balance, myActions: [...response.myActions, filter]
          }));
        } else {
          console.log('index');
          const actions = myActions[index];
          actions.quantity = Number(actions.quantity) + Number(value);
          const atualiza = myActions.filter((item) => item.company !== actions.company)
          
          localStorage.setItem('user', JSON.stringify({ ...response,
            account: balance, myActions: [...atualiza, actions],
          }));
        }
        setClientAccount(balance);
        setTextMsg("Compra feita com sucesso");
      }
    }

    if (type === "Vender") {
      if(index === -1) {
        return setTextMsg("Não possui nenhuma ação dessa companhia")
      }
      if (+myActions[index].quantity < +value) {
        return setTextMsg("Você não possui essa quantidade de ações")
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
      
    }
    if(textMsg === '') return history.push('/listActions')
    setVisibleMsg(true);
  }

  return (
    <main>
      <Header/>
        {visibleMsg ? <Message message={textMsg}/> : (
          <section className='contanier-buyAndSell'>
          <h1 className='title-buyAndSell'>Comprar/Vender Ações</h1>
          <div className='card-table-buyAndSell'>
            <Table
              actions={ filterCompany }
              isVisible={false}
              isInvisibleButtons={false}
              />
          </div>
          <div className='card-input-buyAndSell'>
            <InputValue
              type="Number"
              name="Comprar"
              hadleValueType={ hadleValueType }
              className="input-value-buyAndSell"
              classNameLabel="label-value-buyAndSell label-value-blue"
              classNameP="p-value-buyAndSell"
            />
          <InputValue
              type="Number"
              name="Vender"
              hadleValueType={ hadleValueType }
              className="input-value-buyAndSell"
              classNameLabel="label-value-buyAndSell label-value-green"
              classNameP="p-value-buyAndSell"
            />
          </div>
            <Buttons
            handleTransactionConfirm={ handleTransactionConfirm }
            />
        </section>
            )}
    </main>
  );
}

export default BuyAndSell;