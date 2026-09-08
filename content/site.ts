export const PLACEHOLDER = {
  phone: "+212 6 00 00 00 00",
  whatsapp: "212600000000",
  email: "contact@driveflow.ma",
  url: "http://localhost:3000",
} as const;

function publicEnv(name: "NEXT_PUBLIC_SITE_URL" | "NEXT_PUBLIC_WHATSAPP_NUMBER") {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : undefined;
}

export const siteConfig = {
  name: "DriveFlow",
  tagline: "Location de voitures au Maroc",
  description:
    "Choisissez une voiture, indiquez vos dates et lieux, l’agence vous contacte pour confirmer la réservation.",
  url: publicEnv("NEXT_PUBLIC_SITE_URL") ?? PLACEHOLDER.url,
  locale: "fr_MA",
  language: "fr",
  currency: "MAD" as const,
  phone: PLACEHOLDER.phone,
  email: PLACEHOLDER.email,
  whatsappNumber: publicEnv("NEXT_PUBLIC_WHATSAPP_NUMBER") ?? PLACEHOLDER.whatsapp,
  address: {
    country: "Maroc",
    region: "Maroc",
  },
  social: {
    instagram: undefined as string | undefined,
    facebook: undefined as string | undefined,
  },
  contact: {
    hours: "Tous les jours, 8h — 22h",
  },
} as const;

export type SiteConfig = typeof siteConfig;
