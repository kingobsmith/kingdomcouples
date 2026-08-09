import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getMemberByEmail, saveMember } from "@/lib/db";

export async function GET() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    return NextResponse.json({ seeded: false, reason: "ADMIN_EMAIL or ADMIN_PASSWORD not set" });
  }

  const existing = await getMemberByEmail(email);
  if (existing) {
    return NextResponse.json({ seeded: false, reason: "Admin already exists" });
  }

  const now = new Date().toISOString();
  await saveMember({
    id: "admin-001",
    email: email.toLowerCase(),
    passwordHash: await bcrypt.hash(password, 10),
    fullName: "Kingdom Folk Admin",
    phone: "",
    city: "",
    state: "",
    country: "",
    membershipType: "family",
    lane: "family",
    role: "admin",
    termsAccepted: true,
    covenantAccepted: true,
    membershipStatus: "active",
    subscriptionStatus: "active",
    crmSynced: false,
    suspended: false,
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({ seeded: true });
}
