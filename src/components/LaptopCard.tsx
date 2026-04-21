import React from 'react';
import type { Laptop } from '../data/laptops';
import './LaptopCard.css';
import { Plus, Check } from 'lucide-react';

interface LaptopCardProps {
  laptop: Laptop;
  isCompare: boolean;
  onCompareToggle: (laptop: Laptop) => void;
}

const LaptopCard: React.FC<LaptopCardProps> = ({ laptop, isCompare, onCompareToggle }) => {
  return (
    <div className={`laptop-card ${isCompare ? 'selected' : ''}`}>
      <div className="laptop-image-container">
        <img src={laptop.image} alt={laptop.name} className="laptop-image" />
      </div>
      <div className="laptop-info">
        <span className="laptop-brand">{laptop.brand}</span>
        <h3 className="laptop-name">{laptop.name}</h3>
        <p className="laptop-price">${laptop.price}</p>
        <button 
          className={`compare-btn ${isCompare ? 'active' : ''}`}
          onClick={() => onCompareToggle(laptop)}
        >
          {isCompare ? <><Check size={18} /> Seleccionado</> : <><Plus size={18} /> Comparar</>}
        </button>
      </div>
    </div>
  );
};

export default LaptopCard;
