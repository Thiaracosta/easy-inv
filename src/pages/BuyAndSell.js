import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Buttons from '../components/Buttons';
import invContext from '../context/invContext';

function BuyAndSell() {
  const { company, actions } = useContext(invContext);
  const [filterCompany, setFilterCompany] = useState([]);
  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    const filterCompany = actions.filter((item) => item.company === company)
    setFilterCompany(filterCompany);
  }, []);

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
      <div>
      <table>
          <thead>
            <tr>
              <th>Ação</th>
              <th>Quant</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {filterCompany.map((item) => (
              <tr key={ item.company }>
                <td>{ item.company }</td>
                <td>{ item.quantity }</td>
                <td>{ item.price }</td>
              </tr>
            ))}
          </tbody>
      </table>
      </div>
      <div>
        <label>
        Comprar
          <input
            type="Number"
            name="Comprar"
            onChange={ hadleValueType }
          />
        </label>
      </div>
      <div>
        <label>
        Vender
          <input
            type="Number"
            name="Vender"
            onChange={ hadleValueType }
          />
        </label>
      </div>
              <Buttons
              handleTransactionConfirm={ handleTransactionConfirm }/>
    </div>
  );
}

export default BuyAndSell;