import type { Laptop } from '../types/laptop';
import { calculateScores } from '../utils/scoring';

const baseLaptops: Laptop[] = [
  {
    id: 1,
    name: "MacBook Air M3",
    brand: "Apple",
    price: 1299,
    priceEUR: 1199,
    amazonUrl: "https://www.amazon.es/s?k=macbook+air+m3",
    category: 'Ultrabook',
    image: "https://images.unsplash.com/photo-1517336714460-4c9889a10af5?w=400&q=80",
    specs: {
      cpu: { name: "Apple M3", cores: 8, threads: 8, baseClock: "2.4GHz", boostClock: "4.1GHz" },
      gpu: { name: "10-core GPU", type: 'Integrated' },
      ram: { size: 16, type: "LPDDR5X", speed: "6400MHz" },
      storage: { size: 512, type: "SSD" },
      display: { size: 13.6, resolution: "2560x1664", panelType: "Liquid Retina", refreshRate: 60, brightness: 500, colorGamut: "100% P3" },
      battery: { capacity: 52.6, estimatedLife: "18h" },
      ports: ["2x Thunderbolt 4", "MagSafe 3", "Jack 3.5mm"],
      weight: 1.24
    }
  },
  {
    id: 2,
    name: "Dell XPS 13 (2024)",
    brand: "Dell",
    price: 1149,
    priceEUR: 1049,
    amazonUrl: "https://www.amazon.es/s?k=dell+xps+13",
    category: 'Ultrabook',
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80",
    specs: {
      cpu: { name: "Intel Core Ultra 7 155H", cores: 16, threads: 22, baseClock: "1.4GHz", boostClock: "4.8GHz" },
      gpu: { name: "Intel Arc Graphics", type: 'Integrated' },
      ram: { size: 16, type: "LPDDR5X", speed: "7467MHz" },
      storage: { size: 1024, type: "SSD" },
      display: { size: 13.4, resolution: "1920x1200", panelType: "FHD+ IPS", refreshRate: 120, brightness: 500, colorGamut: "100% sRGB" },
      battery: { capacity: 55, estimatedLife: "12h" },
      ports: ["2x Thunderbolt 4"],
      weight: 1.19
    }
  },
  {
    id: 3,
    name: "ROG Zephyrus G14",
    brand: "ASUS",
    price: 1599,
    priceEUR: 1499,
    amazonUrl: "https://www.amazon.es/s?k=rog+zephyrus+g14",
    category: 'Gaming',
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80",
    specs: {
      cpu: { name: "AMD Ryzen 9 8945HS", cores: 8, threads: 16, baseClock: "4.0GHz", boostClock: "5.2GHz" },
      gpu: { name: "NVIDIA RTX 4060", type: 'Dedicated', vram: "8GB GDDR6" },
      ram: { size: 32, type: "LPDDR5X", speed: "6400MHz" },
      storage: { size: 1024, type: "SSD" },
      display: { size: 14.0, resolution: "2880x1800", panelType: "OLED", refreshRate: 120, brightness: 500, colorGamut: "100% DCI-P3" },
      battery: { capacity: 73, estimatedLife: "8h" },
      ports: ["1x USB-C 4.0", "1x USB-C 3.2", "2x USB-A 3.2", "HDMI 2.1", "MicroSD"],
      weight: 1.50
    }
  },
  {
    id: 4,
    name: "Razer Blade 16",
    brand: "Razer",
    price: 2999,
    priceEUR: 2799,
    amazonUrl: "https://www.amazon.es/s?k=razer+blade+16",
    category: 'Gaming',
    image: "https://images.unsplash.com/photo-1592434134753-a70baf7979d7?w=400&q=80",
    specs: {
      cpu: { name: "Intel Core i9-14900HX", cores: 24, threads: 32, baseClock: "2.2GHz", boostClock: "5.8GHz" },
      gpu: { name: "NVIDIA RTX 4080", type: 'Dedicated', vram: "12GB GDDR6" },
      ram: { size: 32, type: "DDR5", speed: "5600MHz" },
      storage: { size: 2048, type: "SSD" },
      display: { size: 16.0, resolution: "3840x2400", panelType: "Mini-LED", refreshRate: 240, brightness: 1000, colorGamut: "100% DCI-P3" },
      battery: { capacity: 95, estimatedLife: "6h" },
      ports: ["1x Thunderbolt 4", "1x USB-C 3.2", "3x USB-A 3.2", "HDMI 2.1", "SD Reader"],
      weight: 2.45
    }
  }
];

export const laptops: Laptop[] = baseLaptops.map(laptop => ({
  ...laptop,
  scores: calculateScores(laptop)
}));
