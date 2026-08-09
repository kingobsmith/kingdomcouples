import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SafeMember, toSafeMember } from "./types";
import { getMemberById } from "./db";

const COOKIE = "kf_session";
const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET || "dev-secret-change-me");

export async function createSession(memberId: string): Promise<string> {
  return new SignJWT({ sub: memberId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(SECRET);
}

export async function setSessionCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getSessionMember(): Promise<SafeMember | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    const id = payload.sub as string;
    const member = await getMemberById(id);
    if (!member || member.suspended) return null;
    return toSafeMember(member);
  } catch {
    return null;
  }
}
