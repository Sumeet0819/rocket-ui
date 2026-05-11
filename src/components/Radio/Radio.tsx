import React, { createContext, useContext, ReactNode } from 'react';
import './Radio.css';

interface RadioContextType {
  value?: any;
  onChange?: (value: any) => void;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

interface RadioGroupProps {
  children: ReactNode;
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ 
  children, 
  value, 
  onChange, 
  className = "",
  layout = 'vertical' 
}) => {
  return (
    <RadioContext.Provider value={{ value, onChange }}>
      <div className={`radio-group ${layout} ${className}`}>
        {children}
      </div>
    </RadioContext.Provider>
  );
};

interface RadioProps {
  value: any;
  children: ReactNode;
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({ value, children, className = "" }) => {
  const context = useContext(RadioContext);
  const isSelected = context?.value === value;

  return (
    <label className={`radio-item ${isSelected ? 'selected' : ''} ${className}`}>
      <input 
        type="radio" 
        className="radio-input" 
        checked={isSelected}
        onChange={() => context?.onChange?.(value)}
      />
      <div className="radio-indicator">
        <div className="radio-outer">
          <div className="radio-inner" />
        </div>
      </div>
      <div className="radio-label">{children}</div>
    </label>
  );
};
