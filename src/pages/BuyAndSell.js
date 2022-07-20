import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Buttons from '../components/Buttons';
import invContext from '../context/invContext';
import Table from '../components/Table';
import InputValue from '../components/InputValue';
import './buyAndSell.css'

function BuyAndSell() {
  const history = useHistory();
  const { company, actions } = useContext(invContext);
  const [filterCompany, setFilterCompany] = useState([]);
  const [transaction, setTransaction] = useState({});
  const [myActions, setMyActions] = useState(() => {
    const response = JSON.parse(localStorage.getItem('user'));
    return response.myActions;
  });
  const [clientAccount, setClientAccount] = useState(() => {
    const response = JSON.parse(localStorage.getItem('user'));
    return response.account;
  });

  useEffect(() => {
    const filterCompany = actions.filter((item) => item.company === company)
    setFilterCompany(filterCompany);
    const response = JSON.parse(localStorage.getItem('user'));
    setMyActions(response.myActions);
  }, [company, actions]);

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
        alert("Saldo insuficente")
      } else {
        const balance = clientAccount - amount;

        if(index === -1) {
          console.log('index === -1');
          const filter = filterCompany[0];
          console.log("filter", filter);
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
        alert("Compra feita com sucesso");
      }
    }

    if (type === "Vender") {
      if(index === -1) {
        return alert("Não possui nenhuma ação dessa companhia")
      }
      if (+myActions[index].quantity < +value) {
        return alert("Você não possui essa quantidade de ações dessa companhia")
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
      alert("Venda feita com sucesso");
    }
    history.push('/listActions');
  }

  return (
    <main>
      <Header/>
      <h1 className='title-buyAndSell'>Comprar/Vender Ações</h1>
      <div className='contanier-buyAndSell'>
        <div className='card-table-buyAndSell'>
          <Table
            actions={filterCompany}
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
            handleTransactionConfirm={ handleTransactionConfirm }/>
      </div>
    </main>
  );
}

export default BuyAndSell;