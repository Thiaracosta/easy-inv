import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import invContext from '../context/invContext';

function BuyAndSell() {
  const { company, actions } = useContext(invContext);
  const [filterCompany, setFilterCompany] = useState([]);

  useEffect(() => {
    const filterCompany = actions.filter((item) => item.company === company)
    setFilterCompany(filterCompany);
  }, []);

  return (
    <div>
      <Header/>
      <h1>BuyAndSell</h1>
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
    </div>
  );
}

export default BuyAndSell;