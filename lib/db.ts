import { kv } from "@vercel/kv";
import { Member, PlatformEvent, Resource, Announcement, InterestSubmission, Report } from "./types";

const MEMBERS_KEY = "kf:members";
const EVENTS_KEY = "kf:events";
const RESOURCES_KEY = "kf:resources";
const ANNOUNCEMENTS_KEY = "kf:announcements";
const INTERESTS_KEY = "kf:interests";
const REPORTS_KEY = "kf:reports";

function hasKv(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function kvGet<T>(key: string, fallback: T): Promise<T> {
  if (!hasKv()) return fallback;
  const val = await kv.get<T>(key);
  return val ?? fallback;
}

async function kvSet<T>(key: string, val: T): Promise<void> {
  if (!hasKv()) throw new Error("KV not configured");
  await kv.set(key, val);
}

export async function getAllMembers(): Promise<Member[]> {
  return kvGet<Member[]>(MEMBERS_KEY, []);
}

export async function getMemberByEmail(email: string): Promise<Member | null> {
  const members = await getAllMembers();
  return members.find((m) => m.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function getMemberById(id: string): Promise<Member | null> {
  const members = await getAllMembers();
  return members.find((m) => m.id === id) ?? null;
}

export async function saveMember(member: Member): Promise<void> {
  const members = await getAllMembers();
  const idx = members.findIndex((m) => m.email.toLowerCase() === member.email.toLowerCase());
  if (idx >= 0) members[idx] = member;
  else members.push(member);
  await kvSet(MEMBERS_KEY, members);
}

export async function getEvents(): Promise<PlatformEvent[]> {
  return kvGet<PlatformEvent[]>(EVENTS_KEY, []);
}

export async function saveEvents(events: PlatformEvent[]): Promise<void> {
  await kvSet(EVENTS_KEY, events);
}

export async function getResources(): Promise<Resource[]> {
  return kvGet<Resource[]>(RESOURCES_KEY, []);
}

export async function saveResources(resources: Resource[]): Promise<void> {
  await kvSet(RESOURCES_KEY, resources);
}

export async function getAnnouncements(): Promise<Announcement[]> {
  return kvGet<Announcement[]>(ANNOUNCEMENTS_KEY, []);
}

export async function saveAnnouncements(announcements: Announcement[]): Promise<void> {
  await kvSet(ANNOUNCEMENTS_KEY, announcements);
}

export async function getInterests(): Promise<InterestSubmission[]> {
  return kvGet<InterestSubmission[]>(INTERESTS_KEY, []);
}

export async function saveInterest(interest: InterestSubmission): Promise<void> {
  const all = await getInterests();
  all.push(interest);
  await kvSet(INTERESTS_KEY, all);
}

export async function getReports(): Promise<Report[]> {
  return kvGet<Report[]>(REPORTS_KEY, []);
}

export async function saveReports(reports: Report[]): Promise<void> {
  await kvSet(REPORTS_KEY, reports);
}

export function isDbConfigured(): boolean {
  return hasKv();
}
