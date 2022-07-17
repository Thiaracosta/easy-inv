import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Buttons from '../components/Buttons';
import invContext from '../context/invContext';
import Table from '../components/Table';
import InoutValue from '../components/InputValue';

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
    <div>
      <Header/>
      <h1>Comprar/Vender Ações</h1>
      <div className='card-table-list'>
        <Table
          actions={filterCompany}
          isVisible={false}
          isInvisibleButtons={false}
        />     
        </div>
      <div>
        <InoutValue
          type="Number"
          name="Comprar"
          hadleValueType={ hadleValueType }
          className="input-value-buyAndSell"
        />
      </div>
      <div>
      <InoutValue
          type="Number"
          name="Vender"
          hadleValueType={ hadleValueType }
          className="input-value-buyAndSell"
        />
      </div>
        <Buttons
          handleTransactionConfirm={ handleTransactionConfirm }/>
    </div>
  );
}

export default BuyAndSell;