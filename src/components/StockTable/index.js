"use strict";

import React, { useContext } from 'react';
import { MyContext } from '../../js/reducer';
import StockAPI from '../../js/api/stockAPI';
import { stocks } from '../../js/constant';

const StockTable = () => {
    const { dispatch } = useContext(MyContext);

    const handleClick = async (e) => {
        let id = e.target.parentNode.id;
        try {
            let quote = await StockAPI.getQuoteBySymbol(id);
            dispatch({ type: 'UPDATE_QUOTE', quote: quote.data });
        } catch(error) {
            console.log(error);
        }
    }
    

    const tableRow = stocks.map(stock => {
        return (
            <tr key={stock.symbol} id={stock.symbol} onClick={e => handleClick(e)}>
                <td key={stock.symbol + '-sym'} 
                    id={stock.symbol + '-sym'} 
                    className='stock-symbol'>
                    {stock.symbol.toUpperCase()}
                </td>
                <td key={stock.symbol + '-name'} 
                    id={stock.symbol + '-name'} 
                    className='stock-name'>
                    {stock.name}
                </td>
            </tr>
        )
    });

    return (
        <table id='stock-table'>
            <thead>
                <tr key='header' id='header-row'>
                    <th key='symbol' id='symbol-header'>Symbol</th>
                    <th key='name' id='name-header'>Name</th>
                </tr>
            </thead>
            <tbody>
                {tableRow}
            </tbody>
        </table>
    )
}

export default StockTable;