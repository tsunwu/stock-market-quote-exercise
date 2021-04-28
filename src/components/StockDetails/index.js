"use strict";

import React from 'react';

const StockDetails = (props) => {
    const quote = props.quote;

    const priceChangeClassName = quote && quote.change > 0 ? "up" : quote && quote.change < 0 ? "down" : "";
    const priceChangePerClassName = quote && quote.changePercent > 0 ? "up" : quote && quote.changePercent < 0 ? "down" : "";

    if (!quote) {
        return null;
    } else {
        return (
            <section id="stock-details">
                <div className="display-rows">
                    <span id="comp-symbol" data-testid="comp-symbol">{quote.symbol}</span>
                    <span id="comp-name" data-testid="comp-name">{quote.companyName}</span>
                </div>
                <div className="display-rows">
                    <div className="label">Primary Exchange</div>
                    <div id="prim-exchange" className="data" data-testid="prim-exchange">{quote.primaryExchange}</div>
                </div>
                <div id="price-row" className="display-rows">
                    <div id="lastest-price">
                        <div className="label">Latest Price</div>
                        <div id="price" className="data" data-testid="price">${quote.iexRealtimePrice}</div>
                    </div>
                    <div id="price-change">
                        <div className="label">Change</div>
                        <div id="change" 
                            className={"data " + priceChangeClassName} 
                            data-testid="change">{quote.change}
                        </div>
                    </div>
                    <div id="price-change-percent">
                        <div className="label">Change Percent</div>
                        <div id="change-percent" 
                            className={"data " + priceChangePerClassName} 
                            data-testid="change-percent">{quote.changePercent}
                        </div>
                    </div>
                </div>
                <div className="display-rows">
                    <div id="close">
                        <div className="label">Previous Close</div>
                        <div id="close-price" className="data" data-testid="close-price">${quote.previousClose}</div>
                    </div>
                    <div id="open">
                        <div className="label">Open</div>
                        <div id="open-price" className="data" data-testid="open-price">${quote.iexOpen}</div>
                    </div>
                </div>
                <div className="display-rows">
                    <div id="high">
                        <div className="label">52 Weeks High</div>
                        <div id="year-high" className="data" data-testid="year-high">${quote.week52High}</div>
                    </div>
                    <div id="low">
                        <div className="label">52 Weeks Low</div>
                        <div id="year-low" className="data" data-testid="year-low">${quote.week52Low}</div>
                    </div>
                </div>
            </section>
        )
    }
};

export default StockDetails;