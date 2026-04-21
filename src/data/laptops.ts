export interface Laptop {
  id: number;
  name: string;
  brand: string;
  price: number;
  cpu: string;
  ram: string;
  storage: string;
  display: string;
  weight: string;
  image: string;
}

export const laptops: Laptop[] = [
  {
    id: 1,
    name: "MacBook Air M3",
    brand: "Apple",
    price: 1299,
    cpu: "Apple M3 (8-core)",
    ram: "16GB LPDDR5X",
    storage: "512GB SSD",
    display: "13.6\" Liquid Retina (2560x1664)",
    weight: "1.24 kg",
    image: "https://images.unsplash.com/photo-1611186871348-b1ec696e52c9?w=400&q=80"
  },
  {
    id: 2,
    name: "Dell XPS 13 (2024)",
    brand: "Dell",
    price: 1149,
    cpu: "Intel Core Ultra 7 155H",
    ram: "16GB LPDDR5X",
    storage: "1TB SSD",
    display: "13.4\" FHD+ (1920x1200) Touch",
    weight: "1.19 kg",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80"
  },
  {
    id: 3,
    name: "ThinkPad X1 Carbon Gen 12",
    brand: "Lenovo",
    price: 1599,
    cpu: "Intel Core Ultra 5 125H",
    ram: "32GB LPDDR5X",
    storage: "512GB SSD",
    display: "14.0\" 2.8K (2880x1800) OLED",
    weight: "1.09 kg",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80"
  },
  {
    id: 4,
    name: "ROG Zephyrus G14",
    brand: "ASUS",
    price: 1499,
    cpu: "AMD Ryzen 9 8945HS",
    ram: "16GB LPDDR5X",
    storage: "1TB SSD",
    display: "14.0\" 3K (2880x1800) 120Hz OLED",
    weight: "1.50 kg",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80"
  },
  {
    id: 5,
    name: "Surface Laptop 7",
    brand: "Microsoft",
    price: 999,
    cpu: "Snapdragon X Plus (10-core)",
    ram: "16GB LPDDR5X",
    storage: "256GB SSD",
    display: "13.8\" PixelSense (2304x1536) 120Hz",
    weight: "1.34 kg",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80"
  }
];
