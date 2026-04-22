import React from 'react';
import type { Laptop } from '../types/laptop';
import { Cpu, Monitor, Layers } from 'lucide-react';
import './LaptopCard.css';

interface LaptopCardProps {
  laptop: Laptop;
  isSelected: boolean;
  onToggle: (id: number) => void;
  selectionCount: number;
}

const LaptopCard: React.FC<LaptopCardProps> = ({ laptop, isSelected, onToggle, selectionCount }) => {
  const [imgSrc, setImgSrc] = React.useState(laptop.image);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'var(--score-high)';
    if (score >= 70) return 'var(--score-mid)';
    return 'var(--score-low)';
  };

  return (
    <div className={`laptop-card glass-panel ${isSelected ? 'selected' : ''}`}>
      <div className="card-header">
        <img 
          src={imgSrc} 
          alt={laptop.name} 
          className="laptop-image" 
          onError={() => setImgSrc('https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80')}
        />
        <div className="overall-score" style={{ borderColor: getScoreColor(laptop.scores?.overall || 0) }}>
          {laptop.scores?.overall}
        </div>
      </div>
      
      <div className="card-body">
        <div className="brand-badge">{laptop.brand}</div>
        <h3>{laptop.name}</h3>
        <p className="category">{laptop.category}</p>
        
        <div className="quick-specs">
          <div className="spec-item"><Cpu size={16} /> <span>{laptop.specs.cpu.name.split(' ').slice(0, 2).join(' ')}</span></div>
          <div className="spec-item"><Monitor size={16} /> <span>{laptop.specs.display.size}" {laptop.specs.display.panelType}</span></div>
          <div className="spec-item"><Layers size={16} /> <span>{laptop.specs.ram.size}GB {laptop.specs.ram.type}</span></div>
        </div>

        <div className="card-footer">
          <div className="price">${laptop.price}</div>
          <button 
            className={`select-btn ${isSelected ? 'active' : ''}`}
            onClick={() => onToggle(laptop.id)}
            disabled={!isSelected && selectionCount >= 4}
          >
            {isSelected ? 'Selected' : 'Compare'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaptopCard;
