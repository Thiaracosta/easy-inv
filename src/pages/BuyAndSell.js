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

  useEffect(() => {
    const filterCompany = actions.filter((item) => item.company === company)
    setFilterCompany(filterCompany);
  }, [company, actions]);

  const hadleValueType = (e) => {
    const value = e.target.value;
    const type = e.target.name;
    setTransaction({
      value, type
    })
  }

  const handleTransactionConfirm = () => {
    console.log('passaaqui')
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