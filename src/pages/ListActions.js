import React, { useContext } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import invContext from '../context/invContext';

function ListActions() {
  const { actions } = useContext(invContext);


  return (
    <div>
      <Header/>
      <div>
        <Table
          actions={actions}
          isVisible={false}
          title="Minhas Ações"
        />     
      </div>
      <div>
        <Table
          actions={actions}
          isVisible={true}
          title="Lista de Ações"
        />     
      </div>
    </div>
  );
}

export default ListActions;