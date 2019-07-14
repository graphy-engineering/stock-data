const fetch = require('node-fetch');
const qs = require('query-string');

const fetchStockData = async symbol => {
  const query = qs.stringify({
    function: 'TIME_SERIES_DAILY',
    apikey: 'VY93B6B3A6CMLTKC',
    outputsize: 'full',
    symbol,
  });

  const res = await fetch(`https://www.alphavantage.co/query?${query}`);

  return await res.json();
};

module.exports = fetchStockData;
