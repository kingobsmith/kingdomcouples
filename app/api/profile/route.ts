import { NextRequest, NextResponse } from "next/server";
import { getSessionMember } from "@/lib/session";
import { getMemberById, saveMember } from "@/lib/db";
import { toSafeMember } from "@/lib/types";

export async function PATCH(req: NextRequest) {
  const session = await getSessionMember();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const member = await getMemberById(session.id);
  if (!member) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const allowed = [
    "fullName", "phone", "city", "state", "country", "churchName",
    "partnerName", "partnerEmail", "relationshipStage",
    "householdName", "numberOfAdults", "numberOfChildren",
  ];
  for (const key of allowed) {
    if (body[key] !== undefined) {
      (member as unknown as Record<string, unknown>)[key] = body[key];
    }
  }
  member.updatedAt = new Date().toISOString();
  await saveMember(member);
  return NextResponse.json({ member: toSafeMember(member) });
}
