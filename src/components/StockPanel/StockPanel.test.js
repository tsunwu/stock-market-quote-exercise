"use strict";

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import StockPanel from './index.js';
import { MyContext, initalState, reducer } from '../../js/reducer';
import 'regenerator-runtime/runtime'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({
  adapter: new EnzymeAdapter()
})

const mockQuote = {
    change: 0.51,
    changePercent: 0.00388,
    companyName: "Nike, Inc. - Class B",
    iexOpen: 132.11,
    iexRealtimePrice: 132.11,
    previousClose: 131.6,
    primaryExchange: "NEW YORK STOCK EXCHANGE, INC.",
    symbol: "NKE",
    week52High: 147.65,
    week52Low: 83.38
}

afterEach(cleanup);

describe('<StockPanel />', () => {
    describe('when page is initialized', () => {
        it('then shows title', () => {
            render(<StockPanel />);
            expect(screen.getByText(/Stocks/i)).toBeTruthy();
        });

        it('then shows table with items', () => {
            const { container } = render(<StockPanel />);
            expect(container.querySelector('#aapl-sym')).toBeTruthy();
            expect(container.querySelector('#nke-sym')).toBeTruthy();
        })

        it('then shows details', () => {
            const { container } = render(<StockPanel />);
            expect(container.querySelector('#stock-details')).toBeTruthy();
        });
    });

    describe('test the reducer and action', () => {
        it('should return the inital state', () => {
            expect(initalState).toEqual({ quote: null });
        });

        it('should change quote from null to object', () => {
            expect(reducer(initalState, { type: 'UPDATE_QUOTE', quote: mockQuote })).toEqual({
                quote: mockQuote
            });
        })
    });
});