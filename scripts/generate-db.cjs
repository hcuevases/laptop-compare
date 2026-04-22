const fs = require('fs');
const path = require('path');

const calculateScores = (laptop) => {
  const cpuScore = (laptop.specs.cpu.cores * 5) + (laptop.specs.gpu.type === 'Dedicated' ? 30 : 10);
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

// Colección mucho más amplia de IDs de Unsplash para mayor variedad
const imagePool = {
    apple: [
        "1517336714460-4c9889a10af5", "1611186871348-b1ec696e52c9", "1541807084-5c52b6b3adef",
        "1496181133206-80ce9b88a853", "1525547719571-a2d4ac8945e2", "1499951360447-b19be8fe80f5",
        "1504707748692-419802cf939d", "1453019081464-3f82394ee10a"
    ],
    gaming: [
        "1603302576837-37561b2e2302", "1592434134753-a70baf7979d7", "1541807084-5c52b6b3adef",
        "1587614382356-0cf244881732", "1618424181497-157f2396ef18", "1628712211107-713a6c4d3918",
        "1674663170035-5308406b73c7", "1530434035934-6a285f4e4f68"
    ],
    silver: [
        "1593642632823-8f785ba67e45", "1516387938699-a93567ec168e", "1499951360447-b19be8fe80f5",
        "1588872657578-7efd1f1555ed", "1453019081464-3f82394ee10a", "1531297484001-80022131f5a1",
        "1504707748692-419802cf939d", "1488590527310-733d2997e7a1", "1534358076194-9400b334b3c2"
    ],
    business: [
        "1588872657578-7efd1f1555ed", "1488590527310-733d2997e7a1", "1504707748692-419802cf939d",
        "1531297484001-80022131f5a1", "1525547719571-a2d4ac8945e2", "1453019081464-3f82394ee10a",
        "1534358076194-9400b334b3c2", "1531297484001-80022131f5a1"
    ]
};

const laptopTemplates = [
    { brand: "Apple", name: "MacBook Pro 14 (M4 Pro)", price: 1999, cpu: "Apple M4 Pro", cores: 14, gpu: "20-core GPU", gpuType: "Integrated", weight: 1.6, battery: 72, imgCategory: "apple" },
    { brand: "Apple", name: "MacBook Air 13 (M3)", price: 1099, cpu: "Apple M3", cores: 8, gpu: "10-core GPU", gpuType: "Integrated", weight: 1.24, battery: 52, imgCategory: "apple" },
    { brand: "Dell", name: "XPS 13 (2024)", price: 1299, cpu: "Intel Core Ultra 7 155H", cores: 16, gpu: "Intel Arc", gpuType: "Integrated", weight: 1.19, battery: 55, imgCategory: "silver" },
    { brand: "ASUS", name: "ROG Zephyrus G14", price: 1599, cpu: "AMD Ryzen 9 8945HS", cores: 8, gpu: "RTX 4060", gpuType: "Dedicated", weight: 1.5, battery: 73, imgCategory: "gaming" },
    { brand: "Lenovo", name: "ThinkPad X1 Carbon G12", price: 1799, cpu: "Intel Core Ultra 7 155H", cores: 16, gpu: "Intel Arc", gpuType: "Integrated", weight: 1.09, battery: 57, imgCategory: "business" },
    { brand: "HP", name: "Victus 16", price: 899, cpu: "AMD Ryzen 7 7840HS", cores: 8, gpu: "RTX 4050", gpuType: "Dedicated", weight: 2.3, battery: 70, imgCategory: "gaming" },
    { brand: "MSI", name: "Raider 18 HX", price: 3999, cpu: "Intel Core i9-14900HX", cores: 24, gpu: "RTX 4090", gpuType: "Dedicated", weight: 3.6, battery: 99, imgCategory: "gaming" },
    { brand: "Acer", name: "Swift Go 14", price: 799, cpu: "Intel Core Ultra 5 125H", cores: 14, gpu: "Intel Arc", gpuType: "Integrated", weight: 1.3, battery: 65, imgCategory: "silver" },
    { brand: "Microsoft", name: "Surface Laptop 7", price: 999, cpu: "Snapdragon X Plus", cores: 10, gpu: "Adreno", gpuType: "Integrated", weight: 1.34, battery: 54, imgCategory: "silver" },
    { brand: "Samsung", name: "Galaxy Book4 Ultra", price: 2399, cpu: "Intel Core i9-13900H", cores: 14, gpu: "RTX 4070", gpuType: "Dedicated", weight: 1.86, battery: 76, imgCategory: "silver" }
];

const generateDatabase = () => {
    const laptops = [];
    let idCounter = 1;

    for (let i = 0; i < 11; i++) {
        laptopTemplates.forEach((template, idx) => {
            const variant = i > 0 ? ` (Model ${2024 + i})` : "";
            
            // Selección rotativa de imágenes de la colección específica para asegurar variedad
            const pool = imagePool[template.imgCategory] || imagePool.silver;
            const photoId = pool[(i + idx) % pool.length]; // Usa el índice para rotar fotos dentro del pool
            
            const laptop = {
                id: idCounter++,
                name: template.name + variant,
                brand: template.brand,
                price: template.price + (i * 75),
                priceEUR: Math.round((template.price + (i * 75)) * 0.94),
                amazonUrl: `https://www.amazon.es/s?k=${encodeURIComponent(template.brand + " " + template.name)}`,
                category: template.weight < 1.6 ? "Ultrabook" : "Gaming",
                image: `https://images.unsplash.com/photo-${photoId}?w=600&q=80`, // URL de Unsplash con ID específico
                specs: {
                    cpu: { name: template.cpu, cores: template.cores, threads: template.cores * 2, baseClock: "2.4GHz", boostClock: "5.1GHz" },
                    gpu: { name: template.gpu, type: template.gpuType },
                    ram: { size: i % 2 === 0 ? 16 : 32, type: "LPDDR5X", speed: "7467MHz" },
                    storage: { size: i % 3 === 0 ? 512 : 1024, type: "SSD" },
                    display: { 
                        size: template.name.includes("16") ? 16 : 14, 
                        resolution: i % 2 === 0 ? "2880x1800" : "1920x1200", 
                        panelType: i % 4 === 0 ? "OLED" : "IPS", 
                        refreshRate: template.gpuType === "Dedicated" ? 144 : 60, 
                        brightness: 400 + (i * 15), 
                        colorGamut: "100% sRGB" 
                    },
                    battery: { capacity: template.battery, estimatedLife: "12h" },
                    ports: ["USB-C", "HDMI", "Thunderbolt"],
                    weight: template.weight
                }
            };
            laptop.scores = calculateScores(laptop);
            laptops.push(laptop);
        });
    }
    return laptops;
};

const db = generateDatabase();
fs.writeFileSync(path.join(__dirname, '../public/data/laptops.json'), JSON.stringify(db, null, 2));
console.log(`Mega-database updated with ${db.length} models and unique images from curated pools.`);
