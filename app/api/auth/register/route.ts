import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getMemberByEmail, saveMember } from "@/lib/db";
import { syncToCrm } from "@/lib/crm";
import { createSession, setSessionCookie } from "@/lib/session";
import { isComplimentaryCode } from "@/lib/stripe";
import { laneFromMembership, toSafeMember, MembershipType } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName, email, phone, city, state, country, membershipType,
      churchName, howDidYouHear, password, termsAccepted, covenantAccepted,
      partnerName, partnerEmail, relationshipStage,
      householdName, numberOfAdults, numberOfChildren,
      accessCode,
    } = body;

    if (!fullName || !email || !phone || !city || !state || !country || !membershipType || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!termsAccepted || !covenantAccepted) {
      return NextResponse.json({ error: "You must accept terms and community covenant" }, { status: 400 });
    }

    const existing = await getMemberByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const complimentary = accessCode ? isComplimentaryCode(accessCode) : false;
    if (accessCode && !complimentary) {
      return NextResponse.json({ error: "Invalid access code" }, { status: 400 });
    }

    const lane = laneFromMembership(membershipType as MembershipType);
    const now = new Date().toISOString();
    const member = {
      id: crypto.randomUUID(),
      email: email.toLowerCase().trim(),
      passwordHash: await bcrypt.hash(password, 10),
      fullName,
      phone,
      city,
      state,
      country,
      membershipType: membershipType as MembershipType,
      lane,
      role: lane,
      churchName: churchName || undefined,
      howDidYouHear: howDidYouHear || undefined,
      partnerName: partnerName || undefined,
      partnerEmail: partnerEmail || undefined,
      relationshipStage: relationshipStage || undefined,
      householdName: householdName || undefined,
      numberOfAdults: numberOfAdults ? Number(numberOfAdults) : undefined,
      numberOfChildren: numberOfChildren ? Number(numberOfChildren) : undefined,
      termsAccepted: true,
      covenantAccepted: true,
      membershipStatus: complimentary ? ("active" as const) : ("pending_payment" as const),
      subscriptionStatus: complimentary ? ("active" as const) : ("inactive" as const),
      complimentaryAccess: complimentary || undefined,
      crmSynced: false,
      suspended: false,
      createdAt: now,
      updatedAt: now,
    };

    const crmOk = await syncToCrm(member);
    member.crmSynced = crmOk;

    await saveMember(member);

    const token = await createSession(member.id);
    await setSessionCookie(token);

    return NextResponse.json({
      member: toSafeMember(member),
      skipPayment: complimentary,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Registration failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
