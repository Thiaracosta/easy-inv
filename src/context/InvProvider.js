import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import invContext from './invContext';
import stockExchange from '../stockExchangeAPI';

function InvProvider({ children }) {
  const [clients, setClients] = useState([]);
  const [company, setCompany] = useState("");
  const [actions ,  setActions] = useState(stockExchange);

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
  }, []);

  const handleBuyAndSellButton = (e) => {
    setCompany(e.target.value)
    console.log('company', company);
  };

  
  const contextValue = {
    clients,
    actions,
    setActions,
    company,
    handleBuyAndSellButton,
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