import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './message.css'

function Message(props) {
  const history = useHistory();
  const { message } = props;
  

  return (
    <section className='contanier-msg'>
      <div className='card-btn'>
        <div>
        <button
        className='btn-msg'
        type='button'
        onClick={() => history.push('/listActions')}
        >
         x
        </button>
        </div>
      </div>
      <h1 className='h1-msg'>{message}</h1>
    </section>
    )


}
Message.propTypes = {
  message:PropTypes.string,
}.isRequired;

export default Message;