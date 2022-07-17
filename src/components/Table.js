import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import invContext from '../context/invContext';
import {  useNavigate } from 'react-router-dom';

function Table(props) {
  const navigate =  useNavigate();
  const { actions, isVisible, title } = props;
  const { handleBuyAndSellButton } = useContext(invContext);

  const handleBuyAndSell = (e) => {
    handleBuyAndSellButton(e);
    navigate('/buyAndSell');
  }

  return (
    <>
      <p>{title}</p>
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
              <td>
                <button
                  type="button"
                  value={ item.company }
                  onClick={ handleBuyAndSell }
                >
                  C
                </button>
                <button
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
    </>
    )


}
Table.propTypes = {
  actions:PropTypes.array,
  isVisible:PropTypes.bool,
  title:PropTypes.string,
}.isRequired;

export default Table;