import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Message(props) {
  const history = useHistory();
  const { message } = props;
  

  return (
    <>
      <button
      type='button'
      onClick={() => history.push('/buyAndSell')}
      >
        X
      </button>
      <h1>{message}</h1>
    </>
    )


}
Message.propTypes = {
  message:PropTypes.string,
}.isRequired;

export default Message;