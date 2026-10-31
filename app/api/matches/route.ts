import { NextRequest, NextResponse } from "next/server";
import { getFacilityMatches } from "@/server/hockey";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date") ?? new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  const facilityId = req.nextUrl.searchParams.get("facilityId") ?? process.env.FACILITY_ID ?? "141";
  if (!/^[1-9]\d{0,9}$/.test(facilityId)) return NextResponse.json({ error: "Invalid facility ID" }, { status: 400 });
  try {
    return NextResponse.json(await getFacilityMatches(date, facilityId), { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("Facility matches request failed", e);
    return NextResponse.json({ error: "Could not load matches" }, { status: 502 });
  }
}
