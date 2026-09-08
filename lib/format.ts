const madFormatter = new Intl.NumberFormat("fr-MA", {
  style: "currency",
  currency: "MAD",
  maximumFractionDigits: 0,
});

export function formatMAD(amount: number) {
  return madFormatter.format(amount);
}

export function formatCarName(brand: string, model: string) {
  return `${brand} ${model}`;
}

export function formatISODateFr(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-MA", { day: "numeric", month: "long", year: "numeric" }).format(date);
}
