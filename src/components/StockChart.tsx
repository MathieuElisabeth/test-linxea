import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { StockEvolution } from '@/types/stock';
import { formatCurrency, formatPercentage } from '@utils/stockUtils';
import CustomTooltip from './CustomTooltip';

interface StockChartProps {
  stockEvolution: StockEvolution | null;
}

interface ChartData {
  date: string;
  close: number;
  year: string;
}

export const StockChart = ({ stockEvolution }: StockChartProps) => {
  const chartData = useMemo((): ChartData[] => {
    if (!stockEvolution) return [];
    
    return stockEvolution.data.map(item => ({
      date: item.date,
      close: item.close,
      year: new Date(item.date).getFullYear().toString()
    }));
  }, [stockEvolution]);

  if (!stockEvolution) {
    return (
      <div className="chart-container">
        <div className="no-data">
          Sélectionnez une action pour voir son évolution
        </div>
      </div>
    );
  }



  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2>{stockEvolution.ticker}</h2>
        <div className={`evolution ${stockEvolution.evolution >= 0 ? 'positive' : 'negative'}`}>
          {formatPercentage(stockEvolution.evolution)}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value)}
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="close" 
            stroke="#8884d8" 
            strokeWidth={3}
            dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="chart-info">
        <div className="info-item">
          <span className="label">Prix initial:</span>
          <span className="value">{formatCurrency(chartData[0]?.close || 0)}</span>
        </div>
        <div className="info-item">
          <span className="label">Prix final:</span>
          <span className="value">{formatCurrency(chartData[chartData.length - 1]?.close || 0)}</span>
        </div>
        <div className="info-item">
          <span className="label">Évolution:</span>
          <span className={`value ${stockEvolution.evolution >= 0 ? 'positive' : 'negative'}`}>
            {formatPercentage(stockEvolution.evolution)}
          </span>
        </div>
      </div>
    </div>
  );
}; 