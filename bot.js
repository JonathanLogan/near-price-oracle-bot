const near = require("./near");
const config = require("./config");
const { IsDifferentEnough } = require("./functions");

module.exports = {
  updatePrices: async function (relativeDiffs, old_prices, new_prices, state) {
    const current_time = new Date().getTime();
    let prices_to_update = [];
    const all_prices_updates = [];
    Object.entries(relativeDiffs).map(([ticker, relativeDiff]) => {
      const old_price = old_prices[ticker];
      const new_price = new_prices[ticker] || { multiplier: 0, decimals: 0 };
      console.log(
        `Compare ${ticker}: ${old_price.multiplier.toString()} and ${new_price.multiplier.toString()}`
      );
      if (new_price.multiplier > 0) {
        const price_update = {
          asset_id: ticker,
          price: {
            multiplier: Math.round(new_price.multiplier).toString(),
            decimals: new_price.decimals,
          },
        };
        all_prices_updates.push(price_update);
        if (IsDifferentEnough(relativeDiff, old_price, new_price)) {
          console.log(`!!! Update ${ticker} price`);
          prices_to_update.push(price_update);
        }
      }
    });

    if (
      state.lastFullUpdateTimestamp + config.FULL_UPDATE_PERIOD <=
      current_time
    ) {
      prices_to_update = all_prices_updates;
      state.lastFullUpdateTimestamp = current_time;
      console.log(`!!! Executing full price update`);
    }

    if (prices_to_update.length) {
      await near.NearCall(
        config.NEAR_ACCOUNT_ID,
        config.CONTRACT_ID,
        "report_prices",
        {
          prices: prices_to_update,
        }
      );
    }
  },
};
