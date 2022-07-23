import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Buttons from '../components/Buttons';
import './profile.css';

function Profile() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    name: '',
  });
 // const [isVisible, setIsVisible] = useState(true);
  const [client, setClient] = useState([]);

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem('user'));
    setClient(response);
    setUser({email: response.email, name: response.name})
  }, []);

  const handleSaveInput = ({ target }) => {
    const { value, name} = target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = () => {
    const { email, name } = user;
    if (!email) history('/listActions');
    const response = localStorage.setItem('user', JSON.stringify({ ...client,
      name, email,
    }));
    setClient(response);
    history.push('/listActions');
  }

  return (
    <main>
      <div className='h1-profile'>
        <h1>Atualize seus dados</h1>
      </div>
      <div  className='contanier-profile'>
        <label htmlFor='email' >
          <input
            className='input-profile'
            type='email'
            id='email'
            name='email'
            value={user.email}
            placeholder='E-mail'
            onChange={ handleSaveInput }
            required
            />
        </label>
        <label htmlFor='name'>
          <input
            type='text'
            id='name'
            name='name'
            value={user.name}
            placeholder='Nome'
            onChange={ handleSaveInput }
            required
            />
        </label>
      </div>
      <Buttons
        className='button-profile'
        handleTransactionConfirm={handleUpdate} />
    </main>
  );
}

export default Profile;