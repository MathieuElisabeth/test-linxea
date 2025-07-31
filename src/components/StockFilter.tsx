import { useState, useCallback } from 'react';
import type { FilterState } from '@/types/stock';

interface StockFilterProps {
  tickers: string[];
  onFilterChange: (filter: FilterState) => void;
  selectedTicker: string | null;
}

export const StockFilter = ({ tickers, onFilterChange, selectedTicker }: StockFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onFilterChange({ searchTerm: newSearchTerm, selectedTicker });
  }, [onFilterChange, selectedTicker]);

  const handleTickerSelect = useCallback((ticker: string) => {
    onFilterChange({ searchTerm, selectedTicker: ticker });
  }, [searchTerm, onFilterChange]);

  const filteredTickers = tickers.filter(ticker => 
    ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="stock-filter">
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher une action..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      <div className="ticker-list">
        {filteredTickers.length === 0 ? (
          <div className="no-results">Aucune action trouvée</div>
        ) : (
          filteredTickers.map(ticker => (
            <button
              key={ticker}
              onClick={() => handleTickerSelect(ticker)}
              className={`ticker-button ${selectedTicker === ticker ? 'selected' : ''}`}
            >
              {ticker}
            </button>
          ))
        )}
      </div>
    </div>
  );
}; 