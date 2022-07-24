import React, { useEffect, useState } from 'react';
import Buttons from '../components/Buttons';
import Header from '../components/Header';
import Message from '../components/Message';
import './account.css'

function Account() {
  const [transaction, setTransaction] = useState("");
  const [cashValue, setCashValue] = useState(0);
  const [isVisibleDeposit, setIsVisibleDeposit] = useState("btn-invisible-account");
  const [isVisibleWithdrawal, setIsVisibleWithdrawal] = useState("btn-invisible-account")
  const [clientAccount, setClientAccount] = useState(0);
  const [visibleMsg, setVisibleMsg] = useState(false);
  const [textMsg, setTextMsg] = useState("");

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem('user'));
    setClientAccount(response.account);

    if (transaction === 'deposit') {
      setIsVisibleDeposit("btn-visible-account");
      setIsVisibleWithdrawal("btn-invisible-account");
    }
    if (transaction === 'withdrawal') {
      setIsVisibleWithdrawal("btn-visible-account");
      setIsVisibleDeposit("btn-invisible-account");
    }
  }, [transaction]);
  

  const handleTransaction = (e) => {
    const transaction = e.target.value;
    if (transaction === 'deposit') {
      setTransaction('deposit');
    }
    if (transaction === 'withdrawal') {
      setTransaction('withdrawal');
    }
  }

  const handleValueInput = (e) => {
    const transaction = e.target.value;
    setCashValue(transaction)
  }

  const handleTransactionConfirm = () => {
    const response = JSON.parse(localStorage.getItem('user'));
    setClientAccount(response.account);

    if (cashValue === 0) {
      setTextMsg("Informe um valor");
      return setVisibleMsg(true);
    }

    if (transaction === "") {
      setTextMsg("Marque a transação que deseja fazer");
      return setVisibleMsg(true);
    }
    
    const cashValueNumber = Number(cashValue);

    if( clientAccount === null) {
      setClientAccount(0);
    } 

    if (transaction === 'deposit') {
      const balance = clientAccount + cashValueNumber
      localStorage.setItem('user', JSON.stringify({ ...response,
        account: balance,
      }));
      setClientAccount(balance);
      setTextMsg("Depósito feito com sucesso");
      return setVisibleMsg(true);
    }
    if (transaction === 'withdrawal') {
      if(cashValueNumber > clientAccount) {
        setTextMsg("Saldo insuficiente");
        return setVisibleMsg(true);
      } else {
        const balance = clientAccount - cashValueNumber;
        localStorage.setItem('user', JSON.stringify({ ...response,
          account: balance,
        }));
        setClientAccount(balance);
        setTextMsg("Retirada feita com sucesso");
        setVisibleMsg(true);
      }
    }
  }

  return (
    <div className='contanier-account'>
    <Header/>
    {visibleMsg ? <Message message={textMsg} /> : (
      <div>
      <div className='card-h1-account'>
        <p>Saldo em conta:  R${clientAccount.toFixed(2)}</p>
      </div>
      <form className='form-account'>
        <label htmlFor="deposit" className={`label-account ${isVisibleDeposit}` }>
          <input
            id="deposit"
            name="transaction"
            type="radio"
            value="deposit"
            onChange={ handleTransaction }
            className="radio-transaction"
          />
          Depósito
        </label>
        <label htmlFor="withdrawal" className={`label-account ${isVisibleWithdrawal}`}>
          <input
            id="withdrawal"
            name="transaction"
            type="radio"
            value="withdrawal"
            onChange={ handleTransaction }
            className="radio-transaction"
          />
        Retirada
        </label>
      </form>
      <div className='card-valor-account'>
        <label>
          <input
            className='input-valor-account'
            type="number"
            name="setValor"
            onChange={ handleValueInput }
            placeholder="Informe o valor"
          />
        </label>
      </div>
      <Buttons 
      handleTransactionConfirm={ handleTransactionConfirm }
      />
      </div>
    )}
    </div>
  );
}

export default Account;