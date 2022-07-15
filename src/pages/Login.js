import React from 'react';

function Login() {
 
  return (
    <div>
      <label htmlFor='email'>
        <input
        type='email'
        id='email'
        name='email'
        placeholder='E-mail'
        /* onChange={}, */
        required
      />
      </label>
      <label htmlFor='password'>
        <input
        type='password'
        id='password'
        name='password'
        placeholder='Senha'
        /* onChange={}, */
        required
      />
      </label>
    </div>
  );
}

export default Login;