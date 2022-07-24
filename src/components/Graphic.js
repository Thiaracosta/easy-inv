import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import _ from 'lodash';

import './graphic.css'

function Graphic() {
  const [myActions, setMyActions] = useState(() => JSON.parse(localStorage.getItem('user')).myActions);
  const [dadosGraphic, setDadosGraphic] = useState([]);

  useEffect(() => {
    setMyActions(JSON.parse(localStorage.getItem('user')).myActions);
    const groupSector = _.groupBy(myActions, (item) => item.sector);
    const result = _.map(
      groupSector, (item, key) => 
      [key,
      _.sumBy(groupSector[key], (v) => v.quantity )]);

    const data = [["setor", "quantidade"], ...result];
    setDadosGraphic(data);
  }, []);
  

  return (
    <div>
      <div className='contanier-graphic'>
        <h4 className='title-graphic'>Distribuição das ações em sua carteira</h4>
        <div className='card-graphic'>
          <Chart
            chartType="PieChart"
            data={ dadosGraphic }
            width={"100%"}
            heigth={"100px"}
          />
        </div>
      </div>
    </div>
  )
 
}

export default Graphic;

// REFERÊNCIAS
// Para a eleboração do gráfico segui os passos do video:
// https://www.youtube.com/watch?v=pmHr1xKH4hM&feature=youtu.be
