import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import invContext from './invContext';

function InvProvider({ children }) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getUser = () => {
      const response = JSON.parse(localStorage.getItem('user'));
      if (!response) {
        const users = localStorage.setItem('user', JSON.stringify([]));
        setClients(users);
      }
      setClients(response);
    };

    getUser();
  });
  
  const contextValue = {
    clients,
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