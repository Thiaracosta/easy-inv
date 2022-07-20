import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import invContext from '../context/invContext';
import { useHistory } from 'react-router-dom';
import './table.css'

function Table(props) {
  const history = useHistory();
  const { actions, isVisible, isVisibleButtons } = props;
  const { handleBuyAndSellButton } = useContext(invContext);

  const handleBuyAndSell = (e) => {
    handleBuyAndSellButton(e);
    history.push('/buyAndSell');
  }

  const getButtons = (item) => {
    if (isVisibleButtons) {
      return (
        <td className='tr-card-bt'>
          <button
            className='bnt-table btn-blue'
            type="button"
            value={ item.company }
            onClick={ handleBuyAndSell }
          >
            C
          </button>
          <button
            className='bnt-table btn-green'
            type="button"
            value={ item.company }
            onClick={ handleBuyAndSell }
            disabled={isVisible}
          >
          V
          </button>
        </td>
      )
    }
  }

  return (
    <main>
     <div className='container-table'>
        <table className='table-component'>
          <thead>
            <tr>
              <th>Ação</th>
              <th>Quant</th>
              <th>Valor</th>
              {isVisibleButtons &&
              <th>Negociar</th>
              }
            </tr>
          </thead>
          <tbody>
            {actions.map((item) => (
              <tr key={ item.company }>
                <td>{ item.company }</td>
                <td>{ item.quantity }</td>
                <td>{ item.price }</td>
               {getButtons(item)}
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
  isVisibleButtons:PropTypes.bool,
}.isRequired;

export default Table;