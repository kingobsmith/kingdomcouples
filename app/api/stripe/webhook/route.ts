import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getMemberById, getMemberByEmail, saveMember } from "@/lib/db";
import { syncToCrm } from "@/lib/crm";
import { MEMBERSHIP_PRICE } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret || !stripe) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  async function updateMember(memberId: string, updates: {
    membershipStatus?: "active" | "inactive" | "pending_payment";
    subscriptionStatus?: "active" | "inactive" | "canceled" | "past_due" | "unpaid" | "trialing";
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  }) {
    const member = await getMemberById(memberId);
    if (!member) return;
    if (updates.membershipStatus) member.membershipStatus = updates.membershipStatus;
    if (updates.subscriptionStatus) member.subscriptionStatus = updates.subscriptionStatus;
    if (updates.stripeCustomerId) member.stripeCustomerId = updates.stripeCustomerId;
    if (updates.stripeSubscriptionId) member.stripeSubscriptionId = updates.stripeSubscriptionId;
    if (updates.membershipStatus === "active") member.monthlyPrice = MEMBERSHIP_PRICE;
    member.updatedAt = new Date().toISOString();
    member.crmSynced = await syncToCrm(member);
    await saveMember(member);
  }

  async function findMemberId(sessionOrSub: { metadata?: Stripe.Metadata | null; customer?: string | Stripe.Customer | null; customer_email?: string | null }): Promise<string | null> {
    if (sessionOrSub.metadata?.member_id) return sessionOrSub.metadata.member_id;
    const email = sessionOrSub.customer_email;
    if (email) {
      const m = await getMemberByEmail(email);
      if (m) return m.id;
    }
    return null;
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const memberId = await findMemberId(session);
      if (memberId) {
        await updateMember(memberId, {
          membershipStatus: "active",
          subscriptionStatus: "active",
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
        });
      }
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      let memberId = sub.metadata?.member_id;
      if (!memberId && typeof sub.customer === "string") {
        const customer = await stripe.customers.retrieve(sub.customer);
        if (!customer.deleted && customer.email) {
          const m = await getMemberByEmail(customer.email);
          if (m) memberId = m.id;
        }
      }
      if (!memberId) break;
      const active = sub.status === "active" || sub.status === "trialing";
      await updateMember(memberId, {
        membershipStatus: active ? "active" : "inactive",
        subscriptionStatus: (sub.status === "trialing" ? "trialing" : sub.status) as "active" | "canceled" | "past_due" | "unpaid" | "trialing",
        stripeSubscriptionId: sub.id,
        stripeCustomerId: sub.customer as string,
      });
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      let memberId = sub.metadata?.member_id;
      if (!memberId && typeof sub.customer === "string") {
        const customer = await stripe.customers.retrieve(sub.customer);
        if (!customer.deleted && customer.email) {
          const m = await getMemberByEmail(customer.email);
          if (m) memberId = m.id;
        }
      }
      if (memberId) {
        await updateMember(memberId, {
          membershipStatus: "inactive",
          subscriptionStatus: "canceled",
        });
      }
      break;
    }
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const subId = invoice.subscription as string;
      if (subId) {
        const sub = await stripe.subscriptions.retrieve(subId);
        let memberId = sub.metadata?.member_id;
        if (!memberId && typeof sub.customer === "string") {
          const customer = await stripe.customers.retrieve(sub.customer);
          if (!customer.deleted && customer.email) {
            const m = await getMemberByEmail(customer.email);
            if (m) memberId = m.id;
          }
        }
        if (memberId) {
          await updateMember(memberId, {
            membershipStatus: "active",
            subscriptionStatus: "active",
          });
        }
      }
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subId = invoice.subscription as string;
      if (subId) {
        const sub = await stripe.subscriptions.retrieve(subId);
        let memberId = sub.metadata?.member_id;
        if (!memberId && typeof sub.customer === "string") {
          const customer = await stripe.customers.retrieve(sub.customer);
          if (!customer.deleted && customer.email) {
            const m = await getMemberByEmail(customer.email);
            if (m) memberId = m.id;
          }
        }
        if (memberId) {
          await updateMember(memberId, {
            membershipStatus: "inactive",
            subscriptionStatus: "past_due",
          });
        }
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
