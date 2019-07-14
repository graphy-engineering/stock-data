const fetch = require('node-fetch');
const qs = require('query-string');
const redis = require('./redis');

const fetchStockData = async symbol => {
  const cacheKey = `temp:av:${symbol}`;

  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const query = qs.stringify({
    function: 'TIME_SERIES_DAILY',
    apikey: 'VY93B6B3A6CMLTKC',
    outputsize: 'full',
    symbol,
  });

  const res = await fetch(`https://www.alphavantage.co/query?${query}`);
  const fresh = await res.json();

  await redis.set(cacheKey, JSON.stringify(fresh));

  return fresh;
};

module.exports = fetchStockData;
