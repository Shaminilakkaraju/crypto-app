const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCryptos = async () => {
  const response = await fetch(`${API_BASE_URL}/coins/markets?vs_currency=inr`);
  const data = await response.json();
  return data;
};

export const fetchCryptoDetails = async (id) => {
  const response = await fetch(`${API_BASE_URL}/coins/${id}`);
  const data = await response.json();
  return data;
};

export const fetchCryptoHistory = async (id) => {
  const response = await fetch(`${API_BASE_URL}/coins/${id}/market_chart?vs_currency=ind&days=30`);
  const data = await response.json();
  return {
    dates: data.prices.map(price => new Date(price[0]).toLocaleDateString()),
    prices: data.prices.map(price => price[1]),
  };
};
