export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getWhatsAppUrl(phoneDigits: string, message: string) {
  const digits = phoneDigits.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${encoded}`;
}
