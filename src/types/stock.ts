export interface StockData {
  date: string;
  ticker: string;
  close: number;
  volume: number;
}

export interface StockEvolution {
  ticker: string;
  data: StockData[];
  evolution: number;
}

export interface FilterState {
  searchTerm: string;
  selectedTicker: string | null;
} 