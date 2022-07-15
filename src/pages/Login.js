import React, { useState } from 'react';

function Login() {

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleSaveInput = ({ target }) => {
    const { value, name} = target;
    setUser({ ...user, [name]: value });
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
    </div>
  );
}

export default Login;