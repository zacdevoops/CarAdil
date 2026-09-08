export type LocationType = "airport" | "city" | "station" | "port";

export type RentalLocation = {
  id: string;
  city: string;
  name: string;
  type: LocationType;
};

export const rentalLocations: RentalLocation[] = [
  { id: "casablanca-mohammed-v", city: "Casablanca", name: "Aéroport Mohammed V", type: "airport" },
  { id: "marrakech-menara", city: "Marrakech", name: "Aéroport Marrakech Ménara", type: "airport" },
  { id: "rabat-sale", city: "Rabat", name: "Aéroport Rabat-Salé", type: "airport" },
  { id: "fes-saiss", city: "Fès", name: "Aéroport Fès-Saïss", type: "airport" },
  { id: "tanger-ibn-battouta", city: "Tanger", name: "Aéroport Tanger Ibn Battouta", type: "airport" },
  { id: "casablanca-centre", city: "Casablanca", name: "Casablanca Centre", type: "city" },
  { id: "rabat-agdal", city: "Rabat", name: "Rabat Agdal", type: "city" },
  { id: "marrakech-gueliz", city: "Marrakech", name: "Marrakech Guéliz", type: "city" },
  { id: "fes-centre", city: "Fès", name: "Fès Centre", type: "city" },
  { id: "tanger-centre", city: "Tanger", name: "Tanger Centre", type: "city" },
  { id: "agadir-centre", city: "Agadir", name: "Agadir Centre", type: "city" },
  { id: "meknes-centre", city: "Meknès", name: "Meknès Centre", type: "city" },
  { id: "oujda-centre", city: "Oujda", name: "Oujda Centre", type: "city" },
  { id: "tetouan-centre", city: "Tétouan", name: "Tétouan Centre", type: "city" },
  { id: "casablanca-port", city: "Casablanca", name: "Port de Casablanca", type: "port" },
  { id: "tanger-med", city: "Tanger", name: "Port Tanger Med", type: "port" },
  { id: "tanger-ville-port", city: "Tanger", name: "Port Tanger Ville", type: "port" },
  { id: "agadir-port", city: "Agadir", name: "Port d’Agadir", type: "port" },
  { id: "nador-beni-ensar", city: "Nador", name: "Port Nador Beni Ensar", type: "port" },
  { id: "safi-port", city: "Safi", name: "Port de Safi", type: "port" },
];

export function getLocationById(id: string) {
  return rentalLocations.find((location) => location.id === id);
}

export function getServiceAreaCities() {
  return [...new Set(rentalLocations.map((location) => location.city))];
}

export const featuredLocationIds = [
  "casablanca-mohammed-v",
  "casablanca-centre",
  "marrakech-menara",
  "marrakech-gueliz",
  "rabat-sale",
  "tanger-ibn-battouta",
] as const;

export function getFeaturedLocations() {
  return featuredLocationIds
    .map((id) => getLocationById(id))
    .filter((location): location is RentalLocation => Boolean(location));
}
