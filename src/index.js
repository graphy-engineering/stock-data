const express = require('express');
const validateInput = require('./validate-input');
const fetchStockData = require('./fetch-stock-data');

const app = express();
const port = 10101;

app.get('/', async (req, res) => {
  const [valid, error, { symbol, since: S, until: U }] = validateInput(req.query);

  if (!valid) {
    return res.status(400).json({ error });
  }

  const data = await fetchStockData(symbol);

  try {
    const values = data['Time Series (Daily)'];
    const since = new Date(S);
    const until = new Date(U);

    return res.json({
      daily_prices: Object.keys(values).filter(D => {
        const date = new Date(D);
        return date >= since && date <= until;
      }).sort((a, b) => {
        return new Date(a) - new Date(b); // ascending
      }).reduce((acc, date) => {
        const point = values[date];

        return {
          ...acc,
          [date]: {
            open: parseFloat(point['1. open']),
            high: parseFloat(point['2. high']),
            low: parseFloat(point['3. low']),
            close: parseFloat(point['4. close']),
          },
        };
      }, {})
    });
  } catch (e) {
    return res.json(data);
  }
});

app.listen(port, () => console.log(`Running on :${port} 👍`));
