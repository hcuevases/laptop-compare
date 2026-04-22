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
  },
  {
    id: 5,
    name: "MacBook Pro 14 (M4 Pro)",
    brand: "Apple",
    price: 1999,
    priceEUR: 2399,
    amazonUrl: "https://www.amazon.es/s?k=macbook+pro+14+m4+pro",
    category: 'Ultrabook',
    image: "https://images.unsplash.com/photo-1517336714460-4c9889a10af5?w=400&q=80",
    specs: {
      cpu: { name: "Apple M4 Pro", cores: 14, threads: 14, baseClock: "3.5GHz", boostClock: "4.5GHz" },
      gpu: { name: "20-core GPU", type: 'Integrated' },
      ram: { size: 24, type: "LPDDR5X", speed: "8533MHz" },
      storage: { size: 512, type: "SSD" },
      display: { size: 14.2, resolution: "3024x1964", panelType: "Liquid Retina XDR", refreshRate: 120, brightness: 1000, colorGamut: "100% P3" },
      battery: { capacity: 72.4, estimatedLife: "22h" },
      ports: ["3x Thunderbolt 5", "HDMI 2.1", "MagSafe 3", "SDXC Card", "Jack 3.5mm"],
      weight: 1.60
    }
  },
  {
    id: 6,
    name: "MacBook Air 13 (M4)",
    brand: "Apple",
    price: 1099,
    priceEUR: 1299,
    amazonUrl: "https://www.amazon.es/s?k=macbook+air+m4",
    category: 'Ultrabook',
    image: "https://images.unsplash.com/photo-1517336714460-4c9889a10af5?w=400&q=80",
    specs: {
      cpu: { name: "Apple M4", cores: 10, threads: 10, baseClock: "3.5GHz", boostClock: "4.5GHz" },
      gpu: { name: "10-core GPU", type: 'Integrated' },
      ram: { size: 16, type: "LPDDR5X", speed: "7500MHz" },
      storage: { size: 256, type: "SSD" },
      display: { size: 13.6, resolution: "2560x1664", panelType: "Liquid Retina", refreshRate: 60, brightness: 500, colorGamut: "100% P3" },
      battery: { capacity: 52.6, estimatedLife: "18h" },
      ports: ["2x Thunderbolt 4", "MagSafe 3", "Jack 3.5mm"],
      weight: 1.24
    }
  },
  {
    id: 7,
    name: "Zenbook S 14 (UX5406)",
    brand: "ASUS",
    price: 1499,
    priceEUR: 1699,
    amazonUrl: "https://www.amazon.es/s?k=asus+zenbook+s+14+ux5406",
    category: 'Ultrabook',
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    specs: {
      cpu: { name: "Intel Core Ultra 7 258V", cores: 8, threads: 8, baseClock: "2.2GHz", boostClock: "4.8GHz" },
      gpu: { name: "Intel Arc Graphics 140V", type: 'Integrated' },
      ram: { size: 32, type: "LPDDR5X", speed: "8533MHz" },
      storage: { size: 1024, type: "SSD" },
      display: { size: 14.0, resolution: "2880x1800", panelType: "OLED", refreshRate: 120, brightness: 400, colorGamut: "100% DCI-P3" },
      battery: { capacity: 72, estimatedLife: "15h" },
      ports: ["2x Thunderbolt 4", "1x USB-A 3.2", "HDMI 2.1", "Jack 3.5mm"],
      weight: 1.20
    }
  },
  {
    id: 8,
    name: "ThinkPad X1 Carbon Gen 13",
    brand: "Lenovo",
    price: 1899,
    priceEUR: 2199,
    amazonUrl: "https://www.amazon.es/s?k=thinkpad+x1+carbon+gen+13",
    category: 'Ultrabook',
    image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=400&q=80",
    specs: {
      cpu: { name: "Intel Core Ultra 7 258V", cores: 8, threads: 8, baseClock: "2.2GHz", boostClock: "4.8GHz" },
      gpu: { name: "Intel Arc Graphics 140V", type: 'Integrated' },
      ram: { size: 32, type: "LPDDR5X", speed: "8533MHz" },
      storage: { size: 1024, type: "SSD" },
      display: { size: 14.0, resolution: "2880x1800", panelType: "OLED", refreshRate: 120, brightness: 400, colorGamut: "100% DCI-P3" },
      battery: { capacity: 57, estimatedLife: "12h" },
      ports: ["2x Thunderbolt 4", "2x USB-A 3.2", "HDMI 2.1", "Nano SIM", "Jack 3.5mm"],
      weight: 0.98
    }
  },
  {
    id: 9,
    name: "Surface Laptop 7",
    brand: "Microsoft",
    price: 1199,
    priceEUR: 1399,
    amazonUrl: "https://www.amazon.es/s?k=surface+laptop+7",
    category: 'Ultrabook',
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    specs: {
      cpu: { name: "Snapdragon X Elite", cores: 12, threads: 12, baseClock: "3.4GHz", boostClock: "4.3GHz" },
      gpu: { name: "Qualcomm Adreno", type: 'Integrated' },
      ram: { size: 16, type: "LPDDR5X", speed: "8448MHz" },
      storage: { size: 512, type: "SSD" },
      display: { size: 13.8, resolution: "2304x1536", panelType: "PixelSense", refreshRate: 120, brightness: 600, colorGamut: "100% sRGB" },
      battery: { capacity: 54, estimatedLife: "15h" },
      ports: ["2x USB-C (USB4)", "1x USB-A 3.1", "Surface Connect", "Jack 3.5mm"],
      weight: 1.34
    }
  },
  {
    id: 10,
    name: "ROG Zephyrus G14 (2024)",
    brand: "ASUS",
    price: 1799,
    priceEUR: 1999,
    amazonUrl: "https://www.amazon.es/s?k=rog+zephyrus+g14+2024",
    category: 'Gaming',
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80",
    specs: {
      cpu: { name: "AMD Ryzen 9 8945HS", cores: 8, threads: 16, baseClock: "4.0GHz", boostClock: "5.2GHz" },
      gpu: { name: "NVIDIA RTX 4070", type: 'Dedicated', vram: "8GB GDDR6" },
      ram: { size: 32, type: "LPDDR5X", speed: "6400MHz" },
      storage: { size: 1024, type: "SSD" },
      display: { size: 14.0, resolution: "2880x1800", panelType: "OLED", refreshRate: 120, brightness: 500, colorGamut: "100% DCI-P3" },
      battery: { capacity: 73, estimatedLife: "8h" },
      ports: ["1x USB4", "1x USB-C 3.2", "2x USB-A 3.2", "HDMI 2.1", "MicroSD"],
      weight: 1.50
    }
  },
  {
    id: 11,
    name: "Legion Pro 7i Gen 9",
    brand: "Lenovo",
    price: 2499,
    priceEUR: 2799,
    amazonUrl: "https://www.amazon.es/s?k=legion+pro+7i+gen+9",
    category: 'Gaming',
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80",
    specs: {
      cpu: { name: "Intel Core i9-14900HX", cores: 24, threads: 32, baseClock: "2.2GHz", boostClock: "5.8GHz" },
      gpu: { name: "NVIDIA RTX 4090", type: 'Dedicated', vram: "16GB GDDR6" },
      ram: { size: 32, type: "DDR5", speed: "5600MHz" },
      storage: { size: 2048, type: "SSD" },
      display: { size: 16.0, resolution: "2560x1600", panelType: "IPS", refreshRate: 240, brightness: 500, colorGamut: "100% sRGB" },
      battery: { capacity: 99.9, estimatedLife: "6h" },
      ports: ["1x Thunderbolt 4", "1x USB-C 3.2", "4x USB-A 3.2", "HDMI 2.1", "Ethernet"],
      weight: 2.60
    }
  },
  {
    id: 12,
    name: "Swift Go 14 OLED",
    brand: "Acer",
    price: 899,
    priceEUR: 999,
    amazonUrl: "https://www.amazon.es/s?k=acer+swift+go+14+oled",
    category: 'Ultrabook',
    image: "https://images.unsplash.com/photo-1517336714460-4c9889a10af5?w=400&q=80",
    specs: {
      cpu: { name: "Intel Core Ultra 7 155H", cores: 16, threads: 22, baseClock: "1.4GHz", boostClock: "4.8GHz" },
      gpu: { name: "Intel Arc Graphics", type: 'Integrated' },
      ram: { size: 16, type: "LPDDR5X", speed: "6400MHz" },
      storage: { size: 1024, type: "SSD" },
      display: { size: 14.0, resolution: "2880x1800", panelType: "OLED", refreshRate: 90, brightness: 400, colorGamut: "100% DCI-P3" },
      battery: { capacity: 65, estimatedLife: "10h" },
      ports: ["2x Thunderbolt 4", "2x USB-A 3.2", "HDMI 2.1", "MicroSD"],
      weight: 1.30
    }
  },
  {
    id: 13,
    name: "Raider 18 HX",
    brand: "MSI",
    price: 3499,
    priceEUR: 3999,
    amazonUrl: "https://www.amazon.es/s?k=msi+raider+18+hx",
    category: 'Gaming',
    image: "https://images.unsplash.com/photo-1592434134753-a70baf7979d7?w=400&q=80",
    specs: {
      cpu: { name: "Intel Core i9-14900HX", cores: 24, threads: 32, baseClock: "2.2GHz", boostClock: "5.8GHz" },
      gpu: { name: "NVIDIA RTX 4090", type: 'Dedicated', vram: "16GB GDDR6" },
      ram: { size: 64, type: "DDR5", speed: "5600MHz" },
      storage: { size: 2048, type: "SSD" },
      display: { size: 18.0, resolution: "3840x2400", panelType: "Mini-LED", refreshRate: 120, brightness: 600, colorGamut: "100% DCI-P3" },
      battery: { capacity: 99.9, estimatedLife: "5h" },
      ports: ["2x Thunderbolt 4", "3x USB-A 3.2", "HDMI 2.1", "SD Reader", "Ethernet"],
      weight: 3.60
    }
  },
  {
    id: 14,
    name: "OmniBook Ultra 14",
    brand: "HP",
    price: 1399,
    priceEUR: 1599,
    amazonUrl: "https://www.amazon.es/s?k=hp+omnibook+ultra+14",
    category: 'Ultrabook',
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    specs: {
      cpu: { name: "AMD Ryzen AI 9 HX 375", cores: 12, threads: 24, baseClock: "2.0GHz", boostClock: "5.1GHz" },
      gpu: { name: "AMD Radeon 890M", type: 'Integrated' },
      ram: { size: 32, type: "LPDDR5x", speed: "7500MHz" },
      storage: { size: 1024, type: "SSD" },
      display: { size: 14.0, resolution: "2240x1400", panelType: "IPS", refreshRate: 60, brightness: 400, colorGamut: "100% sRGB" },
      battery: { capacity: 68, estimatedLife: "12h" },
      ports: ["2x Thunderbolt 4", "1x USB-A 3.2", "Jack 3.5mm"],
      weight: 1.57
    }
  },
  {
    id: 15,
    name: "Galaxy Book4 Edge",
    brand: "Samsung",
    price: 1299,
    priceEUR: 1499,
    amazonUrl: "https://www.amazon.es/s?k=samsung+galaxy+book4+edge",
    category: 'Ultrabook',
    image: "https://images.unsplash.com/photo-1517336714460-4c9889a10af5?w=400&q=80",
    specs: {
      cpu: { name: "Snapdragon X Elite", cores: 12, threads: 12, baseClock: "3.4GHz", boostClock: "4.3GHz" },
      gpu: { name: "Qualcomm Adreno", type: 'Integrated' },
      ram: { size: 16, type: "LPDDR5X", speed: "8448MHz" },
      storage: { size: 512, type: "SSD" },
      display: { size: 14.0, resolution: "2880x1800", panelType: "AMOLED", refreshRate: 120, brightness: 400, colorGamut: "120% DCI-P3" },
      battery: { capacity: 55.9, estimatedLife: "14h" },
      ports: ["2x USB4", "HDMI 2.1", "MicroSD", "Jack 3.5mm"],
      weight: 1.16
    }
  },
  {
    id: 16,
    name: "Dell XPS 14 (2024)",
    brand: "Dell",
    price: 1699,
    priceEUR: 1899,
    amazonUrl: "https://www.amazon.es/s?k=dell+xps+14+2024",
    category: 'Ultrabook',
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80",
    specs: {
      cpu: { name: "Intel Core Ultra 7 155H", cores: 16, threads: 22, baseClock: "1.4GHz", boostClock: "4.8GHz" },
      gpu: { name: "NVIDIA RTX 4050", type: 'Dedicated', vram: "6GB GDDR6" },
      ram: { size: 32, type: "LPDDR5X", speed: "7467MHz" },
      storage: { size: 1024, type: "SSD" },
      display: { size: 14.5, resolution: "3200x2000", panelType: "OLED", refreshRate: 120, brightness: 400, colorGamut: "100% DCI-P3" },
      battery: { capacity: 70, estimatedLife: "10h" },
      ports: ["3x Thunderbolt 4", "MicroSD", "Jack 3.5mm"],
      weight: 1.70
    }
  },
  {
    id: 17,
    name: "Framework Laptop 13",
    brand: "Framework",
    price: 1099,
    priceEUR: 1199,
    amazonUrl: "https://www.amazon.es/s?k=framework+laptop+13+core+ultra",
    category: 'Ultrabook',
    image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=400&q=80",
    specs: {
      cpu: { name: "Intel Core Ultra 7 155H", cores: 16, threads: 22, baseClock: "1.4GHz", boostClock: "4.8GHz" },
      gpu: { name: "Intel Arc Graphics", type: 'Integrated' },
      ram: { size: 32, type: "DDR5", speed: "5600MHz" },
      storage: { size: 1024, type: "SSD" },
      display: { size: 13.5, resolution: "2880x1920", panelType: "IPS", refreshRate: 120, brightness: 500, colorGamut: "100% sRGB" },
      battery: { capacity: 61, estimatedLife: "10h" },
      ports: ["4x Expansion Ports", "Jack 3.5mm"],
      weight: 1.30
    }
  },
  {
    id: 18,
    name: "Vivobook S 15 (S5507)",
    brand: "ASUS",
    price: 1099,
    priceEUR: 1299,
    amazonUrl: "https://www.amazon.es/s?k=asus+vivobook+s+15+s5507",
    category: 'Ultrabook',
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    specs: {
      cpu: { name: "Snapdragon X Elite", cores: 12, threads: 12, baseClock: "3.4GHz", boostClock: "4.0GHz" },
      gpu: { name: "Qualcomm Adreno", type: 'Integrated' },
      ram: { size: 32, type: "LPDDR5X", speed: "8448MHz" },
      storage: { size: 1024, type: "SSD" },
      display: { size: 15.6, resolution: "2880x1620", panelType: "OLED", refreshRate: 120, brightness: 400, colorGamut: "100% DCI-P3" },
      battery: { capacity: 70, estimatedLife: "14h" },
      ports: ["2x USB4", "2x USB-A 3.2", "HDMI 2.1", "MicroSD", "Jack 3.5mm"],
      weight: 1.42
    }
  },
  {
    id: 19,
    name: "Victus 16 (2024)",
    brand: "HP",
    price: 999,
    priceEUR: 1099,
    amazonUrl: "https://www.amazon.es/s?k=hp+victus+16+2024",
    category: 'Gaming',
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80",
    specs: {
      cpu: { name: "AMD Ryzen 7 8845HS", cores: 8, threads: 16, baseClock: "3.8GHz", boostClock: "5.1GHz" },
      gpu: { name: "NVIDIA RTX 4060", type: 'Dedicated', vram: "8GB GDDR6" },
      ram: { size: 16, type: "DDR5", speed: "5600MHz" },
      storage: { size: 512, type: "SSD" },
      display: { size: 16.1, resolution: "1920x1080", panelType: "IPS", refreshRate: 144, brightness: 300, colorGamut: "100% sRGB" },
      battery: { capacity: 70, estimatedLife: "7h" },
      ports: ["1x USB-C 3.2", "3x USB-A 3.2", "HDMI 2.1", "Ethernet", "Jack 3.5mm"],
      weight: 2.30
    }
  }
];

export const laptops: Laptop[] = baseLaptops.map(laptop => ({
  ...laptop,
  scores: calculateScores(laptop)
}));
