import { NextRequest, NextResponse } from "next/server";
import { getSessionMember } from "@/lib/session";
import { getEvents } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getSessionMember();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  if (session.membershipStatus !== "active") {
    return NextResponse.json({ error: "Active membership required" }, { status: 403 });
  }

  const lane = req.nextUrl.searchParams.get("lane");
  const events = await getEvents();
  const filtered = events.filter((e) => e.lane === "all" || e.lane === lane || e.lane === session.lane);
  return NextResponse.json({ events: filtered });
}
