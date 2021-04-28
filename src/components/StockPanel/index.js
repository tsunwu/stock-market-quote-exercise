"use strict";

import React, { useReducer } from 'react';
import { MyContext, initalState, reducer } from '../../js/reducer';
import StockTable from '../StockTable/index';
import StockDetails from '../StockDetails';

const StockPanel = () => {
  const [quote, dispatch] = useReducer(reducer, initalState)
  
  return (
    <div id='stock-panel'>
      <header id='title'>Stocks</header>
      <MyContext.Provider value={{ quote, dispatch }}>
        <StockTable/>
        <div id="vl"></div> 
        <StockDetails/>    
      </MyContext.Provider>
    </div>
  );
}

export default StockPanel;