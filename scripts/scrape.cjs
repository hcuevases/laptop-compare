const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Reutilizamos la lógica de scoring en el script (simplificada para JS)
const calculateScores = (laptop) => {
  const cpuScore = laptop.specs.cpu.cores * 5 + (laptop.specs.gpu.type === 'Dedicated' ? 30 : 10);
  const ramScore = laptop.specs.ram.size * 2;
  const performance = Math.min(100, Math.round((cpuScore + ramScore) * 1.2));

  const brightnessScore = (laptop.specs.display.brightness / 500) * 40;
  const hzScore = (laptop.specs.display.refreshRate / 120) * 30;
  const resScore = laptop.specs.display.resolution.includes('3840') || laptop.specs.display.resolution.includes('4K') ? 30 : 20;
  const display = Math.min(100, Math.round(brightnessScore + hzScore + resScore));

  const portability = Math.min(100, Math.round(100 - (laptop.specs.weight * 25)));
  const battery = Math.min(100, Math.round((laptop.specs.battery.capacity / 100) * 100));
  const overall = Math.round((performance + display + portability + battery) / 4);

  return { performance, display, portability, battery, overall };
};

async function scrapeLaptopList() {
  console.log('Fetching laptop list from NanoReview...');
  const url = 'https://nanoreview.net/en/laptop-list';
  try {
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
    });
    const $ = cheerio.load(data);
    const laptops = [];

    // Buscamos los enlaces a los portátiles en la tabla de rankings
    $('table tr').slice(1, 101).each((i, el) => {
      const name = $(el).find('td a').first().text().trim();
      const href = $(el).find('td a').first().attr('href');
      if (name && href) {
        laptops.push({ name, url: `https://nanoreview.net${href}` });
      }
    });

    return laptops;
  } catch (err) {
    console.error('Error fetching list:', err.message);
    return [];
  }
}

async function scrapeLaptopDetails(laptopUrl) {
  try {
    const { data } = await axios.get(laptopUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
    });
    const $ = cheerio.load(data);

    // Extracción de imagen real
    const imageUrl = $('.cell-image img').attr('src') || $('.laptop-image-container img').attr('src');
    const fullImageUrl = imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `https://nanoreview.net${imageUrl}`) : '';

    const getSpec = (label) => {
      return $(`.spec-table tr:contains("${label}") td:last-child`).text().trim();
    };

    // Mapeo manual de campos clave
    const cpuName = getSpec('Processor') || getSpec('CPU');
    const cores = parseInt(getSpec('Cores')) || 8;
    const ramSize = parseInt(getSpec('Total RAM')) || 16;
    const brightness = parseInt(getSpec('Max brightness')) || 400;
    const res = getSpec('Resolution') || '1920 x 1080';
    const weight = parseFloat(getSpec('Weight').replace('kg', '')) || 1.5;
    const batteryWh = parseFloat(getSpec('Battery capacity').replace('Wh', '')) || 60;

    const brand = laptopUrl.split('/').pop().split('-')[0];

    const specs = {
      cpu: { name: cpuName, cores: cores, threads: cores, baseClock: '2.0GHz', boostClock: '4.0GHz' },
      gpu: { name: getSpec('Graphics') || 'Integrated', type: getSpec('Graphics').includes('RTX') ? 'Dedicated' : 'Integrated' },
      ram: { size: ramSize, type: 'LPDDR5X', speed: '6400MHz' },
      storage: { size: 512, type: 'SSD' },
      display: { 
        size: parseFloat(getSpec('Size')) || 14, 
        resolution: res, 
        panelType: getSpec('Panel type') || 'IPS', 
        refreshRate: parseInt(getSpec('Refresh rate')) || 60, 
        brightness: brightness, 
        colorGamut: '100% sRGB' 
      },
      battery: { capacity: batteryWh, estimatedLife: '10h' },
      ports: ['USB-C', 'USB-A', 'HDMI'],
      weight: weight
    };

    const laptopData = {
      id: Math.floor(Math.random() * 1000000),
      name: $('h1').text().trim(),
      brand: brand.charAt(0).toUpperCase() + brand.slice(1),
      price: 1200, // Estimación por defecto si no se encuentra
      priceEUR: 1100,
      amazonUrl: `https://www.amazon.es/s?k=${encodeURIComponent($('h1').text().trim())}`,
      image: fullImageUrl,
      category: weight < 1.6 ? 'Ultrabook' : 'Gaming',
      specs: specs
    };

    laptopData.scores = calculateScores(laptopData);
    return laptopData;

  } catch (err) {
    console.warn(`Could not fetch details for ${laptopUrl}: ${err.message}`);
    return null;
  }
}

async function run() {
  const list = await scrapeLaptopList();
  console.log(`Found ${list.length} laptops. Starting extraction...`);
  
  const results = [];
  for (let i = 0; i < list.length; i++) {
    console.log(`[${i+1}/${list.length}] Scraping ${list[i].name}...`);
    const details = await scrapeLaptopDetails(list[i].url);
    if (details) {
      results.push(details);
    }
    // Pequeño delay para no saturar el servidor
    await new Promise(r => setTimeout(r, 500));
  }

  const outputPath = path.join(__dirname, '../public/data/laptops.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`Success! ${results.length} laptops saved to ${outputPath}`);
}

run();
