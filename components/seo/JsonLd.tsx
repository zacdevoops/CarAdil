import { getLocalBusinessJsonLd } from "@/lib/seo";

export function JsonLd() {
  const data = getLocalBusinessJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
