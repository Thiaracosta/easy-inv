import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import logo from '../logo.svg';
import './login.css'

function Login() {
  const navigate =  useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [isVisible, setIsVisible] = useState(true);
  const [emailUser, setEmailUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [client, setClient] = useState([]);

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem('user'));
    setClient(response);
    if (response === null) {
      localStorage.setItem('user', JSON.stringify([]));
      setUser({email: '', password: ''})
    }
    setUser({email: response.email, password: ''})
    setEmailUser(response.email);
  }, []);

  const handleSaveInput = ({ target }) => {
    const { value, name} = target;
    setUser({ ...user, [name]: value });
    enableAccessButton();
  };

  const handleAccessButton = () => {
    const { email, password } = user;
    if (email === emailUser) {
      localStorage.setItem('user', JSON.stringify({
        ...client, date: new Date(),
      }));
    } else {
      localStorage.setItem('user', JSON.stringify({
        email: email,
        password,
        name:'thiara',
        account: 0,
        myActions: [],
        date: new Date()
      }));
    }
    navigate('/listActions');
  };

  const enableAccessButton = () => {
    const { email, password } = user;
    const regex = /\S+@\S+\.\S+/
    const MIN_LENGTH = 5;
    if (regex.test(email) && password.length >= MIN_LENGTH) return setIsVisible(false);
    return setIsVisible(true)
  };

  return (
    <div className='container-login'>
      <div className ='card-input-login'>
      <div className='input-login'>
        <img src={ logo } alt='logo' className='img-login'/>
        </div>
        <h1>Sing In</h1>
        <div className='input-login'>
          <label htmlFor='email'>
            <input
            type='email'
            id='email'
            name='email'
            value={user.email}
            placeholder='E-mail'
            onChange={ handleSaveInput }
            required
          />
          </label>
        </div>
        <div className='input-login'>
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
        </div>
        <div className='button-login'>
          <button
            type="button"
            onClick={ handleAccessButton }
            disabled={ isVisible }
            >
              Acessar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
