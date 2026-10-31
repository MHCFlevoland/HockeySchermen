import { NextResponse } from "next/server";
import { getFacilities } from "@/server/hockey";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const payload = await getFacilities();
    return NextResponse.json(payload, { headers: { "Cache-Control": "private, max-age=300" } });
  } catch (error) {
    console.error("Facilities request failed", error);
    return NextResponse.json({ error: "Could not load facilities" }, { status: 502 });
  }
}
