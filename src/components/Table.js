import React from 'react';
import PropTypes from 'prop-types';

function Table(props) {
  const { actions, isVisible, title } = props;

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
                  value={ item.id }
                  onClick={ () => this.handleClick(item.id) }
                >
                  C
                </button>
                <button
                  type="button"
                  value={ item.id }
                  onClick={ () => this.handleClick(item.id) }
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