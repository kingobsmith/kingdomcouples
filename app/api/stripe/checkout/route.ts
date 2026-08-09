import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/session";
import { getMemberById, saveMember } from "@/lib/db";
import { stripe, getPriceId, membershipMetadata, getTrialDays } from "@/lib/stripe";
import { getPaymentLink, paymentLinkWithEmail } from "@/lib/payment-links";

export async function POST() {
  const session = await getSessionMember();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const member = await getMemberById(session.id);
  if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });

  if (member.complimentaryAccess) {
    return NextResponse.json({ url: `${process.env.NEXT_PUBLIC_APP_URL || ""}/dashboard/${member.lane}` });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const priceId = getPriceId();
  const trialDays = getTrialDays();

  if (priceId && stripe) {
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
      allow_promotion_codes: true,
      success_url: `${appUrl}/dashboard/${member.lane}?payment=success`,
      cancel_url: `${appUrl}/join?lane=${member.lane}&payment=canceled`,
      metadata: {
        member_id: member.id,
        ...membershipMetadata(member.membershipType),
      },
      subscription_data: {
        trial_period_days: trialDays,
        metadata: {
          member_id: member.id,
          ...membershipMetadata(member.membershipType),
        },
      },
    });

    return NextResponse.json({ url: checkoutSession.url, trialDays });
  }

  const paymentLink = getPaymentLink(member.lane);
  if (paymentLink) {
    return NextResponse.json({ url: paymentLinkWithEmail(paymentLink, member.email) });
  }

  return NextResponse.json({ error: "Stripe not configured. Add STRIPE_PRICE_ID and STRIPE_SECRET_KEY in Vercel." }, { status: 500 });
}
