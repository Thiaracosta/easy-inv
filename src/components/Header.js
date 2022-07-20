import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import invContext from '../context/invContext';
// import logo from '../logo.svg';
import './header.css';

function Header() {
  const history = useHistory();
  const { clients } = useContext(invContext);
  const [ name, setName ] = useState("Usuário:XPTO");
  const [user, setUser] = useState([]);
  const [balance, setBalance] = useState("Saldo")

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem('user'));
    setUser(response);
    console.log('----------------->', response)
    if (response === null) {
      setName("Usuário:XPTO");
    } else {
      setName(response.name)
    }
  }, [clients]);

  const handleInputChange = () => {
    history.push('/profile')
  };

  const handleBalance = () => {
    if (balance === "Saldo") {
      setBalance(`R$ ${user.account}`);
    } else {
      setBalance("Saldo");
    }
  }

  return (
       <div className="container-header">
          {/* <img src={ logo } alt='log' className='img-header'/> */}
          <button
          className='btn-header'
          type="button"
          name="Saldo"
          onClick={ handleBalance }
        >
          { balance }
        </button>
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

export default Header;