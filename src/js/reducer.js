"use strict";

import React from 'react';
import { UPDATE_QUOTE } from './constant.js';

export const MyContext = React.createContext(null);

export const initalState = {
    quote: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_QUOTE:
            return {
                quote: action.quote
            }
        default:
            return initalState;
    }
}