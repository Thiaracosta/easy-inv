import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Buttons from '../components/Buttons';
import Graphic from '../components/Graphic';
import './profile.css';

function Profile() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    name: '',
  });
 // const [isVisible, setIsVisible] = useState(true);
  const [client, setClient] = useState([]);
  const [myActions, setMyActions] = useState(() => JSON.parse(localStorage.getItem('user')).myActions);

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem('user'));
    setClient(response);
    setUser({email: response.email})
    setMyActions(response.myActions);
  }, []);

  const handleSaveInput = ({ target }) => {
    const { value, name} = target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = () => {
    const { email, name } = user;
    const response = localStorage.setItem('user', JSON.stringify({ ...client,
      name, email,
    }));
    setClient(response);
    history.push('/listActions');
  }

  return (
    <div className='main-profile'>
      <div className='h1-profile'>
        <h1>Perfil</h1>
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
      {myActions.length > 0 ? (
        <Graphic
          myActions={myActions}
        />
      ): <div className='div-profile'></div>
      }
      <Buttons
        className='button-profile'
        handleTransactionConfirm={handleUpdate} />
    </div>
  );
}

export default Profile;