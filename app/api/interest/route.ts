import { NextRequest, NextResponse } from "next/server";
import { getSessionMember } from "@/lib/session";
import { saveInterest } from "@/lib/db";
import { Lane } from "@/lib/types";

export async function POST(req: NextRequest) {
  const session = await getSessionMember();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { type, message } = await req.json();
  if (!type || !message) {
    return NextResponse.json({ error: "Type and message required" }, { status: 400 });
  }

  await saveInterest({
    id: crypto.randomUUID(),
    memberId: session.id,
    memberName: session.fullName,
    lane: session.lane as Lane,
    type,
    message,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
