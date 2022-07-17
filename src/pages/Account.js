import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import './account.css'

function Account() {
  const [transaction, setTransaction] = useState("");
  // const [isEmphasis, setIsEmphasisn] = useState();
  const [isVisibleDeposit, setIsVisibleDeposit] = useState("btn-visible-account");
  const [isVisibleWithdrawal, setIsVisibleWithdrawal] = useState("btn-invisible-account")
  useEffect(() => {
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

  return (
    <div className='contanier-account'>
      <Header/>
      <div>
        <h1>Saldo da conta</h1>
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
    </div>
  );
}

export default Account;