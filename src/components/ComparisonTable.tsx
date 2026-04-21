import React from 'react';
import type { Laptop } from '../data/laptops';
import './ComparisonTable.css';
import { X } from 'lucide-react';

interface ComparisonTableProps {
  selectedLaptops: Laptop[];
  onRemove: (id: number) => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ selectedLaptops, onRemove }) => {
  if (selectedLaptops.length === 0) return null;

  const specs = [
    { label: 'Precio', key: 'price', format: (v: number) => `$${v}` },
    { label: 'Procesador', key: 'cpu' },
    { label: 'RAM', key: 'ram' },
    { label: 'Almacenamiento', key: 'storage' },
    { label: 'Pantalla', key: 'display' },
    { label: 'Peso', key: 'weight' },
  ];

  return (
    <div className="comparison-container">
      <h2 className="comparison-title">Comparación Detallada</h2>
      <div className="table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="sticky-col">Especificación</th>
              {selectedLaptops.map(laptop => (
                <th key={laptop.id}>
                  <div className="th-content">
                    <button className="remove-btn" onClick={() => onRemove(laptop.id)}>
                      <X size={16} />
                    </button>
                    <img src={laptop.image} alt={laptop.name} className="table-img" />
                    <span>{laptop.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map(spec => (
              <tr key={spec.key}>
                <td className="spec-label sticky-col">{spec.label}</td>
                {selectedLaptops.map(laptop => (
                  <td key={`${laptop.id}-${spec.key}`}>
                    {spec.format ? spec.format(laptop[spec.key as keyof Laptop] as any) : laptop[spec.key as keyof Laptop]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
