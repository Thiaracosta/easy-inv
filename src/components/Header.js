import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import invContext from '../context/invContext';
import './header.css';

function Header() {
  const navigate =  useNavigate();
  const { clients } = useContext(invContext);
  const [ name, setName ] = useState("Usuário: XPTO")

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem('user'));
    if (response.name) {
      setName(response.name)
    }
  }, [clients]);

  const handleInputChange = () => {
    navigate('/profile')
  };

  return (
       <div className="container-header">
        <button
          className='btn-header'
          type="button"
          onClick={ handleInputChange }
        >
          { name }
        </button>
      </div>
  );
}

Header.propTypes = {
}.isRequired;

export default Header;