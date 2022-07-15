import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

function Login() {
  const navigate =  useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleSaveInput = ({ target }) => {
    const { value, name} = target;
    setUser({ ...user, [name]: value });
  };

  const handleEnterButton = () => {
    navigate('/listActions');
  };
 
  return (
    <div>
      <label htmlFor='email'>
        <input
        type='email'
        id='email'
        name='email'
        placeholder='E-mail'
        onChange={ handleSaveInput }
        required
      />
      </label>
      <label htmlFor='password'>
        <input
        type='password'
        id='password'
        name='password'
        placeholder='Senha'
        onChange={ handleSaveInput }
        required
      />
      </label>
      <button
        type="button"
        /* disabled={} */
        onClick={ handleEnterButton }
        >
          Acessar
        </button>
    </div>
  );
}

export default Login;