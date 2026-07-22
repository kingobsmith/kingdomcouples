export type Lane = "family" | "couples" | "singles";

export type UserRole = "family" | "couples" | "singles" | "admin";

export interface FamilyMember {
  id: string;
  name: string;
  email: string;
  relationship: string;
  age?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  password: string;
  name: string;
  lane: Lane;
  role: UserRole;
  householdName?: string;
  familyMembers?: FamilyMember[];
  church?: string;
  denomination?: string;
  testimony?: string;
  bio?: string;
  spouseName?: string;
  childrenCount?: string;
  onboardingComplete: boolean;
  approved: boolean;
  createdAt: string;
}

export interface ConnectionRequest {
  id: string;
  fromId: string;
  fromName: string;
  toId: string;
  message: string;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
}

export interface Message {
  id: string;
  fromId: string;
  fromName: string;
  toId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface PrayerRequest {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  createdAt: string;
  prayers: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  lane: Lane | "all";
  hostName: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  targetId: string;
  targetName: string;
  reason: string;
  details: string;
  status: "pending" | "reviewed" | "resolved";
  createdAt: string;
}

export const LANE_INFO = {
  family: {
    title: "Family Side",
    subtitle: "Households connect with households",
    description:
      "Build strong Kingdom family networks. Arrange playdates, share resources, and grow together with vetted families in your community.",
    color: "sage",
    borderColor: "border-kingdom-sage",
    bgLight: "bg-green-50",
    textColor: "text-kingdom-sage",
    icon: "home",
  },
  couples: {
    title: "Couples Corner",
    subtitle: "Married couples connect with married couples",
    description:
      "Strengthen your covenant through fellowship, double-dates, mentorship, and shared wisdom with other Kingdom couples.",
    color: "navy",
    borderColor: "border-kingdom-navy",
    bgLight: "bg-blue-50",
    textColor: "text-kingdom-navy",
    icon: "heart",
  },
  singles: {
    title: "Singles Ministry",
    subtitle: "Friends-first Christian connection",
    description:
      "No dating pressure, no hookup energy. Meet Kingdom-minded believers where friendship comes first and chemistry decides later.",
    color: "plum",
    borderColor: "border-kingdom-plum",
    bgLight: "bg-purple-50",
    textColor: "text-kingdom-plum",
    icon: "people",
  },
} as const;

export function getDashboardPath(role: UserRole): string {
  if (role === "admin") return "/dashboard/admin";
  return `/dashboard/${role}`;
}
