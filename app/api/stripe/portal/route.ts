import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/session";
import { getMemberById } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const session = await getSessionMember();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const member = await getMemberById(session.id);
  if (!member?.stripeCustomerId || !stripe) {
    return NextResponse.json({ error: "No billing account found" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const portal = await stripe.billingPortal.sessions.create({
    customer: member.stripeCustomerId,
    return_url: `${appUrl}/dashboard/${member.lane}`,
  });

  return NextResponse.json({ url: portal.url });
}
