export type Lane = "singles" | "couples" | "family";
export type MembershipType = "single" | "couple" | "family";
export type UserRole = Lane | "admin";

export type MembershipStatus = "pending_payment" | "active" | "inactive";
export type SubscriptionStatus = "inactive" | "active" | "canceled" | "past_due" | "unpaid";

export interface Member {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  membershipType: MembershipType;
  lane: Lane;
  role: UserRole;
  churchName?: string;
  howDidYouHear?: string;
  partnerName?: string;
  partnerEmail?: string;
  relationshipStage?: "married" | "engaged";
  householdName?: string;
  numberOfAdults?: number;
  numberOfChildren?: number;
  termsAccepted: boolean;
  covenantAccepted: boolean;
  membershipStatus: MembershipStatus;
  subscriptionStatus: SubscriptionStatus;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  monthlyPrice?: number;
  crmSynced: boolean;
  crmSyncError?: string;
  suspended: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  lane: Lane | "all";
  hostName: string;
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  lane: Lane | "all";
  type: "devotional" | "game-night" | "covenant" | "retreat" | "general";
  url?: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  lane: Lane | "all";
  createdAt: string;
}

export interface InterestSubmission {
  id: string;
  memberId: string;
  memberName: string;
  lane: Lane;
  type: "small-group" | "mentorship" | "accountability" | "general";
  message: string;
  createdAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  targetName: string;
  reason: string;
  details: string;
  status: "pending" | "reviewed" | "resolved";
  createdAt: string;
}

export const MEMBERSHIP_PRICE = 9.99;

export const LANE_INFO = {
  family: {
    title: "Family Side",
    subtitle: "Devotionals, game nights, household covenants, and community",
    description:
      "Join for family devotionals, game nights, household covenants, and shared experiences with other Kingdom families.",
    membershipLabel: "Choose Family Membership",
    membershipType: "family" as MembershipType,
    borderColor: "border-kingdom-sage",
    bgLight: "bg-green-50",
    textColor: "text-kingdom-sage",
    icon: "home",
  },
  couples: {
    title: "Couples Corner",
    subtitle: "Christian mingling, prayer, retreats, and accountability",
    description:
      "Join for Christian mingling, retreats, prayer, marriage devotionals, and accountability with other covenant couples.",
    membershipLabel: "Choose Couples Membership",
    membershipType: "couple" as MembershipType,
    borderColor: "border-kingdom-navy",
    bgLight: "bg-blue-50",
    textColor: "text-kingdom-navy",
    icon: "heart",
  },
  singles: {
    title: "Singles Ministry",
    subtitle: "Fellowship and community — not dating",
    description:
      "Join for genuine Christian fellowship and community without dating pressure, romance matching, or swiping.",
    membershipLabel: "Choose Singles Membership",
    membershipType: "single" as MembershipType,
    borderColor: "border-kingdom-plum",
    bgLight: "bg-purple-50",
    textColor: "text-kingdom-plum",
    icon: "people",
  },
} as const;

export function laneFromMembership(type: MembershipType): Lane {
  if (type === "single") return "singles";
  if (type === "couple") return "couples";
  return "family";
}

export function membershipFromLane(lane: Lane): MembershipType {
  if (lane === "singles") return "single";
  if (lane === "couples") return "couple";
  return "family";
}

export function getDashboardPath(role: UserRole): string {
  if (role === "admin") return "/dashboard/admin";
  return `/dashboard/${role}`;
}

export type SafeMember = Omit<Member, "passwordHash">;

export function toSafeMember(m: Member): SafeMember {
  const { passwordHash, ...safe } = m;
  return safe;
}
