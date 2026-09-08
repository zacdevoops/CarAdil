export const carCategories = ["economy", "suv", "luxury", "van", "sport"] as const;
export type CarCategory = (typeof carCategories)[number];

export const transmissions = ["automatic", "manual"] as const;
export type Transmission = (typeof transmissions)[number];

export const fuels = ["essence", "diesel", "hybride", "electrique"] as const;
export type Fuel = (typeof fuels)[number];

export type Car = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  pricePerDay: number;
  currency: "MAD";
  transmission: Transmission;
  fuel: Fuel;
  seats: number;
  doors?: number;
  luggage?: number;
  airConditioning?: boolean;
  featured: boolean;
  description: string;
  image: string;
  gallery: string[];
};

const placeholderImage = "/images/cars/placeholder.svg";

function carImage(slug: string): string {
  return `/images/cars/${slug}.jpg`;
}

export const cars: Car[] = [
  {
    id: "dacia-logan",
    slug: "dacia-logan",
    brand: "Dacia",
    model: "Logan",
    year: 2023,
    category: "economy",
    pricePerDay: 250,
    currency: "MAD",
    transmission: "manual",
    fuel: "essence",
    seats: 5,
    doors: 4,
    luggage: 2,
    airConditioning: true,
    featured: true,
    description: "Berline compacte économique, idéale pour la ville et les trajets interurbains.",
    image: carImage("dacia-logan"),
    gallery: [carImage("dacia-logan")],
  },
  {
    id: "dacia-sandero",
    slug: "dacia-sandero",
    brand: "Dacia",
    model: "Sandero",
    year: 2023,
    category: "economy",
    pricePerDay: 220,
    currency: "MAD",
    transmission: "manual",
    fuel: "essence",
    seats: 5,
    doors: 5,
    luggage: 2,
    airConditioning: true,
    featured: false,
    description: "Citadine pratique et sobre, pour un usage quotidien sans surprise.",
    image: carImage("dacia-sandero"),
    gallery: [carImage("dacia-sandero")],
  },
  {
    id: "renault-clio",
    slug: "renault-clio",
    brand: "Renault",
    model: "Clio",
    year: 2024,
    category: "economy",
    pricePerDay: 300,
    currency: "MAD",
    transmission: "automatic",
    fuel: "essence",
    seats: 5,
    doors: 5,
    luggage: 2,
    airConditioning: true,
    featured: true,
    description: "Citadine automatique confortable, à l’aise en ville comme sur autoroute.",
    image: carImage("renault-clio"),
    gallery: [carImage("renault-clio")],
  },
  {
    id: "hyundai-tucson",
    slug: "hyundai-tucson",
    brand: "Hyundai",
    model: "Tucson",
    year: 2024,
    category: "suv",
    pricePerDay: 480,
    currency: "MAD",
    transmission: "automatic",
    fuel: "essence",
    seats: 5,
    doors: 5,
    luggage: 3,
    airConditioning: true,
    featured: true,
    description: "SUV familial spacieux, pour les bagages, les routes nationales et les longs week-ends.",
    image: carImage("hyundai-tucson"),
    gallery: [carImage("hyundai-tucson")],
  },
  {
    id: "kia-sportage",
    slug: "kia-sportage",
    brand: "Kia",
    model: "Sportage",
    year: 2023,
    category: "suv",
    pricePerDay: 450,
    currency: "MAD",
    transmission: "automatic",
    fuel: "diesel",
    seats: 5,
    doors: 5,
    luggage: 3,
    airConditioning: true,
    featured: false,
    description: "SUV diesel automatique, une option sereine pour les longs trajets.",
    image: carImage("kia-sportage"),
    gallery: [carImage("kia-sportage")],
  },
  {
    id: "toyota-rav4",
    slug: "toyota-rav4",
    brand: "Toyota",
    model: "RAV4",
    year: 2024,
    category: "suv",
    pricePerDay: 550,
    currency: "MAD",
    transmission: "automatic",
    fuel: "hybride",
    seats: 5,
    doors: 5,
    luggage: 3,
    airConditioning: true,
    featured: false,
    description: "SUV hybride Toyota, silencieux et à l’aise sur longue distance.",
    image: carImage("toyota-rav4"),
    gallery: [carImage("toyota-rav4")],
  },
  {
    id: "mercedes-classe-c",
    slug: "mercedes-classe-c",
    brand: "Mercedes",
    model: "Classe C",
    year: 2024,
    category: "luxury",
    pricePerDay: 900,
    currency: "MAD",
    transmission: "automatic",
    fuel: "essence",
    seats: 5,
    doors: 4,
    luggage: 2,
    airConditioning: true,
    featured: true,
    description: "Berline premium pour les déplacements d’affaires et les arrivées d’aéroport.",
    image: carImage("mercedes-classe-c"),
    gallery: [carImage("mercedes-classe-c")],
  },
  {
    id: "bmw-serie-5",
    slug: "bmw-serie-5",
    brand: "BMW",
    model: "Série 5",
    year: 2023,
    category: "luxury",
    pricePerDay: 1100,
    currency: "MAD",
    transmission: "automatic",
    fuel: "essence",
    seats: 5,
    doors: 4,
    luggage: 2,
    airConditioning: true,
    featured: false,
    description: "Berline de standing, conduite précise et habitacle soigné.",
    image: carImage("bmw-serie-5"),
    gallery: [carImage("bmw-serie-5")],
  },
  {
    id: "renault-kangoo",
    slug: "renault-kangoo",
    brand: "Renault",
    model: "Kangoo",
    year: 2022,
    category: "van",
    pricePerDay: 600,
    currency: "MAD",
    transmission: "manual",
    fuel: "diesel",
    seats: 5,
    doors: 5,
    luggage: 4,
    airConditioning: true,
    featured: false,
    description: "Ludospace diesel, volume de chargement généreux pour familles et transferts.",
    image: carImage("renault-kangoo"),
    gallery: [carImage("renault-kangoo")],
  },
  {
    id: "ford-mustang",
    slug: "ford-mustang",
    brand: "Ford",
    model: "Mustang GT",
    year: 2023,
    category: "sport",
    pricePerDay: 1200,
    currency: "MAD",
    transmission: "automatic",
    fuel: "essence",
    seats: 4,
    doors: 2,
    luggage: 1,
    airConditioning: true,
    featured: false,
    description: "Coupé sport pour un séjour plus marquant — sur demande, selon disponibilités.",
    image: carImage("ford-mustang"),
    gallery: [carImage("ford-mustang")],
  },
  {
    id: "peugeot-208",
    slug: "peugeot-208",
    brand: "Peugeot",
    model: "208",
    year: 2024,
    category: "economy",
    pricePerDay: 280,
    currency: "MAD",
    transmission: "automatic",
    fuel: "essence",
    seats: 5,
    doors: 5,
    luggage: 2,
    airConditioning: true,
    featured: false,
    description: "Citadine automatique récente, maniable et confortable en centre-ville.",
    image: carImage("peugeot-208"),
    gallery: [carImage("peugeot-208")],
  },
  {
    id: "audi-q5",
    slug: "audi-q5",
    brand: "Audi",
    model: "Q5",
    year: 2024,
    category: "suv",
    pricePerDay: 700,
    currency: "MAD",
    transmission: "automatic",
    fuel: "diesel",
    seats: 5,
    doors: 5,
    luggage: 3,
    airConditioning: true,
    featured: false,
    description: "SUV premium diesel, pour voyager à plusieurs avec du coffre.",
    image: carImage("audi-q5"),
    gallery: [carImage("audi-q5")],
  },
];

export function getCarBySlug(slug: string) {
  return cars.find((car) => car.slug === slug);
}

export function getFeaturedCars() {
  return cars.filter((car) => car.featured);
}

export function getCarDisplayName(car: Pick<Car, "brand" | "model">) {
  return `${car.brand} ${car.model}`;
}

export function getRelatedCars(slug: string, limit = 3) {
  const current = getCarBySlug(slug);
  const pool = cars.filter((car) => car.slug !== slug);
  if (!current) return pool.slice(0, limit);

  const sameCategory = pool.filter((car) => car.category === current.category);
  const rest = pool
    .filter((car) => car.category !== current.category)
    .sort((a, b) => Math.abs(a.pricePerDay - current.pricePerDay) - Math.abs(b.pricePerDay - current.pricePerDay));

  return [...sameCategory, ...rest].slice(0, limit);
}

export function uniqueGallery(car: Car) {
  return [...new Set([car.image, ...car.gallery])];
}

export { placeholderImage as carImageFallback };
