import React from 'react';
import PropTypes from 'prop-types';

function InoutValue(props) {
  const { type, name, hadleValueType, classNameInput, classNameLabel, classNameP} = props;

  return (
    <label className={ classNameLabel }>
      <p className={classNameP}>{name}</p>
      <input
        type={type}
        name={name}
        onChange={ hadleValueType }
        className={classNameInput}
        placeholder="Informe a quantidade de ações"
      />
    </label>
    )


}
InoutValue.propTypes = {
  type:PropTypes.string,
  name:PropTypes.string,
  className:PropTypes.string,
  hadleValueType:PropTypes.func,
}.isRequired;

export default InoutValue;