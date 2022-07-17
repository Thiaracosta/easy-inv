import React from 'react';
import PropTypes from 'prop-types';
import {  useNavigate } from 'react-router-dom';


function Buttons(props) {
  const navigate =  useNavigate();
  const { handleTransactionConfirm } = props;

  return (
    <div className='card-button-account'>
    <button
      type="button"
      onClick={() => navigate('/listActions')}
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