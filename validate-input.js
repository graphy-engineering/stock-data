const validateInput = args => {
  const symbol = (args.symbol || '').trim();
  const since = (args.since || '').trim();
  const until = (args.until || '').trim();

  const parsed = { symbol, since, until };

  if (symbol.length === 0) {
    return [false, `Query param 'symbol' missing from input`, parsed];
  }

  if (since.length === 0 || !since.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return [false, `Expected query param 'since' in YYYY-MM-DD format, but got ${JSON.stringify(since)}`, parsed];
  }

  if (until.length === 0 || !until.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return [false, `Expected query param 'until' in YYYY-MM-DD format, but got ${JSON.stringify(until)}`, parsed];
  }

  return [true, null, parsed];
};

module.exports = validateInput;
