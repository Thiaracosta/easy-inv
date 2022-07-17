import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import invContext from '../context/invContext';
import {  useNavigate } from 'react-router-dom';
import './listActions.css'

function ListActions() {
  const navigate =  useNavigate();
  const { actions, myActions } = useContext(invContext);
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (myActions !== []) {
      setIsVisible(false);
    }
  }, [myActions]);

  return (
    <div className='contanier-list'>
      <Header/>
      <div className='contanier-actions-list'>
    {isVisible &&
      <div className='contanier-table-list'>
        <h3 className='title-list'>Minhas Ações</h3>
        <div className='card-table-list'>
          <Table
            actions={actions}
            isVisible={false}
          />
        </div>   
      </div>
    }
      <div className='contanier-table-list'>
        <h3 className='title-list'>Lista de Ações</h3>
        <div className='card-table-list'>
          <Table
            actions={actions}
            isVisible={true}
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