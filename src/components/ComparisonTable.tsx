import React from 'react';
import type { Laptop } from '../types/laptop';
import './ComparisonTable.css';
import { X, ExternalLink, ShoppingCart } from 'lucide-react';

interface ComparisonTableProps {
  laptops: Laptop[];
  onClose: () => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ laptops, onClose }) => {
  if (laptops.length === 0) return null;

  const getBestValue = (keyPath: string[], type: 'number' | 'resolution' | 'panel' = 'number', isLowerBetter = false) => {
    const values = laptops.map(l => {
      let val: any = l;
      for (const key of keyPath) { val = val[key]; }
      return val;
    });

    if (type === 'number') {
      const numValues = values.filter(v => typeof v === 'number');
      if (numValues.length === 0) return null;
      return isLowerBetter ? Math.min(...numValues) : Math.max(...numValues);
    }

    if (type === 'resolution') {
      const pixels = values.map(v => {
        const parts = v.split('x').map(Number);
        return parts[0] * parts[1];
      });
      return values[pixels.indexOf(Math.max(...pixels))];
    }

    if (type === 'panel') {
      const priority = ['OLED', 'Mini-LED', 'IPS', 'VA', 'TN'];
      const currentIndices = values.map(v => priority.findIndex(p => v.toUpperCase().includes(p)));
      const bestIndex = Math.min(...currentIndices.filter(i => i !== -1));
      return values[currentIndices.indexOf(bestIndex)];
    }

    return null;
  };

  const SpecRow = ({ label, keyPath, unit = '', type = 'number', isLowerBetter = false }: { 
    label: string, keyPath: string[], unit?: string, type?: 'number' | 'resolution' | 'panel', isLowerBetter?: boolean 
  }) => {
    const bestValue = getBestValue(keyPath, type, isLowerBetter);
    
    return (
      <tr className="spec-row">
        <td className="spec-label">{label}</td>
        {laptops.map(laptop => {
          let value: any = laptop;
          for (const key of keyPath) { value = value[key]; }
          const isBest = bestValue !== null && value === bestValue;
          return (
            <td key={laptop.id} className={`spec-value ${isBest ? 'best' : ''}`}>
              {value}{unit}
            </td>
          );
        })}
      </tr>
    );
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <tr className="section-header">
      <td colSpan={laptops.length + 1}>{title}</td>
    </tr>
  );

  return (
    <div className="comparison-overlay">
      <div className="comparison-modal glass-panel">
        <div className="modal-header">
          <h2>Detailed Comparison</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        
        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr className="sticky-header">
                <th className="sticky-col header-spec">Specification</th>
                {laptops.map(laptop => (
                  <th key={laptop.id} className="header-laptop">
                    <img src={laptop.image} alt={laptop.name} className="table-thumb" />
                    <div className="table-name">{laptop.name}</div>
                    <div className="table-score">Score: {laptop.scores?.overall}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <SectionHeader title="Performance" />
              <SpecRow label="CPU" keyPath={['specs', 'cpu', 'name']} />
              <SpecRow label="Cores / Threads" keyPath={['specs', 'cpu', 'cores']} />
              <SpecRow label="GPU" keyPath={['specs', 'gpu', 'name']} />
              <SpecRow label="RAM Size" keyPath={['specs', 'ram', 'size']} unit="GB" />
              <SpecRow label="RAM Speed" keyPath={['specs', 'ram', 'speed']} />
              <SpecRow label="Storage" keyPath={['specs', 'storage', 'size']} unit="GB" />

              <SectionHeader title="Display" />
              <SpecRow label="Size" keyPath={['specs', 'display', 'size']} unit='"' />
              <SpecRow label="Resolution" keyPath={['specs', 'display', 'resolution']} type="resolution" />
              <SpecRow label="Panel Type" keyPath={['specs', 'display', 'panelType']} type="panel" />
              <SpecRow label="Refresh Rate" keyPath={['specs', 'display', 'refreshRate']} unit="Hz" />
              <SpecRow label="Brightness" keyPath={['specs', 'display', 'brightness']} unit=" nits" />

              <SectionHeader title="Battery & Portability" />
              <SpecRow label="Battery Capacity" keyPath={['specs', 'battery', 'capacity']} unit=" Wh" />
              <SpecRow label="Weight" keyPath={['specs', 'weight']} unit=" kg" isLowerBetter={true} />
              
              <SectionHeader title="Pricing & Buy" />
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
