import React from 'react';
import PropTypes from 'prop-types';

function InoutValue(props) {
  const { type, name, hadleValueType, className } = props;

  return (
    <label>
    {name}
      <input
        type={type}
        name={name}
        onChange={ hadleValueType }
        className={className}
      />
    </label>
    )


}
InoutValue.propTypes = {
  handleTransactionConfirm:PropTypes.func,
}.isRequired;

export default InoutValue;