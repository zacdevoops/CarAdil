import { siteConfig } from "@/content/site";

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: {
      "@type": "Country",
      name: siteConfig.address.country,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
    },
    currenciesAccepted: siteConfig.currency,
  };
}
