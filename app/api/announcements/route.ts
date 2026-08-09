import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/session";
import { getAnnouncements } from "@/lib/db";

export async function GET() {
  const session = await getSessionMember();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  if (session.membershipStatus !== "active") {
    return NextResponse.json({ error: "Active membership required" }, { status: 403 });
  }

  const announcements = await getAnnouncements();
  const filtered = announcements.filter((a) => a.lane === "all" || a.lane === session.lane);
  return NextResponse.json({ announcements: filtered });
}
