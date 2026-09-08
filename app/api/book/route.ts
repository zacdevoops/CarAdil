import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: "La création de demande et l’email admin seront implémentés en Phase 4.",
    },
    { status: 501 },
  );
}
