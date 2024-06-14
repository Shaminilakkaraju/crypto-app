const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCryptos = async () => {
  const response = await fetch(`${API_BASE_URL}/coins/markets?vs_currency=inr`);
  const data = await response.json();
  return data;
};

export const fetchCryptoDetails = async (id) => {
  const response = await fetch(`${API_BASE_URL}/coins/${id}`);
  const data = await response.json();
  const formattedData = {
    name: data.name,
    symbol: data.symbol.toUpperCase(),
    current_price: data.market_data.current_price.inr,
    market_cap: data.market_data.market_cap.inr,
    high_24h: data.market_data.high_24h.inr,
    low_24h: data.market_data.low_24h.inr,
    price_change_percentage_24h: data.market_data.price_change_percentage_24h,
    total_volume: data.market_data.total_volume.inr,
  };

  return formattedData;
};

export const fetchCryptoHistory = async (id) => {
  const response = await fetch(`${API_BASE_URL}/coins/${id}/market_chart?vs_currency=inr&days=30`);
  const data = await response.json();
  return {
    dates: data.prices.map(price => new Date(price[0]).toLocaleDateString()),
    prices: data.prices.map(price => price[1]),
  };
};
