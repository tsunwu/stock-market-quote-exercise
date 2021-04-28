"use strict";

import React from 'react';
import axios from 'axios';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import StockPanel from '../StockPanel/index';
import stockAPI from '../../js/api/stockAPI';
import 'regenerator-runtime/runtime'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({
  adapter: new EnzymeAdapter()
})

jest.mock('axios');

afterEach(cleanup);

describe.only('<StockTable />', () => {
    describe('rendered the table', () => {
        it('should have Nike symbol and company name rendered', () => {
            const { container } = render(<StockPanel />);
            expect(container.querySelector('#nke-sym')).toBeTruthy();
            expect(container.querySelector('#nke-name')).toBeTruthy();
        });
    });

    describe('handleClick()', () => {
        it('should call getQuoteBySymbol function when a stock is selected/clicked', async () => {
            const spyGetQuoteBySymbol = jest.spyOn(stockAPI, 'getQuoteBySymbol');
            const { container } = render(<StockPanel />);

            fireEvent.click(container.querySelector('#nke-sym'));
            await waitFor(() => {
                expect(spyGetQuoteBySymbol).toBeCalled();
            });
        });

        it('should log error message when getQuoteBySymbol function return error', async () => {
            const spyLog = jest.spyOn(console, 'log');
            const { container } = render(<StockPanel />);
            axios.get.mockImplementation(() => {
                throw new Error('error');
              });

            fireEvent.click(container.querySelector('#nke-sym'));
            await waitFor(() => {
                expect(spyLog).toBeCalledWith('error');
            });
        })
    })
});