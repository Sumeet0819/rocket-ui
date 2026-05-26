import React, { useState, ReactNode } from 'react';
import { Copy, Terminal, Package, Code } from 'lucide-react';

interface ControlProps {
  label: string;
  type: 'text' | 'range' | 'color' | 'select';
  value: any;
  onChange: (value: any) => void;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}

const Control: React.FC<ControlProps> = ({ label, type, value, onChange, min, max, step, options }) => {
  return (
    <div className="control-card">
      <label className="control-label">{label}</label>
      {type === 'text' && (
        <input
          type="text"
          className="control-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {type === 'range' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input
            type="range"
            className="control-range"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(parseFloat(e.target.value))}
          />
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', minWidth: '24px' }}>{value}</span>
        </div>
      )}
      {type === 'color' && (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: '32px', height: '32px', border: '1px solid var(--border-subtle)', background: 'transparent', borderRadius: '4px', cursor: 'pointer' }}
          />
          <input
            type="text"
            className="control-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )}
      {type === 'select' && (
        <select 
          className="control-input" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          style={{ background: 'var(--bg-app)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '6px' }}
        >
          {options?.map(opt => (
            <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
          ))}
        </select>
      )}
    </div>
  );
};

interface ComponentPlaygroundProps {
  title: string;
  description: string;
  demo: ReactNode;
  controls: ControlProps[];
  code: string;
  dependencies: string[];
}

export const ComponentPlayground: React.FC<ComponentPlaygroundProps> = ({
  title,
  description,
  demo,
  controls,
  code,
  dependencies
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'deps'>('code');

  return (
    <div className="playground-container">
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>{title}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{description}</p>
      </div>

      <div className="playground-workspace">
        {/* Left Column: Live Preview & Code */}
        <div className="workspace-main">
          <section className="demo-section">
            <div className="demo-header">
              <span className="demo-title">Viewport</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-subtle)' }}></div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-subtle)' }}></div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-subtle)' }}></div>
              </div>
            </div>
            <div className="demo-viewport">
              {demo}
            </div>
          </section>

          <section className="info-section">
            <div className="info-tabs">
              <button
                className={`info-tab ${activeTab === 'code' ? 'active' : ''}`}
                onClick={() => setActiveTab('code')}
              >
                <Code size={14} style={{ marginRight: '6px' }} />
                Code
              </button>
              <button
                className={`info-tab ${activeTab === 'deps' ? 'active' : ''}`}
                onClick={() => setActiveTab('deps')}
              >
                <Package size={14} style={{ marginRight: '6px' }} />
                Packages
              </button>
            </div>

            <div className="info-content">
              {activeTab === 'code' ? (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => navigator.clipboard.writeText(code)}
                    style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'var(--bg-surface-hover)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    <Copy size={12} />
                  </button>
                  <code>{code}</code>
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    <Terminal size={14} />
                    <span>sh install</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {dependencies.map(dep => (
                      <span key={dep} className="dependency-tag">{dep}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Configuration Sidebar */}
        <aside className="workspace-sidebar">
          <section className="controls-section">
            <h3 className="section-label">Configuration</h3>
            {controls.length > 0 ? (
              <div className="controls-stack">
                {controls.map((control, index) => (
                  <Control key={index} {...control} />
                ))}
              </div>
            ) : (
              <div className="no-controls-msg">
                No configurations available for this component.
              </div>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
};
