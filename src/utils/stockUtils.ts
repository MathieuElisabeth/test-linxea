import type { StockData, StockEvolution } from '../types/stock';

export const getUniqueTickers = (data: StockData[]): string[] => {
  return [...new Set(data.map(item => item.ticker))].sort();
};

export const getStockEvolution = (data: StockData[], ticker: string): StockEvolution | null => {
  const stockData = data
    .filter(item => item.ticker === ticker)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (stockData.length === 0) return null;

  const firstPrice = stockData[0].close;
  const lastPrice = stockData[stockData.length - 1].close;
  const evolution = ((lastPrice - firstPrice) / firstPrice) * 100;

  return {
    ticker,
    data: stockData,
    evolution
  };
};

export const filterTickers = (tickers: string[], searchTerm: string): string[] => {
  if (!searchTerm.trim()) return tickers;
  
  return tickers.filter(ticker => 
    ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}; 