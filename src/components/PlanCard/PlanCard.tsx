import React from 'react';
import './PlanCard.css';

interface PlanCardProps {
  name: string;
  price: string;
  period?: string;
  selected?: boolean;
  popular?: boolean;
  onClick?: () => void;
  className?: string;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  name,
  price,
  period = "/mo",
  selected = false,
  popular = false,
  onClick,
  className = ""
}) => {
  return (
    <div 
      className={`plan-card ${selected ? 'selected' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="plan-card-left">
        <div className={`plan-radio ${selected ? 'active' : ''}`} />
        <div className="plan-info">
          <span className="plan-name">{name}</span>
          {popular && <span className="plan-badge">POPULAR</span>}
        </div>
      </div>
      <div className="plan-price">
        <span className="price-value">{price}</span>
        <span className="price-period">{period}</span>
      </div>
    </div>
  );
};

export default PlanCard;
