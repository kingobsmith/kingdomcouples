import { NextRequest, NextResponse } from "next/server";
import { getSessionMember } from "@/lib/session";
import { getMemberById, saveMember } from "@/lib/db";
import { stripe, getPriceId, membershipMetadata } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const session = await getSessionMember();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const member = await getMemberById(session.id);
  if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const priceId = getPriceId();

  if (!priceId || !stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  let customerId = member.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: member.email,
      name: member.fullName,
      metadata: membershipMetadata(member.membershipType),
    });
    customerId = customer.id;
    member.stripeCustomerId = customerId;
    member.updatedAt = new Date().toISOString();
    await saveMember(member);
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/dashboard/${member.lane}?payment=success`,
    cancel_url: `${appUrl}/join?lane=${member.lane}&payment=canceled`,
    metadata: {
      member_id: member.id,
      ...membershipMetadata(member.membershipType),
    },
    subscription_data: {
      metadata: {
        member_id: member.id,
        ...membershipMetadata(member.membershipType),
      },
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
