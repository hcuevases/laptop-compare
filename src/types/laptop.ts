export interface LaptopSpecs {
  cpu: {
    name: string;
    cores: number;
    threads: number;
    baseClock: string;
    boostClock: string;
  };
  gpu: {
    name: string;
    type: 'Integrated' | 'Dedicated';
    vram?: string;
  };
  ram: {
    size: number;
    type: string;
    speed: string;
  };
  storage: {
    size: number;
    type: string;
  };
  display: {
    size: number;
    resolution: string;
    panelType: string;
    refreshRate: number;
    brightness: number; // in nits
    colorGamut: string; // e.g., "100% sRGB"
  };
  battery: {
    capacity: number; // in Wh
    estimatedLife: string;
  };
  ports: string[];
  weight: number; // in kg
}

export interface Laptop {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: 'Gaming' | 'Ultrabook' | 'Workstation' | 'Budget';
  specs: LaptopSpecs;
  scores?: {
    performance: number;
    display: number;
    portability: number;
    battery: number;
    overall: number;
  };
}
