import React from 'react';
import PropTypes from 'prop-types';
import invContext from './invContext';

function InvProvider({ children }) {
  
  const contextValue = {
    
  };

  return (
    <invContext.Provider value={ contextValue }>
      { children }
    </invContext.Provider>
  );
}

InvProvider.propTypes = {
  children: PropTypes.func,
}.isRequired;

export default InvProvider;