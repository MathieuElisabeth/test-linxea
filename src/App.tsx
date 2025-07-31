
import { useState, useMemo } from 'react';
import { stockData } from '@data/stockData';
import { getUniqueTickers, getStockEvolution } from '@utils/stockUtils';
import type { FilterState } from '@/types/stock';
import { StockFilter } from '@components/StockFilter';
import { StockChart } from '@components/StockChart';
import './App.css';

export const App = () => {
  const [filter, setFilter] = useState<FilterState>({
    searchTerm: '',
    selectedTicker: null
  });

  const tickers = useMemo(() => getUniqueTickers(stockData), []);
  
  const stockEvolution = useMemo(() => {
    if (!filter.selectedTicker) return null;
    return getStockEvolution(stockData, filter.selectedTicker);
  }, [filter.selectedTicker]);

  const handleFilterChange = (newFilter: FilterState) => {
    setFilter(newFilter);
  };

  return (
    <div className="stock-app">
      <header className="app-header">
        <h1>📈 Visualisateur d'Évolution d'Actions</h1>
        <p>Explorez l'évolution annuelle du cours de vos actions préférées</p>
      </header>
      
      <main className="app-main">
        <aside className="sidebar">
          <StockFilter
            tickers={tickers}
            onFilterChange={handleFilterChange}
            selectedTicker={filter.selectedTicker}
          />
        </aside>
        
        <section className="chart-section">
          <StockChart stockEvolution={stockEvolution} />
        </section>
      </main>
    </div>
  );
}; 

export default App;
