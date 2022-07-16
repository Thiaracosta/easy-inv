import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

function Login() {
  const navigate =  useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [users, setUsers] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

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
    enableAccessButton();
  };

  const handleAccessButton = () => {
    console.log('clicou');
    const { email, password } = user;
    /* const emailIsTrue = users.findIndex((item) => email === Object.keys(item)[0]);
    if (emailIsTrue !== -1) {
      setUsers(users[emailIsTrue] = {email: email,
        // password,
        data: new Date()})
    }
    console.log(emailIsTrue); */
    localStorage.setItem('user', JSON.stringify({[email]: {
      email: email,
      password,
      data: new Date()
    }}/* , ...users] */));
    navigate('/listActions');
  };

  const enableAccessButton = () => {
    const { email, password } = user;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i
    const MIN_LENGTH = 5;
    if (regex.test(email) || password.length >= MIN_LENGTH) return setIsVisible(false);
    return setIsVisible(true)
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
          onClick={ handleAccessButton }
          disabled={ isVisible }
          >
            Acessar
          </button>
    </div>
  );
}

export default Login;
