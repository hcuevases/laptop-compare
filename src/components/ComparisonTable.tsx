import React, { useState } from 'react';
import type { Laptop } from '../types/laptop';
import './ComparisonTable.css';
import { X, ExternalLink, ShoppingCart, Award, Zap, Monitor, Battery, ChevronRight } from 'lucide-react';

interface ComparisonTableProps {
  laptops: Laptop[];
  onClose: () => void;
}

const getBestValue = (laptops: Laptop[], keyPath: string[], type: 'number' | 'resolution' | 'panel' = 'number', isLowerBetter = false) => {
  const values = laptops.map(l => {
    let val: any = l;
    for (const key of keyPath) { val = val?.[key]; }
    return val;
  });

  if (type === 'number') {
    const numValues = values.filter(v => typeof v === 'number');
    if (numValues.length === 0) return null;
    return isLowerBetter ? Math.min(...numValues) : Math.max(...numValues);
  }

  if (type === 'resolution') {
    const pixels = values.map(v => {
      if (typeof v !== 'string') return 0;
      const parts = v.split('x').map(Number);
      return parts.length === 2 ? parts[0] * parts[1] : 0;
    });
    return values[pixels.indexOf(Math.max(...pixels))];
  }

  if (type === 'panel') {
    const priority = ['OLED', 'MINI-LED', 'IPS', 'VA', 'TN'];
    const currentIndices = values.map(v => {
      if (typeof v !== 'string') return -1;
      return priority.findIndex(p => v.toUpperCase().includes(p));
    });
    const validIndices = currentIndices.filter(i => i !== -1);
    if (validIndices.length === 0) return null;
    const bestIndex = Math.min(...validIndices);
    return values[currentIndices.indexOf(bestIndex)];
  }

  return null;
};

const ScoreBar = ({ score, label, color = 'var(--accent)' }: { score: number, label: string, color?: string }) => (
  <div className="score-container">
    <div className="score-label-row">
      <span>{label}</span>
      <span className="score-value">{score}/100</span>
    </div>
    <div className="score-bar-bg">
      <div className="score-bar-fill" style={{ width: `${score}%`, backgroundColor: color }}></div>
    </div>
  </div>
);

const ComparisonTable: React.FC<ComparisonTableProps> = ({ laptops, onClose }) => {
  const [highlightDifferences, setHighlightDifferences] = useState(true);
  
  if (laptops.length === 0) return null;

  const checkDifferent = (keyPath: string[]) => {
    if (laptops.length < 2) return false;
    const values = laptops.map(l => {
      let val: any = l;
      for (const key of keyPath) { val = val?.[key]; }
      return JSON.stringify(val);
    });
    return new Set(values).size > 1;
  };

  const SpecRow = ({ label, keyPath, unit = '', type = 'number', isLowerBetter = false }: { 
    label: string, keyPath: string[], unit?: string, type?: 'number' | 'resolution' | 'panel', isLowerBetter?: boolean 
  }) => {
    const isDifferent = checkDifferent(keyPath);
    if (highlightDifferences && !isDifferent && laptops.length > 1) {
      return null; // Ocultar si son iguales y el filtro está activo
    }

    const bestValue = getBestValue(laptops, keyPath, type, isLowerBetter);
    
    return (
      <tr className={`spec-row ${isDifferent ? 'is-different' : ''}`}>
        <td className="spec-label">{label}</td>
        {laptops.map(laptop => {
          let value: any = laptop;
          for (const key of keyPath) { value = value?.[key]; }
          const isBest = bestValue !== null && value === bestValue;
          return (
            <td key={laptop.id} className={`spec-value ${isBest ? 'best-value' : ''}`}>
              {isBest && <Award size={14} className="best-icon" />}
              {value}{unit}
            </td>
          );
        })}
      </tr>
    );
  };

  return (
    <div className="comparison-overlay">
      <div className="comparison-modal glass-panel">
        <div className="modal-header">
          <div className="header-info">
            <h2><Zap size={24} className="title-icon" /> Laptop Comparison</h2>
            <div className="header-controls">
              <label className="toggle-control">
                <input 
                  type="checkbox" 
                  checked={highlightDifferences} 
                  onChange={(e) => setHighlightDifferences(e.target.checked)} 
                />
                <span className="toggle-label">Only differences</span>
              </label>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close"><X size={24} /></button>
        </div>
        
        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr className="sticky-header">
                <th className="sticky-col header-spec">Specification</th>
                {laptops.map(laptop => (
                  <th key={laptop.id} className="header-laptop">
                    <div className="badge-container">
                      {laptop.scores.overall >= 85 && <span className="premium-badge">Editor's Choice</span>}
                    </div>
                    <img 
                      src={laptop.image} 
                      alt={laptop.name} 
                      className="table-thumb" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80';
                      }}
                    />
                    <div className="table-name">{laptop.name}</div>
                    <div className="overall-score-pill">
                      {laptop.scores.overall}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="section-header">
                <td colSpan={laptops.length + 1}><Zap size={16} /> Performance & Scores</td>
              </tr>
              <tr className="spec-row no-highlight">
                <td className="spec-label">Performance Ratings</td>
                {laptops.map(l => (
                  <td key={l.id} className="spec-value">
                    <ScoreBar score={l.scores.performance} label="System" color="#3b82f6" />
                    <ScoreBar score={l.scores.display} label="Display" color="#8b5cf6" />
                    <ScoreBar score={l.scores.battery} label="Battery" color="#10b981" />
                  </td>
                ))}
              </tr>
              
              <SpecRow label="CPU" keyPath={['specs', 'cpu', 'name']} />
              <SpecRow label="Cores / Threads" keyPath={['specs', 'cpu', 'cores']} />
              <SpecRow label="GPU" keyPath={['specs', 'gpu', 'name']} />
              <SpecRow label="RAM" keyPath={['specs', 'ram', 'size']} unit="GB" />
              <SpecRow label="Storage" keyPath={['specs', 'storage', 'size']} unit="GB" />

              <tr className="section-header">
                <td colSpan={laptops.length + 1}><Monitor size={16} /> Display Quality</td>
              </tr>
              <SpecRow label="Size" keyPath={['specs', 'display', 'size']} unit='"' />
              <SpecRow label="Resolution" keyPath={['specs', 'display', 'resolution']} type="resolution" />
              <SpecRow label="Panel Type" keyPath={['specs', 'display', 'panelType']} type="panel" />
              <SpecRow label="Refresh Rate" keyPath={['specs', 'display', 'refreshRate']} unit="Hz" />
              <SpecRow label="Brightness" keyPath={['specs', 'display', 'brightness']} unit=" nits" />

              <tr className="section-header">
                <td colSpan={laptops.length + 1}><Battery size={16} /> Mobility & Battery</td>
              </tr>
              <SpecRow label="Battery" keyPath={['specs', 'battery', 'capacity']} unit=" Wh" />
              <SpecRow label="Weight" keyPath={['specs', 'weight']} unit=" kg" isLowerBetter={true} />
              
              <tr className="section-header">
                <td colSpan={laptops.length + 1}><ChevronRight size={16} /> Price & Buy</td>
              </tr>
              <tr className="spec-row">
                <td className="spec-label">Final Price</td>
                {laptops.map(l => (
                  <td key={l.id} className="spec-value price-cell">
                    <div className="price-usd">${l.price}</div>
                    <div className="price-eur">{l.priceEUR}€</div>
                  </td>
                ))}
              </tr>
              <tr className="spec-row no-highlight">
                <td className="spec-label">Store</td>
                {laptops.map(l => (
                  <td key={l.id} className="spec-value">
                    <a href={l.amazonUrl} target="_blank" rel="noopener noreferrer" className="buy-button">
                      <ShoppingCart size={16} /> Buy on Amazon
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
