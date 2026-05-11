import React, { ReactNode } from 'react';
import './SelectionCard.css';
import { Circle, CheckCircle2 } from 'lucide-react';

interface SelectionCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: ReactNode;
  selected?: boolean;
  type?: 'radio' | 'checkbox';
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  title,
  subtitle,
  description,
  icon,
  selected = false,
  type = 'radio',
  onClick,
  className = "",
  size = 'md'
}) => {
  return (
    <div 
      className={`selection-card ${selected ? 'selected' : ''} ${size} ${className}`}
      onClick={onClick}
    >
      <div className="selection-card-content">
        {icon && <div className="selection-card-icon">{icon}</div>}
        <div className="selection-card-text">
          <div className="selection-card-header">
            <span className="selection-card-title">{title}</span>
            {subtitle && <span className="selection-card-subtitle">({subtitle})</span>}
          </div>
          {description && <p className="selection-card-description">{description}</p>}
        </div>
      </div>
      
      <div className="selection-card-indicator">
        {type === 'radio' ? (
          <div className={`radio-dot ${selected ? 'active' : ''}`} />
        ) : (
          <div className={`checkbox-box ${selected ? 'active' : ''}`}>
            {selected && <CheckCircle2 size={16} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionCard;
