import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getMemberByEmail } from "@/lib/db";
import { createSession, setSessionCookie } from "@/lib/session";
import { toSafeMember } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const member = await getMemberByEmail(email);
    if (!member || !(await bcrypt.compare(password, member.passwordHash))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    if (member.suspended) {
      return NextResponse.json({ error: "Account suspended" }, { status: 403 });
    }

    const token = await createSession(member.id);
    await setSessionCookie(token);

    return NextResponse.json({ member: toSafeMember(member) });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
