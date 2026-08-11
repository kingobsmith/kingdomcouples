import Stripe from "stripe";
import { MembershipType } from "./types";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : (null as unknown as Stripe);

export function getPriceId(): string {
  return process.env.STRIPE_PRICE_ID || "";
}

export function getTrialDays(): number {
  const days = parseInt(process.env.STRIPE_TRIAL_DAYS || "7", 10);
  return Number.isFinite(days) && days > 0 ? days : 7;
}

export function membershipMetadata(type: MembershipType) {
  return {
    platform: "kingdom_folk",
    product: "Kingdom Folk Membership",
    membership_type: type,
    crm_source: "kingdomfolk.co",
  };
}

export function isComplimentaryCode(code: string): boolean {
  const codes = (process.env.COMPLIMENTARY_ACCESS_CODES || "")
    .split(",")
    .map((c) => c.trim().toLowerCase())
    .filter(Boolean);
  return codes.includes(code.trim().toLowerCase());
}
