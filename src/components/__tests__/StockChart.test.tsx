import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StockChart } from '../StockChart';
import type { StockEvolution } from '@/types/stock';

vi.mock('recharts', () => ({
  LineChart: ({ children }: { children: React.ReactNode }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
}));

describe('StockChart', () => {
  const mockStockEvolution: StockEvolution = {
    ticker: 'AAPL',
    data: [
      { date: '2020-12-31', ticker: 'AAPL', close: 132.69, volume: 99116671 },
      { date: '2021-12-31', ticker: 'AAPL', close: 177.57, volume: 74537652 },
      { date: '2022-12-30', ticker: 'AAPL', close: 129.93, volume: 91420614 },
      { date: '2023-12-29', ticker: 'AAPL', close: 182.09, volume: 68341205 },
      { date: '2024-12-31', ticker: 'AAPL', close: 200.15, volume: 70512345 },
    ],
    evolution: 50.85,
  };

  it('renders correctly when no stock evolution is provided', () => {
    const { container } = render(<StockChart stockEvolution={null} />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with stock evolution data', () => {
    const { container } = render(<StockChart stockEvolution={mockStockEvolution} />);
    expect(container).toMatchSnapshot();
  });

  it('displays correct stock information when data is provided', () => {
    render(<StockChart stockEvolution={mockStockEvolution} />);
    
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    
    const percentageElements = screen.getAllByText('+50.85%');
    expect(percentageElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText('$132.69')).toBeInTheDocument();
    expect(screen.getByText('$200.15')).toBeInTheDocument();
    
    expect(screen.getByText('Prix initial:')).toBeInTheDocument();
    expect(screen.getByText('Prix final:')).toBeInTheDocument();
    expect(screen.getByText('Évolution:')).toBeInTheDocument();
  });
}); 