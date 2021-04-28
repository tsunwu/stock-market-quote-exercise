"use strict";

import React, { useContext } from 'react';
import { MyContext } from '../../js/reducer';

const StockDetails = () => {
    const { quote } = useContext(MyContext);

    return (
        <section id="stock-details">
            <div className="display-rows">
                <span id="comp-symbol" data-testid="comp-symbol">{quote.quote ? quote.quote.symbol : "--"}</span>
                <span id="comp-name" data-testid="comp-name">{quote.quote ? quote.quote.companyName : ""}</span>
            </div>
            <div className="display-rows">
                <div className="label">Primary Exchange</div>
                <div id="prim-exchange" className="data" data-testid="prim-exchange">{quote.quote ? quote.quote.primaryExchange : ""}</div>
            </div>
            <div className="display-rows">
                <div id="lastest-price">
                    <div className="label">Latest Price</div>
                    <div id="price" className="data" data-testid="price">${quote.quote ? quote.quote.iexRealtimePrice : "--"}</div>
                </div>
                <div id="price-change">
                    <div className="label">Change</div>
                    <div id="change" 
                        className={"data " + (quote.quote && quote.quote.change > 0 ? "up" : quote.quote && quote.quote.change < 0 ? "down" : "")} 
                        data-testid="change">{quote.quote ? quote.quote.change : ""}
                    </div>
                </div>
                <div id="price-change-percent">
                    <div className="label">Change Percent</div>
                    <div id="change-percent" 
                        className={"data " + (quote.quote && quote.quote.changePercent > 0 ? "up" : quote.quote && quote.quote.changePercent < 0 ? "down" : "")} 
                        data-testid="change-percent">{quote.quote ? quote.quote.changePercent : ""}
                    </div>
                </div>
            </div>
            <div className="display-rows">
                <div id="close">
                    <div className="label">Previous Close</div>
                    <div id="close-price" className="data" data-testid="close-price">${quote.quote ? quote.quote.previousClose : "--"}</div>
                </div>
                <div id="open">
                    <div className="label">Open</div>
                    <div id="open-price" className="data" data-testid="open-price">${quote.quote ? quote.quote.iexOpen : "--"}</div>
                </div>
            </div>
            <div className="display-rows">
                <div id="high">
                    <div className="label">52 Weeks High</div>
                    <div id="year-high" className="data" data-testid="year-high">${quote.quote ? quote.quote.week52High : "--"}</div>
                </div>
                <div id="low">
                    <div className="label">52 Weeks Low</div>
                    <div id="year-low" className="data" data-testid="year-low">${quote.quote ? quote.quote.week52Low : "--"}</div>
                </div>
            </div>
        </section>
    )
};

export default StockDetails;