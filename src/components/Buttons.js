import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './buttons.css'

function Buttons(props) {
  const history = useHistory();
  const { handleTransactionConfirm } = props;

  return (
    <div className='card-button-component'>
    <button
      type="button"
      onClick={() => history.push('/listActions')}
      name="comeBack"
      className='button-valor-account'
    > Voltar </button>
    <button
      className='button-valor-account'
      type="button"
      onClick={ handleTransactionConfirm }
      name="confirm"
    > Confirmar </button>
  </div>
    )


}
Buttons.propTypes = {
  handleTransactionConfirm:PropTypes.func,
}.isRequired;

export default Buttons;