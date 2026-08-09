import { NextRequest, NextResponse } from "next/server";
import { getSessionMember } from "@/lib/session";
import { getAllMembers, getEvents, saveEvents, getResources, saveResources, getAnnouncements, saveAnnouncements, getReports, saveReports, getInterests, getMemberById, saveMember } from "@/lib/db";
import { toSafeMember } from "@/lib/types";

async function requireAdmin() {
  const session = await getSessionMember();
  if (!session || session.role !== "admin") return null;
  return session;
}

export async function GET(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const type = req.nextUrl.searchParams.get("type") || "members";

  if (type === "members") {
    const members = await getAllMembers();
    const filter = req.nextUrl.searchParams.get("filter");
    let list = members.map(toSafeMember);
    if (filter === "single" || filter === "couple" || filter === "family") {
      list = list.filter((m) => m.membershipType === filter);
    }
    if (filter === "active" || filter === "pending" || filter === "inactive") {
      if (filter === "active") list = list.filter((m) => m.membershipStatus === "active");
      if (filter === "pending") list = list.filter((m) => m.membershipStatus === "pending_payment");
      if (filter === "inactive") list = list.filter((m) => m.membershipStatus === "inactive");
    }
    return NextResponse.json({ members: list });
  }

  if (type === "events") return NextResponse.json({ events: await getEvents() });
  if (type === "resources") return NextResponse.json({ resources: await getResources() });
  if (type === "announcements") return NextResponse.json({ announcements: await getAnnouncements() });
  if (type === "reports") return NextResponse.json({ reports: await getReports() });
  if (type === "interests") return NextResponse.json({ interests: await getInterests() });

  return NextResponse.json({ error: "Unknown type" }, { status: 400 });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { action } = body;

  if (action === "create-event") {
    const events = await getEvents();
    events.push({ ...body.event, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    await saveEvents(events);
    return NextResponse.json({ ok: true });
  }

  if (action === "create-resource") {
    const resources = await getResources();
    resources.push({ ...body.resource, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    await saveResources(resources);
    return NextResponse.json({ ok: true });
  }

  if (action === "create-announcement") {
    const announcements = await getAnnouncements();
    announcements.push({ ...body.announcement, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    await saveAnnouncements(announcements);
    return NextResponse.json({ ok: true });
  }

  if (action === "suspend-member") {
    const member = await getMemberById(body.memberId);
    if (!member) return NextResponse.json({ error: "Not found" }, { status: 404 });
    member.suspended = true;
    member.updatedAt = new Date().toISOString();
    await saveMember(member);
    return NextResponse.json({ ok: true });
  }

  if (action === "resolve-report") {
    const reports = await getReports();
    const idx = reports.findIndex((r) => r.id === body.reportId);
    if (idx >= 0) {
      reports[idx].status = body.status;
      await saveReports(reports);
    }
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { type, id } = await req.json();

  if (type === "event") {
    const events = (await getEvents()).filter((e) => e.id !== id);
    await saveEvents(events);
  } else if (type === "resource") {
    const resources = (await getResources()).filter((r) => r.id !== id);
    await saveResources(resources);
  } else if (type === "announcement") {
    const announcements = (await getAnnouncements()).filter((a) => a.id !== id);
    await saveAnnouncements(announcements);
  }

  return NextResponse.json({ ok: true });
}
