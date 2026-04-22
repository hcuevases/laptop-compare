import React from 'react';
import type { Laptop } from '../types/laptop';
import './ComparisonTable.css';
import { X } from 'lucide-react';

interface ComparisonTableProps {
  laptops: Laptop[];
  onClose: () => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ laptops, onClose }) => {
  if (laptops.length === 0) return null;

  const getBestValue = (keyPath: string[], isLowerBetter = false) => {
    const values = laptops.map(l => {
      let val: any = l;
      for (const key of keyPath) {
        val = val[key];
      }
      return val;
    });

    if (values.every(v => typeof v === 'number')) {
      const best = isLowerBetter ? Math.min(...values) : Math.max(...values);
      return best;
    }
    return null;
  };

  const SpecRow = ({ label, keyPath, unit = '', isLowerBetter = false }: { label: string, keyPath: string[], unit?: string, isLowerBetter?: boolean }) => {
    const bestValue = getBestValue(keyPath, isLowerBetter);
    
    return (
      <tr className="spec-row">
        <td className="spec-label">{label}</td>
        {laptops.map(laptop => {
          let value: any = laptop;
          for (const key of keyPath) {
            value = value[key];
          }
          const isBest = bestValue !== null && value === bestValue;
          return (
            <td key={laptop.id} className={`spec-value ${isBest ? 'best' : ''}`}>
              {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
              {unit}
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
              <tr>
                <th className="sticky-col">Specification</th>
                {laptops.map(laptop => (
                  <th key={laptop.id}>
                    <img src={laptop.image} alt={laptop.name} className="table-thumb" />
                    <div className="table-name">{laptop.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <SectionHeader title="Scores (0-100)" />
              <SpecRow label="Overall Score" keyPath={['scores', 'overall']} />
              <SpecRow label="Performance" keyPath={['scores', 'performance']} />
              <SpecRow label="Display Quality" keyPath={['scores', 'display']} />
              <SpecRow label="Portability" keyPath={['scores', 'portability']} />

              <SectionHeader title="Performance" />
              <SpecRow label="CPU" keyPath={['specs', 'cpu', 'name']} />
              <SpecRow label="Cores / Threads" keyPath={['specs', 'cpu', 'cores']} />
              <SpecRow label="GPU" keyPath={['specs', 'gpu', 'name']} />
              <SpecRow label="RAM Size" keyPath={['specs', 'ram', 'size']} unit="GB" />
              <SpecRow label="RAM Speed" keyPath={['specs', 'ram', 'speed']} />
              <SpecRow label="Storage" keyPath={['specs', 'storage', 'size']} unit="GB" />

              <SectionHeader title="Display" />
              <SpecRow label="Size" keyPath={['specs', 'display', 'size']} unit='"' />
              <SpecRow label="Resolution" keyPath={['specs', 'display', 'resolution']} />
              <SpecRow label="Panel Type" keyPath={['specs', 'display', 'panelType']} />
              <SpecRow label="Refresh Rate" keyPath={['specs', 'display', 'refreshRate']} unit="Hz" />
              <SpecRow label="Brightness" keyPath={['specs', 'display', 'brightness']} unit=" nits" />

              <SectionHeader title="Battery & Portability" />
              <SpecRow label="Battery Capacity" keyPath={['specs', 'battery', 'capacity']} unit=" Wh" />
              <SpecRow label="Weight" keyPath={['specs', 'weight']} unit=" kg" isLowerBetter={true} />
              
              <SectionHeader title="General" />
              <SpecRow label="Price" keyPath={['price']} unit="$" isLowerBetter={true} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
