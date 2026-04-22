import { useState, useMemo, useEffect } from 'react';
import type { Laptop } from './types/laptop';
import LaptopCard from './components/LaptopCard';
import ComparisonTable from './components/ComparisonTable';
import { Search, Loader2 } from 'lucide-react';
import './App.css';

function App() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('./data/laptops.json')
      .then(res => res.json())
      .then(data => {
        setLaptops(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load laptops:", err);
        setLoading(false);
      });
  }, []);

  const filteredLaptops = useMemo(() => {
    return laptops.filter(laptop => 
      laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.specs.cpu.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, laptops]);

  const toggleCompare = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : (prev.length < 4 ? [...prev, id] : prev)
    );
  };

  const selectedLaptops = laptops.filter(l => selectedIds.includes(l.id));

  return (
    <div className="app-container">
      <header>
        <h1>LaptopPro <span style={{fontSize: '1rem', verticalAlign: 'middle', opacity: 0.6}}>Compare</span></h1>
        <p className="subtitle">Find and compare the best laptops on the market</p>
      </header>

      <section className="search-section">
        <div className="search-container">
          <Search className="search-icon" size={20} style={{position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)'}} />
          <input 
            type="text" 
            placeholder="Search by model, brand or CPU..." 
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{paddingLeft: '3.5rem'}}
          />
        </div>
      </section>

      {loading ? (
        <div className="loading-state">
          <Loader2 className="animate-spin" size={48} />
          <p>Loading massive database...</p>
        </div>
      ) : (
        <main className="laptops-grid">
          {filteredLaptops.length > 0 ? (
            filteredLaptops.map(laptop => (
              <LaptopCard 
                key={laptop.id} 
                laptop={laptop} 
                isSelected={selectedIds.includes(laptop.id)}
                onToggle={toggleCompare}
                selectionCount={selectedIds.length}
              />
            ))
          ) : (
            <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)'}}>
              No laptops found matching your search.
            </div>
          )}
        </main>
      )}

      {selectedIds.length > 0 && (
        <div className="selection-tray glass-panel">
          <div className="selection-info">
            <strong>{selectedIds.length}</strong> {selectedIds.length === 1 ? 'laptop' : 'laptops'} selected
            <span style={{color: 'var(--text-secondary)', marginLeft: '1rem', fontSize: '0.9rem'}}>
              (Max 4)
            </span>
          </div>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <button className="clear-btn" onClick={() => setSelectedIds([])} style={{background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer'}}>Clear all</button>
            <button 
              className="compare-btn" 
              onClick={() => setShowComparison(true)}
              disabled={selectedIds.length < 2}
            >
              Compare Now
            </button>
          </div>
        </div>
      )}

      {showComparison && (
        <ComparisonTable 
          laptops={selectedLaptops} 
          onClose={() => setShowComparison(false)} 
        />
      )}
    </div>
  );
}

export default App;
