import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StockFilter } from '../StockFilter';

describe('StockFilter', () => {
  const mockTickers = ['AAPL', 'MSFT', 'GOOGL', 'TSLA'];
  const mockOnFilterChange = vi.fn();
  const defaultProps = {
    tickers: mockTickers,
    onFilterChange: mockOnFilterChange,
    selectedTicker: null,
  };

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('renders correctly with all tickers', () => {
    const { container } = render(<StockFilter {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with selected ticker', () => {
    const { container } = render(<StockFilter {...defaultProps} selectedTicker="AAPL" />);
    expect(container).toMatchSnapshot();
  });

  it('filters tickers based on search input', async () => {
    render(<StockFilter {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Rechercher une action...');
    fireEvent.change(searchInput, { target: { value: 'AAPL' } });
    
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.queryByText('MSFT')).not.toBeInTheDocument();
    expect(screen.queryByText('GOOGL')).not.toBeInTheDocument();
    expect(screen.queryByText('TSLA')).not.toBeInTheDocument();
  });

  it('displays a message when no tickers match search', () => {
    render(<StockFilter {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Rechercher une action...');
    fireEvent.change(searchInput, { target: { value: 'XYZ' } });
    
    expect(screen.getByText('Aucune action trouvée')).toBeInTheDocument();
    expect(screen.queryByText('AAPL')).not.toBeInTheDocument();
  });

  it('renders with empty tickers list', () => {
    const { container } = render(
      <StockFilter 
        tickers={[]} 
        onFilterChange={mockOnFilterChange} 
        selectedTicker={null} 
      />
    );
    expect(container).toMatchSnapshot();
  });
}); 