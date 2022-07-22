import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './table.css'

function Table(props) {
  const history = useHistory();
  const { isVisible, isVisibleButtons, dataTestid, dataTestidTr, actions } = props;
 

  const handleBuyAndSell = (e) => {
    const save = e.target.value;
    const response = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('user', JSON.stringify({ ...response, company: save,
    }));
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
            data-testid={`buttonC-${dataTestidTr}-${item.company}`}
          >
            C
          </button>
          <button
            className='bnt-table btn-green'
            type="button"
            value={ item.company }
            onClick={ handleBuyAndSell }
            disabled={isVisible}
            data-testid={`buttonV-${dataTestidTr}-${item.company}`}
          >
          V
          </button>
        </td>
      )
    }
  }

  return (
    <main>
     <section className='container-table'>
        <table
          className='table-component'
          data-testid={ dataTestid }
        >
          <thead>
            <tr>
              <th>Ação</th>
              <th>Qtde</th>
              <th>Valor(R$)</th>
              {isVisibleButtons &&
              <th>Negociar</th>
              }
            </tr>
          </thead>
          <tbody>
            {actions.map((item) => (
              <tr key={ item.company } data-testid={`${dataTestidTr}-${item.company}`}>
                <td>{ item.company }</td>
                <td>{ item.quantity }</td>
                <td>{ item.price }</td>
                {getButtons(item)}
      </tr>))}
          </tbody>
        </table>
      </section>
    </main>
    )


}
Table.propTypes = {
  actions:PropTypes.array,
  isVisible:PropTypes.bool,
  isVisibleButtons:PropTypes.bool,
  dataTestid:PropTypes.string,
}.isRequired;

export default Table;