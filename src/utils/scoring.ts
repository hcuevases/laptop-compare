import type { Laptop } from '../types/laptop';

export const calculateScores = (laptop: Laptop) => {
  // Puntuación de Rendimiento (CPU + RAM)
  const cpuScore = laptop.specs.cpu.cores * 5 + (laptop.specs.gpu.type === 'Dedicated' ? 30 : 10);
  const ramScore = laptop.specs.ram.size * 2;
  const performance = Math.min(100, Math.round((cpuScore + ramScore) * 1.2));

  // Puntuación de Pantalla (Brillo + Refresco + Resolución)
  const brightnessScore = (laptop.specs.display.brightness / 500) * 40;
  const hzScore = (laptop.specs.display.refreshRate / 120) * 30;
  const resScore = laptop.specs.display.resolution.includes('4K') ? 30 : 20;
  const display = Math.min(100, Math.round(brightnessScore + hzScore + resScore));

  // Puntuación de Portabilidad (Peso)
  const portability = Math.min(100, Math.round(100 - (laptop.specs.weight * 25)));

  // Puntuación de Batería (Capacidad Wh)
  const battery = Math.min(100, Math.round((laptop.specs.battery.capacity / 100) * 100));

  // Nota Media
  const overall = Math.round((performance + display + portability + battery) / 4);

  return {
    performance,
    display,
    portability,
    battery,
    overall
  };
};
