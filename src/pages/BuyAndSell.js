import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Buttons from '../components/Buttons';
import invContext from '../context/invContext';
import Table from '../components/Table';
import InoutValue from '../components/InputValue';
import './buyAndSell.css'

function BuyAndSell() {
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

    console.log('------------', filterCompany[0]);
    const amount = value * valueCompany;

    if (type === "Comprar") {
      if(amount > clientAccount) {
        alert("Saldo insuficente")
      } else {
        const balance = clientAccount - amount;
        const index = myActions.findIndex((item) => {
          console.log('itemmm', item.company);
          return item.company === filterCompany[0].company
        });
        console.log('indexxxxxxxxx', myActions);

        if(index === -1) {
          console.log('index === -1');
          localStorage.setItem('user', JSON.stringify({ ...response,
            account: balance, myActions: [...response.myActions, filterCompany[0]]
          }));
        } else {
          console.log('index');
          const actions = myActions[index];
          actions.quantity = Number(actions.quantity) + value;
          console.log('------------------', actions);
          const actionsBuy = {...actions, quantity: actions.quantity + value}

          localStorage.setItem('user', JSON.stringify({ ...response,
            account: balance, myActions: [...response.myActions, actionsBuy]
          }));
        }
        setClientAccount(balance);
        alert("Compra feito com sucesso");
      }
    }

    console.log(amount);
    // fazer a conta do valor pago ou vendido
    /* const amount = 
    if (type === 'Comprar') {
      if (value > clientAccount) {

      }
      const balance = clientAccount + cashValueNumber
      localStorage.setItem('user', JSON.stringify({ ...response,
        account: balance,
      }));
      setClientAccount(balance);
      alert("Depósito feito com sucesso")
    }
    if (transaction === 'withdrawal') {
      if(cashValueNumber > clientAccount) {
        alert("Saldo insuficente")
      } else {
        const balance = clientAccount - cashValueNumber;
        localStorage.setItem('user', JSON.stringify({ ...response,
          account: balance,
        }));
        setClientAccount(balance);
        alert("Retirada feita com sucesso")
      }
    } */
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
          <InoutValue
            type="Number"
            name="Comprar"
            hadleValueType={ hadleValueType }
            className="input-value-buyAndSell"
            classNameLabel="label-value-buyAndSell label-value-blue"
            classNameP="p-value-buyAndSell"
          />
        
        <InoutValue
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