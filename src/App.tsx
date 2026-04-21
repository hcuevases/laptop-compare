import { useState } from 'react';
import { laptops, type Laptop } from './data/laptops';
import LaptopCard from './components/LaptopCard';
import ComparisonTable from './components/ComparisonTable';
import './App.css';
import { Laptop as LaptopIcon } from 'lucide-react';

function App() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleCompare = (laptop: Laptop) => {
    if (selectedIds.includes(laptop.id)) {
      setSelectedIds(selectedIds.filter(id => id !== laptop.id));
    } else {
      if (selectedIds.length >= 4) {
        alert("Máximo 4 portátiles para comparar");
        return;
      }
      setSelectedIds([...selectedIds, laptop.id]);
    }
  };

  const removeLaptop = (id: number) => {
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
  };

  const selectedLaptops = laptops.filter(laptop => selectedIds.includes(laptop.id));

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <LaptopIcon size={32} color="#2563eb" />
          <h1>Comparador de Portátiles</h1>
        </div>
        <p className="header-subtitle">Selecciona hasta 4 modelos para ver sus diferencias técnicas</p>
      </header>

      <main className="app-main">
        <div className="laptop-grid">
          {laptops.map(laptop => (
            <LaptopCard 
              key={laptop.id} 
              laptop={laptop} 
              isCompare={selectedIds.includes(laptop.id)}
              onCompareToggle={toggleCompare}
            />
          ))}
        </div>

        <ComparisonTable 
          selectedLaptops={selectedLaptops} 
          onRemove={removeLaptop} 
        />
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 LaptopCompare Pro. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
