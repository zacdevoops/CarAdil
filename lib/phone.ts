export function isValidMoroccanPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("212")) return /^212[5-7]\d{8}$/.test(digits);
  if (digits.startsWith("0")) return /^0[5-7]\d{8}$/.test(digits);
  return /^[5-7]\d{8}$/.test(digits);
}

export function todayISODate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}
