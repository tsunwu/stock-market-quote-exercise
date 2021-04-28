"use strict";

const axios = require('axios');
const key = "sk_0718865dcf6444d6aa5cdbb6bfcdb752";

const url = "https://cloud.iexapis.com/stable";

const getQuoteBySymbol = (symbol) => {
    const endpoint = `${url}/stock/${symbol}/quote?token=${key}`;
    return axios.get(endpoint);
}

module.exports = {
    getQuoteBySymbol
}