import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import invContext from '../context/invContext';
import {  useNavigate } from 'react-router-dom';
import './listActions.css'

function ListActions() {
  const navigate =  useNavigate();
  const { actions } = useContext(invContext);
  const [isVisible, setIsVisible] = useState(false);
  const [myActions, setMyActions] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.myActions
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user', user.myActions.lenght);
    if (user.myActions.lenght !== undefined) {
      console.log('passa aqui');
      setIsVisible(true);
    }
  }, []);

  return (
    <div className='contanier-list'>
      <Header/>
      <div className='contanier-actions-list'>
    {isVisible ?
      (<div className='contanier-table-list'>
        <h3 className='title-list'>Minhas Ações</h3>
        <div className='card-table-list'>
          <Table
            actions={myActions}
            isVisible={false}
            isVisibleButtons={true}
          />
        </div>   
      </div> ) : (
        <div className='contanier-table-list'>
        <h3 className='title-list'>Minhas Ações</h3>
        <p>Você não possui ações. Que tal investir?</p>
        </div>
      )
    }
      <div className='contanier-table-list'>
        <h3 className='title-list'>Lista de Ações</h3>
        <div className='card-table-list'>
          <Table
            actions={actions}
            isVisible={true}
            isVisibleButtons={true}
          />     
        </div>
      </div>
      <div className='card-btn-table'>
        <div >
          <button
            className='bnt-account-table'
            type="button"
            onClick={ () => navigate('/account')}
          >
            Depósito/Retirada
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ListActions;