import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import { useHistory } from 'react-router-dom';
import './listActions.css'
import stockExchange from '../stockExchangeAPI';

function ListActions() {
  const history = useHistory();
  const [actions ,  setActions] = useState(stockExchange);
  const [isVisible, setIsVisible] = useState(false);
  const [myActions, setMyActions] = useState([]);

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem('user'));
    if (response.myActions !== []) {
      setMyActions(response.myActions)
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
            dataTestid='table-myAction'
            actions={myActions}
            isVisible={false}
            isVisibleButtons={true}
            dataTestidTr='myActions'
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
            dataTestid='table-action'
            actions={ actions }
            isVisible={true}
            isVisibleButtons={true}
            dataTestidTr='actions'
          />     
        </div>
      </div>
      <div className='card-btn-table'>
        <div >
          <button
            className='bnt-account-table'
            type="button"
            onClick={ () => history.push('/account')}
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