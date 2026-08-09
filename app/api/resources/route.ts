import { NextRequest, NextResponse } from "next/server";
import { getSessionMember } from "@/lib/session";
import { getResources } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getSessionMember();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  if (session.membershipStatus !== "active") {
    return NextResponse.json({ error: "Active membership required" }, { status: 403 });
  }

  const lane = req.nextUrl.searchParams.get("lane") || session.lane;
  const resources = await getResources();
  const filtered = resources.filter((r) => r.lane === "all" || r.lane === lane);
  return NextResponse.json({ resources: filtered });
}
