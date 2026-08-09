import { Member, MembershipType } from "./types";

interface CrmPayload {
  email: string;
  full_name: string;
  phone?: string;
  platform: string;
  platform_slug: string;
  membership_type: MembershipType;
  membership_status: string;
  subscription_status: string;
  source: string;
  tags: string[];
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  monthly_price?: number;
  city?: string;
  state?: string;
  country?: string;
  church_name?: string;
}

export async function syncToCrm(member: Member, extra?: Partial<CrmPayload>): Promise<boolean> {
  const url = process.env.SUPER_CRM_API_URL;
  const key = process.env.SUPER_CRM_API_KEY;
  if (!url) return false;

  const laneTag = member.membershipType;
  const tags = member.membershipStatus === "active"
    ? ["kingdom-folk", "active-member", laneTag]
    : ["kingdom-folk", laneTag, "web-signup"];

  const payload: CrmPayload = {
    email: member.email,
    full_name: member.fullName,
    phone: member.phone,
    platform: "Kingdom Folk",
    platform_slug: "kingdom-folk",
    membership_type: member.membershipType,
    membership_status: member.membershipStatus,
    subscription_status: member.subscriptionStatus,
    source: "kingdomfolk.co",
    tags,
    stripe_customer_id: member.stripeCustomerId,
    stripe_subscription_id: member.stripeSubscriptionId,
    monthly_price: member.monthlyPrice,
    city: member.city,
    state: member.state,
    country: member.country,
    church_name: member.churchName,
    ...extra,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(key ? { Authorization: `Bearer ${key}` } : {}),
      },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
