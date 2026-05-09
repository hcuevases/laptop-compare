import React from 'react';
import type { Laptop } from '../types/laptop';
import './ComparisonTable.css';
import { X, ExternalLink, ShoppingCart } from 'lucide-react';

interface ComparisonTableProps {
  laptops: Laptop[];
  onClose: () => void;
}

const getBestValue = (laptops: Laptop[], keyPath: string[], type: 'number' | 'resolution' | 'panel' = 'number', isLowerBetter = false) => {
  const values = laptops.map(l => {
    let val: unknown = l;
    for (const key of keyPath) { val = (val as Record<string, unknown>)[key]; }
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
    const priority = ['OLED', 'Mini-LED', 'IPS', 'VA', 'TN'];
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

const SpecRow = ({ label, keyPath, laptops, unit = '', type = 'number', isLowerBetter = false }: { 
  label: string, keyPath: string[], laptops: Laptop[], unit?: string, type?: 'number' | 'resolution' | 'panel', isLowerBetter?: boolean 
}) => {
  const bestValue = getBestValue(laptops, keyPath, type, isLowerBetter);
  
  return (
    <tr className="spec-row">
      <td className="spec-label">{label}</td>
      {laptops.map(laptop => {
        let value: unknown = laptop;
        for (const key of keyPath) { value = (value as Record<string, unknown>)[key]; }
        const isBest = bestValue !== null && value === bestValue;
        return (
          <td key={laptop.id} className={`spec-value ${isBest ? 'best' : ''}`}>
            {value as React.ReactNode}{unit}
          </td>
        );
      })}
    </tr>
  );
};

const SectionHeader = ({ title, colSpan }: { title: string, colSpan: number }) => (
  <tr className="section-header">
    <td colSpan={colSpan}>{title}</td>
  </tr>
);

const ComparisonTable: React.FC<ComparisonTableProps> = ({ laptops, onClose }) => {
  if (laptops.length === 0) return null;

  return (
    <div className="comparison-overlay">
      <div className="comparison-modal glass-panel">
        <div className="modal-header">
          <h2>Detailed Comparison</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close"><X size={24} /></button>
        </div>
        
        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr className="sticky-header">
                <th className="sticky-col header-spec">Specification</th>
                {laptops.map(laptop => (
                  <th key={laptop.id} className="header-laptop">
                    <img 
                      src={laptop.image} 
                      alt={laptop.name} 
                      className="table-thumb" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80';
                      }}
                    />
                    <div className="table-name">{laptop.name}</div>
                    <div className="table-score">Score: {laptop.scores?.overall}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <SectionHeader title="Performance" colSpan={laptops.length + 1} />
              <SpecRow label="CPU" keyPath={['specs', 'cpu', 'name']} laptops={laptops} />
              <SpecRow label="Cores / Threads" keyPath={['specs', 'cpu', 'cores']} laptops={laptops} />
              <SpecRow label="GPU" keyPath={['specs', 'gpu', 'name']} laptops={laptops} />
              <SpecRow label="RAM Size" keyPath={['specs', 'ram', 'size']} unit="GB" laptops={laptops} />
              <SpecRow label="RAM Speed" keyPath={['specs', 'ram', 'speed']} laptops={laptops} />
              <SpecRow label="Storage" keyPath={['specs', 'storage', 'size']} unit="GB" laptops={laptops} />

              <SectionHeader title="Display" colSpan={laptops.length + 1} />
              <SpecRow label="Size" keyPath={['specs', 'display', 'size']} unit='"' laptops={laptops} />
              <SpecRow label="Resolution" keyPath={['specs', 'display', 'resolution']} type="resolution" laptops={laptops} />
              <SpecRow label="Panel Type" keyPath={['specs', 'display', 'panelType']} type="panel" laptops={laptops} />
              <SpecRow label="Refresh Rate" keyPath={['specs', 'display', 'refreshRate']} unit="Hz" laptops={laptops} />
              <SpecRow label="Brightness" keyPath={['specs', 'display', 'brightness']} unit=" nits" laptops={laptops} />

              <SectionHeader title="Battery & Portability" colSpan={laptops.length + 1} />
              <SpecRow label="Battery Capacity" keyPath={['specs', 'battery', 'capacity']} unit=" Wh" laptops={laptops} />
              <SpecRow label="Weight" keyPath={['specs', 'weight']} unit=" kg" isLowerBetter={true} laptops={laptops} />
              
              <SectionHeader title="Pricing & Buy" colSpan={laptops.length + 1} />
              <tr className="spec-row">
                <td className="spec-label">Price USD</td>
                {laptops.map(l => <td key={l.id} className="spec-value">${l.price}</td>)}
              </tr>
              <tr className="spec-row">
                <td className="spec-label">Price EUR</td>
                {laptops.map(l => <td key={l.id} className="spec-value">{l.priceEUR}€</td>)}
              </tr>
              <tr className="spec-row">
                <td className="spec-label">Buy Now</td>
                {laptops.map(l => (
                  <td key={l.id} className="spec-value">
                    <a href={l.amazonUrl} target="_blank" rel="noopener noreferrer" className="amazon-link">
                      <ShoppingCart size={16} /> Amazon <ExternalLink size={12} />
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
