export type CategoryId =
  | "audio"
  | "wearables"
  | "footwear"
  | "apparel"
  | "accessories"
  | "home";

export type Category = {
  id: CategoryId;
  name: string;
  tagline: string;
  image: string;
  hue: string;
};

export type ProductColor = { name: string; hex: string };

export type Review = {
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductColor[];
  sizes?: string[];
  badge?: "New" | "Bestseller" | "Limited" | "Sale";
  description: string;
  features: string[];
  stock: number;
  featured?: boolean;
  createdAt: string;
};

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories: Category[] = [
  {
    id: "audio",
    name: "Audio",
    tagline: "Sound, sculpted.",
    image: img("1505740420928-5e560c06d30e"),
    hue: "from-violet-500/40 to-fuchsia-500/30",
  },
  {
    id: "wearables",
    name: "Wearables",
    tagline: "Time, reimagined.",
    image: img("1523275335684-37898b6baf30"),
    hue: "from-amber-400/40 to-rose-500/30",
  },
  {
    id: "footwear",
    name: "Footwear",
    tagline: "Every step, elevated.",
    image: img("1542291026-7eec264c27ff"),
    hue: "from-rose-500/40 to-orange-400/30",
  },
  {
    id: "apparel",
    name: "Apparel",
    tagline: "Essentials, perfected.",
    image: img("1521572163474-6864f9cf17ab"),
    hue: "from-sky-400/40 to-indigo-500/30",
  },
  {
    id: "accessories",
    name: "Accessories",
    tagline: "Details that define.",
    image: img("1572635196237-14b3f281503f"),
    hue: "from-emerald-400/40 to-teal-500/30",
  },
  {
    id: "home",
    name: "Home",
    tagline: "Spaces with soul.",
    image: img("1555041469-a586c61ea9bc"),
    hue: "from-lime-400/40 to-cyan-500/30",
  },
];

const neutral: ProductColor[] = [
  { name: "Midnight", hex: "#111827" },
  { name: "Chalk", hex: "#f5f5f4" },
];

export const products: Product[] = [
  {
    id: "p01",
    slug: "aurora-anc-headphones",
    name: "Aurora ANC Headphones",
    brand: "Sonique",
    category: "audio",
    price: 349,
    compareAt: 429,
    rating: 4.8,
    reviewCount: 1284,
    images: [
      img("1505740420928-5e560c06d30e"),
      img("1583394838336-acd977736f90"),
      img("1484704849700-f032a568e944"),
    ],
    colors: [
      { name: "Graphite", hex: "#27272a" },
      { name: "Sand", hex: "#d6c7a1" },
      { name: "Glacier", hex: "#bfdbfe" },
    ],
    badge: "Bestseller",
    description:
      "Adaptive noise cancellation tuned by machine learning, 40-hour battery life and spatial audio that follows your head. Engineered with memory-foam cushions wrapped in vegan leather for all-day comfort.",
    features: [
      "Adaptive hybrid ANC with 8 microphones",
      "40h battery · 10 min charge = 5h playback",
      "Lossless audio over USB-C",
      "Multipoint Bluetooth 5.4",
    ],
    stock: 42,
    featured: true,
    createdAt: "2026-09-12",
  },
  {
    id: "p02",
    slug: "pulse-wireless-earbuds",
    name: "Pulse Wireless Earbuds",
    brand: "Sonique",
    category: "audio",
    price: 179,
    rating: 4.6,
    reviewCount: 862,
    images: [img("1606220588913-b3aacb4d2f46"), img("1590658268037-6bf12165a8df")],
    colors: neutral,
    badge: "New",
    description:
      "Featherweight earbuds with custom 11mm drivers, transparency mode and a pocketable charging case that tops up wirelessly.",
    features: [
      "Active noise cancellation",
      "IPX5 sweat resistant",
      "30h total battery with case",
      "Wireless & MagSafe charging",
    ],
    stock: 120,
    featured: true,
    createdAt: "2026-10-02",
  },
  {
    id: "p03",
    slug: "orbit-smart-speaker",
    name: "Orbit Smart Speaker",
    brand: "Sonique",
    category: "audio",
    price: 229,
    compareAt: 259,
    rating: 4.5,
    reviewCount: 431,
    images: [img("1608043152269-423dbba4e7e1"), img("1545454675-3531b543be5d")],
    colors: [
      { name: "Charcoal", hex: "#3f3f46" },
      { name: "Fog", hex: "#e4e4e7" },
    ],
    description:
      "360° room-filling sound in a sculptural form. Auto-tunes to your space and pairs with a second Orbit for true stereo.",
    features: [
      "360° acoustic design",
      "Room-aware auto EQ",
      "Wi-Fi & Bluetooth streaming",
      "Recycled fabric shell",
    ],
    stock: 18,
    createdAt: "2026-06-21",
  },
  {
    id: "p04",
    slug: "chrono-classic-watch",
    name: "Chrono Classic Watch",
    brand: "Meridian",
    category: "wearables",
    price: 289,
    rating: 4.9,
    reviewCount: 2190,
    images: [img("1523275335684-37898b6baf30"), img("1524592094714-0f0654e20314")],
    colors: [
      { name: "Silver", hex: "#d4d4d8" },
      { name: "Gold", hex: "#d4a373" },
    ],
    badge: "Bestseller",
    description:
      "A minimalist automatic timepiece with sapphire crystal, a 42-hour power reserve and an interchangeable Italian-leather strap.",
    features: [
      "Swiss automatic movement",
      "Sapphire crystal · 50m water resistance",
      "Quick-release straps",
      "2-year international warranty",
    ],
    stock: 25,
    featured: true,
    createdAt: "2026-03-14",
  },
  {
    id: "p05",
    slug: "vital-smartwatch-series-x",
    name: "Vital Smartwatch Series X",
    brand: "Meridian",
    category: "wearables",
    price: 399,
    rating: 4.7,
    reviewCount: 956,
    images: [img("1546868871-7041f2a55e12"), img("1579586337278-3befd40fd17a")],
    colors: [
      { name: "Obsidian", hex: "#18181b" },
      { name: "Starlight", hex: "#f1e9dc" },
      { name: "Ocean", hex: "#1e3a8a" },
    ],
    badge: "New",
    description:
      "Always-on LTPO display, continuous health sensing and up to 4 days of battery. The most capable Vital ever.",
    features: [
      "ECG, SpO₂ & sleep staging",
      "Dual-frequency GPS",
      "4-day battery",
      "Titanium case",
    ],
    stock: 64,
    featured: true,
    createdAt: "2026-10-10",
  },
  {
    id: "p06",
    slug: "nova-runner-sneakers",
    name: "Nova Runner Sneakers",
    brand: "Stride",
    category: "footwear",
    price: 159,
    compareAt: 189,
    rating: 4.7,
    reviewCount: 1530,
    images: [img("1542291026-7eec264c27ff"), img("1608231387042-66d1773070a5")],
    colors: [
      { name: "Crimson", hex: "#dc2626" },
      { name: "Onyx", hex: "#0a0a0a" },
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    badge: "Sale",
    description:
      "Responsive nitrogen-infused foam meets a breathable engineered knit upper. Built for tempo days and everything in between.",
    features: [
      "Nitrogen-infused midsole",
      "Engineered knit upper",
      "Carbon-rubber outsole",
      "8.2 oz (men's 9)",
    ],
    stock: 80,
    featured: true,
    createdAt: "2026-05-02",
  },
  {
    id: "p07",
    slug: "cloud-lux-trainers",
    name: "Cloud Lux Trainers",
    brand: "Stride",
    category: "footwear",
    price: 139,
    rating: 4.6,
    reviewCount: 742,
    images: [img("1600185365483-26d7a4cc7519"), img("1595950653106-6c9ebd614d3a")],
    colors: [
      { name: "Cloud", hex: "#fafafa" },
      { name: "Slate", hex: "#64748b" },
    ],
    sizes: ["6", "7", "8", "9", "10", "11"],
    description:
      "Everyday trainers with a cushioned cloud sole and premium suede overlays. Comfort you can wear from studio to street.",
    features: [
      "Cushioned EVA sole",
      "Suede & mesh upper",
      "Removable OrthoLite insole",
      "Vegan materials",
    ],
    stock: 54,
    createdAt: "2026-07-19",
  },
  {
    id: "p08",
    slug: "heritage-court-sneaker",
    name: "Heritage Court Sneaker",
    brand: "Stride",
    category: "footwear",
    price: 119,
    rating: 4.4,
    reviewCount: 388,
    images: [img("1491553895911-0055eca6402d"), img("1606107557195-0e29a4b5b4aa")],
    colors: [
      { name: "Ivory", hex: "#f5f5dc" },
      { name: "Forest", hex: "#14532d" },
    ],
    sizes: ["7", "8", "9", "10", "11"],
    badge: "Limited",
    description:
      "A 1970s court classic rebuilt with full-grain leather and a cupsole stitched by hand in Portugal.",
    features: [
      "Full-grain leather",
      "Hand-stitched cupsole",
      "Made in Portugal",
      "Limited run of 2,000 pairs",
    ],
    stock: 9,
    createdAt: "2026-08-30",
  },
  {
    id: "p09",
    slug: "essential-organic-tee",
    name: "Essential Organic Tee",
    brand: "Atelier",
    category: "apparel",
    price: 39,
    rating: 4.5,
    reviewCount: 2304,
    images: [img("1521572163474-6864f9cf17ab"), img("1618354691373-d851c5c3a990")],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#0a0a0a" },
      { name: "Sage", hex: "#9caf88" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Heavyweight 240gsm organic cotton tee with a relaxed boxy fit. Garment-dyed for a lived-in feel from day one.",
    features: [
      "240gsm organic cotton",
      "Garment dyed",
      "Pre-shrunk",
      "Fair Trade certified",
    ],
    stock: 300,
    createdAt: "2026-02-11",
  },
  {
    id: "p10",
    slug: "moto-leather-jacket",
    name: "Moto Leather Jacket",
    brand: "Atelier",
    category: "apparel",
    price: 449,
    compareAt: 549,
    rating: 4.8,
    reviewCount: 211,
    images: [img("1551028719-00167b16eac5"), img("1520975954732-35dd22299614")],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Cognac", hex: "#9a3412" },
    ],
    sizes: ["S", "M", "L", "XL"],
    badge: "Sale",
    description:
      "Supple lambskin leather, quilted shoulders and YKK hardware. A forever piece that only gets better with age.",
    features: [
      "Full-grain lambskin",
      "Quilted satin lining",
      "YKK Excella zips",
      "Lifetime repairs",
    ],
    stock: 12,
    featured: true,
    createdAt: "2026-01-25",
  },
  {
    id: "p11",
    slug: "merino-crew-sweater",
    name: "Merino Crew Sweater",
    brand: "Atelier",
    category: "apparel",
    price: 129,
    rating: 4.6,
    reviewCount: 517,
    images: [img("1576566588028-4147f3842f27"), img("1434389677669-e08b4cac3105")],
    colors: [
      { name: "Oat", hex: "#e7dcc8" },
      { name: "Navy", hex: "#1e293b" },
      { name: "Rust", hex: "#b45309" },
    ],
    sizes: ["S", "M", "L", "XL"],
    badge: "New",
    description:
      "Ultra-fine 17.5 micron merino knitted seamlessly in 3D. Temperature-regulating, itch-free and machine washable.",
    features: [
      "Seamless 3D knit",
      "17.5μm extra-fine merino",
      "Machine washable",
      "Responsibly sourced wool",
    ],
    stock: 70,
    createdAt: "2026-10-05",
  },
  {
    id: "p12",
    slug: "aviator-polarized-sunglasses",
    name: "Aviator Polarized Sunglasses",
    brand: "Lumen",
    category: "accessories",
    price: 189,
    rating: 4.7,
    reviewCount: 640,
    images: [img("1572635196237-14b3f281503f"), img("1511499767150-a48a237f0083")],
    colors: [
      { name: "Gold / Green", hex: "#a16207" },
      { name: "Gunmetal", hex: "#52525b" },
    ],
    badge: "Bestseller",
    description:
      "Hand-polished titanium frames with polarized mineral glass lenses. Featherlight, unbreakable, timeless.",
    features: [
      "Beta-titanium frame",
      "Polarized mineral glass",
      "100% UV400 protection",
      "Includes leather case",
    ],
    stock: 33,
    featured: true,
    createdAt: "2026-04-08",
  },
  {
    id: "p13",
    slug: "voyager-canvas-backpack",
    name: "Voyager Canvas Backpack",
    brand: "Lumen",
    category: "accessories",
    price: 149,
    rating: 4.6,
    reviewCount: 905,
    images: [img("1553062407-98eeb64c6a62"), img("1622560480605-d83c853bc5c3")],
    colors: [
      { name: "Olive", hex: "#4d5a2c" },
      { name: "Charcoal", hex: "#27272a" },
    ],
    description:
      "Waxed canvas body, leather trims and a padded 16\" laptop sleeve. Water-resistant and built to carry a decade of adventures.",
    features: [
      "Waxed cotton canvas",
      "16\" padded laptop sleeve",
      "Hidden passport pocket",
      "Lifetime warranty",
    ],
    stock: 47,
    createdAt: "2026-03-30",
  },
  {
    id: "p14",
    slug: "atelier-leather-tote",
    name: "Atelier Leather Tote",
    brand: "Lumen",
    category: "accessories",
    price: 259,
    compareAt: 299,
    rating: 4.8,
    reviewCount: 322,
    images: [img("1584917865442-de89df76afd3"), img("1548036328-c9fa89d128fa")],
    colors: [
      { name: "Tan", hex: "#c08552" },
      { name: "Black", hex: "#0a0a0a" },
    ],
    badge: "Sale",
    description:
      "Vegetable-tanned leather tote with a structured base and magnetic closure. Room for a laptop, a day and then some.",
    features: [
      "Vegetable-tanned leather",
      "Fits 14\" laptop",
      "Interior zip pocket",
      "Hand-finished edges",
    ],
    stock: 21,
    createdAt: "2026-02-27",
  },
  {
    id: "p15",
    slug: "halo-mechanical-keyboard",
    name: "Halo Mechanical Keyboard",
    brand: "Keystone",
    category: "accessories",
    price: 199,
    rating: 4.9,
    reviewCount: 1102,
    images: [img("1587829741301-dc798b83add3"), img("1595225476474-87563907a212")],
    colors: [
      { name: "Frost", hex: "#e5e7eb" },
      { name: "Carbon", hex: "#1f2937" },
    ],
    badge: "New",
    description:
      "Gasket-mounted aluminum keyboard with hot-swappable switches, per-key RGB and tri-mode connectivity.",
    features: [
      "CNC aluminum case",
      "Hot-swap linear switches",
      "Bluetooth · 2.4GHz · USB-C",
      "PBT double-shot keycaps",
    ],
    stock: 58,
    featured: true,
    createdAt: "2026-10-18",
  },
  {
    id: "p16",
    slug: "lune-lounge-chair",
    name: "Lune Lounge Chair",
    brand: "Habitat",
    category: "home",
    price: 899,
    compareAt: 1049,
    rating: 4.9,
    reviewCount: 148,
    images: [img("1567538096630-e0c55bd6374c"), img("1503602642458-232111445657")],
    colors: [
      { name: "Bouclé", hex: "#ece6da" },
      { name: "Moss", hex: "#4b5d3a" },
    ],
    badge: "Limited",
    description:
      "A sculptural lounge chair in plush bouclé on a solid oak base. Designed in Copenhagen, made to be lived in.",
    features: [
      "Solid FSC oak frame",
      "Italian bouclé upholstery",
      "High-resilience foam",
      "Free white-glove delivery",
    ],
    stock: 6,
    featured: true,
    createdAt: "2026-09-01",
  },
  {
    id: "p17",
    slug: "arc-table-lamp",
    name: "Arc Table Lamp",
    brand: "Habitat",
    category: "home",
    price: 159,
    rating: 4.6,
    reviewCount: 274,
    images: [img("1507473885765-e6ed057f782c"), img("1513506003901-1e6a229e2d15")],
    colors: [
      { name: "Opal", hex: "#f8fafc" },
      { name: "Brass", hex: "#b08d57" },
    ],
    description:
      "Hand-blown opal glass on a brushed brass arc. Dimmable warm light that makes every room feel like golden hour.",
    features: [
      "Hand-blown opal glass",
      "Stepless touch dimmer",
      "2700K warm LED included",
      "Brushed brass finish",
    ],
    stock: 39,
    createdAt: "2026-06-06",
  },
  {
    id: "p18",
    slug: "cloud-sofa-three-seater",
    name: "Cloud Sofa — 3 Seater",
    brand: "Habitat",
    category: "home",
    price: 1890,
    rating: 4.8,
    reviewCount: 96,
    images: [img("1555041469-a586c61ea9bc"), img("1493663284031-b7e3aefcae8e")],
    colors: [
      { name: "Fog", hex: "#d1d5db" },
      { name: "Clay", hex: "#c2410c" },
    ],
    badge: "New",
    description:
      "Deep, down-wrapped cushions and modular design. Reconfigure it in seconds, fall into it for hours.",
    features: [
      "Modular sections",
      "Feather & down wrapped",
      "Performance fabric",
      "10-year frame warranty",
    ],
    stock: 4,
    createdAt: "2026-10-20",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}

export function getRelated(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.category !== product.category && p.featured))
    .slice(0, limit);
}

export const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

export const reviews: Review[] = [
  {
    author: "Maya R.",
    rating: 5,
    title: "Better than I imagined",
    body: "The build quality is immediately obvious. Packaging felt like opening a gift and delivery was two days early.",
    date: "2026-10-12",
  },
  {
    author: "Jonas K.",
    rating: 5,
    title: "Instant favourite",
    body: "I've been using it daily for a month. Details are thoughtful everywhere — this is how products should be made.",
    date: "2026-09-28",
  },
  {
    author: "Priya S.",
    rating: 4,
    title: "Beautiful, small nitpick",
    body: "Gorgeous design and excellent performance. Would love one more colour option, but otherwise flawless.",
    date: "2026-09-03",
  },
];
