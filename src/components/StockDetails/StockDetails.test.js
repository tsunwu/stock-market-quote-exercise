"use strict";

import React from 'react';
import axios from 'axios';
import { render, act, fireEvent, cleanup, screen, waitFor, wait } from '@testing-library/react';
import StockPanel from '../StockPanel/index';
import 'regenerator-runtime/runtime';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

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

jest.mock('axios');

describe('<StockDetails />', () => {
    it('Context value before updated', () => {
        render(<StockPanel />);
        expect(screen.getByTestId('comp-symbol').textContent).toBe("--");
        expect(screen.getByTestId('comp-name').textContent).toBe("");
        expect(screen.getByTestId('prim-exchange').textContent).toBe("");
        expect(screen.getByTestId('price').textContent).toBe("$--");
        expect(screen.getByTestId('change').textContent).toBe("");
        expect(screen.getByTestId('change-percent').textContent).toBe("");
        expect(screen.getByTestId('close-price').textContent).toBe("$--");
        expect(screen.getByTestId('open-price').textContent).toBe("$--");
        expect(screen.getByTestId('year-high').textContent).toBe("$--");
        expect(screen.getByTestId('year-low').textContent).toBe("$--");
    });

    it('should not contain up or down class name before updated', () => {
        render(<StockPanel />);
        expect(screen.getByTestId('change').classList.contains("up")).toBe(false);
        expect(screen.getByTestId('change').classList.contains("down")).toBe(false);
        expect(screen.getByTestId('change-percent').classList.contains("up")).toBe(false);
        expect(screen.getByTestId('change-percent').classList.contains("down")).toBe(false);
    })

    it('Context value is updated', async () => {
        const { container } = render(<StockPanel />);
        axios.get.mockResolvedValue({data: mockQuote});

        fireEvent.click(container.querySelector('#nke-sym'));
        await waitFor(() => {
            expect(screen.getByTestId('comp-symbol').textContent).toBe(mockQuote.symbol);
            expect(screen.getByTestId('comp-name').textContent).toBe(mockQuote.companyName);
            expect(screen.getByTestId('prim-exchange').textContent).toBe(mockQuote.primaryExchange);
            expect(screen.getByTestId('price').textContent).toBe("$" + mockQuote.iexRealtimePrice);
            expect(screen.getByTestId('change').textContent).toBe(mockQuote.change.toString());
            expect(screen.getByTestId('change-percent').textContent).toBe(mockQuote.changePercent.toString());
            expect(screen.getByTestId('close-price').textContent).toBe("$" + mockQuote.previousClose);
            expect(screen.getByTestId('open-price').textContent).toBe("$" + mockQuote.iexOpen);
            expect(screen.getByTestId('year-high').textContent).toBe("$" + mockQuote.week52High);
            expect(screen.getByTestId('year-low').textContent).toBe("$" + mockQuote.week52Low);
        });
    });

    it('change and change percent should have up class', async () => {
        const { container } = render(<StockPanel />);
        axios.get.mockResolvedValue({data: mockQuote});

        fireEvent.click(container.querySelector('#nke-sym'));
        await waitFor(() => {
            expect(screen.getByTestId('change').classList.contains("up")).toBe(true);
            expect(screen.getByTestId('change-percent').classList.contains("up")).toBe(true);
        });
    });

    it('change and change percent should have down class', async () => {
        const mockQuoteDown = {
            change: -0.51,
            changePercent: -0.00388,
            companyName: "Nike, Inc. - Class B",
            iexOpen: 132.11,
            iexRealtimePrice: 132.11,
            previousClose: 131.6,
            primaryExchange: "NEW YORK STOCK EXCHANGE, INC.",
            symbol: "NKE",
            week52High: 147.65,
            week52Low: 83.38
        }

        const { container } = render(<StockPanel />);
        axios.get.mockResolvedValue({data: mockQuoteDown});

        fireEvent.click(container.querySelector('#nke-sym'));
        await waitFor(() => {
            expect(screen.getByTestId('change').classList.contains("down")).toBe(true);
            expect(screen.getByTestId('change-percent').classList.contains("down")).toBe(true);
        });
    });
});
