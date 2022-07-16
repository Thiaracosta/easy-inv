import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

function Login() {
  const navigate =  useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = () => {
      const response = JSON.parse(localStorage.getItem('user'));
      if (!response) {
        localStorage.setItem('user', JSON.stringify([]));
      }
      setUsers(response);
    };
    getUser();
  }, []);

  const handleSaveInput = ({ target }) => {
    const { value, name} = target;
    setUser({ ...user, [name]: value });
  };

  const handleAccessButton = () => {
    const { email, password } = user;
    localStorage.setItem('user', JSON.stringify({...users, [email]: {
      email: email,
      // password,
      data: new Date()
    }}));
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
        onClick={ handleAccessButton }
        >
          Acessar
        </button>
    </div>
  );
}

export default Login;