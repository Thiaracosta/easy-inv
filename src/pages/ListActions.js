import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import invContext from '../context/invContext';

function ListActions() {
  const { actions, myActions } = useContext(invContext);
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (myActions !== []) {
      setIsVisible(false);
    }
  }, [myActions]);

  return (
    <div>
      <Header/>
    {isVisible &&
      <div>
        <Table
          actions={actions}
          isVisible={false}
          title="Minhas Ações"
        />     
      </div>
    }
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