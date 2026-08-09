import { NextRequest, NextResponse } from "next/server";
import { getSessionMember } from "@/lib/session";
import { getReports, saveReports } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getSessionMember();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { targetName, reason, details } = await req.json();
  if (!targetName || !reason || !details) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const reports = await getReports();
  reports.push({
    id: crypto.randomUUID(),
    reporterId: session.id,
    reporterName: session.fullName,
    targetName,
    reason,
    details,
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  await saveReports(reports);
  return NextResponse.json({ ok: true });
}
