import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import _ from 'lodash';
import PropTypes from 'prop-types';

import './Graphic.css'

function Graphic(props) {
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
      {dadosGraphic !== [] && (
        <div>
          <h2 className='title-graphic'>Distribuição das ações em sua carteira</h2>
          <Chart
            chartType="PieChart"
            data={ dadosGraphic }
            width={"100%"}
            heigth={"100px"}
          />
        </div>
      )}
    </div>
  )
 
}

Graphic.propTypes = {
  myActions:PropTypes.array,
}.isRequired;

export default Graphic;