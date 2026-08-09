import Stripe from "stripe";
import { MembershipType } from "./types";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : (null as unknown as Stripe);

export function getPriceId(): string {
  return process.env.STRIPE_PRICE_ID || "";
}

export function membershipMetadata(type: MembershipType) {
  return {
    platform: "kingdom_folk",
    membership_type: type,
    crm_source: "kingdomfolk.co",
  };
}
