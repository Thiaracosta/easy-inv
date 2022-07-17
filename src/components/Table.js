import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import invContext from '../context/invContext';
import {  useNavigate } from 'react-router-dom';
import './table.css'

function Table(props) {
  const navigate =  useNavigate();
  const { actions, isVisible } = props;
  const { handleBuyAndSellButton } = useContext(invContext);

  const handleBuyAndSell = (e) => {
    handleBuyAndSellButton(e);
    navigate('/buyAndSell');
  }

  return (
    <main>
     <div className='container-table'>
        <table>
          <thead>
            <tr>
              <th>Ação</th>
              <th>Quant</th>
              <th>Valor</th>
              <th>Negociar</th>
            </tr>
          </thead>
          <tbody>
            {actions.map((item) => (
              <tr key={ item.company }>
                <td>{ item.company }</td>
                <td>{ item.quantity }</td>
                <td>{ item.price }</td>
                <td className='tr-card-bt'>
                  <button
                    className='bnt-table btn-green'
                    type="button"
                    value={ item.company }
                    onClick={ handleBuyAndSell }
                  >
                    C
                  </button>
                  <button
                    className='bnt-table btn-blue'
                    type="button"
                    value={ item.company }
                    onClick={ handleBuyAndSell }
                    disabled={isVisible}
                  >
                    V
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
    )


}
Table.propTypes = {
  actions:PropTypes.array,
  isVisible:PropTypes.bool,
}.isRequired;

export default Table;