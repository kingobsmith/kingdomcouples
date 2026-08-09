import { Lane } from "./types";

export function getPaymentLink(lane: Lane): string | null {
  const links: Record<Lane, string | undefined> = {
    singles: process.env.STRIPE_PAYMENT_LINK_SINGLES,
    couples: process.env.STRIPE_PAYMENT_LINK_COUPLES,
    family: process.env.STRIPE_PAYMENT_LINK_FAMILY,
  };
  return links[lane] || process.env.STRIPE_PAYMENT_LINK || null;
}

export function paymentLinkWithEmail(link: string, email: string): string {
  const url = new URL(link);
  url.searchParams.set("prefilled_email", email);
  return url.toString();
}
