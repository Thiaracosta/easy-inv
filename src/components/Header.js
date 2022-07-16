import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import invContext from '../context/invContext';

function Header() {
  const navigate =  useNavigate();
  const { clients } = useContext(invContext);
  const [ name, setName ] = useState("Usuário: XPTO")

  useEffect(() => {
    if (clients.name) {
      setName(clients.name)
    }
  }, [clients]);

  const handleInputChange = ({ target }) => {
    navigate('/profile')
  };

  return (
    <>
       <div className="header-container">
        <button
          type="button"
          onClick={ handleInputChange }
        >
          { name }
        </button>
      </div>
    </>
  );
}

Header.propTypes = {
}.isRequired;

export default Header;