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
    </div>
  );
}

export default Login;