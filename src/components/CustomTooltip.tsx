import { formatCurrency } from '@utils/stockUtils';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Date: ${label}`}</p>
        <p className="value">{`Prix: ${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
