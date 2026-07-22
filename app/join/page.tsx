"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth, seedAdminIfNeeded } from "@/lib/auth";
import { Lane, LANE_INFO } from "@/lib/types";

function JoinContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register } = useAuth();
  const [step, setStep] = useState<"lane" | "form" | "family">("lane");
  const [lane, setLane] = useState<Lane | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [householdName, setHouseholdName] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [members, setMembers] = useState<{ name: string; email: string; relationship: string }[]>([]);
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberRelation, setMemberRelation] = useState("");

  useEffect(() => {
    seedAdminIfNeeded();
    const laneParam = searchParams.get("lane") as Lane | null;
    if (laneParam && LANE_INFO[laneParam]) {
      setLane(laneParam);
      setStep("form");
    }
  }, [searchParams]);

  function selectLane(l: Lane) {
    setLane(l);
    setStep("form");
  }

  function addMember() {
    if (!memberName.trim() || !memberEmail.trim()) return;
    setMembers([...members, { name: memberName, email: memberEmail, relationship: memberRelation || "Family Member" }]);
    setMemberName("");
    setMemberEmail("");
    setMemberRelation("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!lane) return;

    if (lane === "family" && step === "form") {
      setStep("family");
      return;
    }

    const user = register({
      name,
      email,
      password,
      lane,
      role: lane,
      householdName: lane === "family" ? householdName : undefined,
      spouseName: lane === "couples" ? spouseName : undefined,
      familyMembers: lane === "family"
        ? members.map((m) => ({ ...m, id: crypto.randomUUID() }))
        : undefined,
    });

    router.push("/onboarding");
  }

  return (
    <div className="min-h-screen bg-kingdom-cream">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-kingdom-navy text-center mb-2 font-serif">Join KingdomCouples</h1>
        <p className="text-gray-500 text-center mb-8">Create your account with One Kingdom Login</p>

        {step === "lane" && (
          <div className="space-y-4">
            <p className="text-center text-gray-600 mb-6">First, choose your lane:</p>
            {(Object.keys(LANE_INFO) as Lane[]).map((l) => (
              <button
                key={l}
                onClick={() => selectLane(l)}
                className={`card w-full text-left hover:shadow-xl transition border-l-4 ${LANE_INFO[l].borderColor}`}
              >
                <h3 className="font-bold text-kingdom-navy">{LANE_INFO[l].title}</h3>
                <p className="text-sm text-gray-500">{LANE_INFO[l].subtitle}</p>
              </button>
            ))}
          </div>
        )}

        {step === "form" && lane && (
          <form onSubmit={handleSubmit} className="card space-y-4">
            <div className="bg-kingdom-navy/5 rounded-lg px-4 py-3 mb-2">
              <p className="text-sm font-semibold text-kingdom-navy">
                Joining: {LANE_INFO[lane].title}
              </p>
              <button type="button" onClick={() => setStep("lane")} className="text-xs text-gray-500 hover:underline">
                Change lane
              </button>
            </div>

            <div>
              <label className="label">Your Full Name</label>
              <input className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>

            {lane === "couples" && (
              <div>
                <label className="label">Spouse Name</label>
                <input className="input-field" value={spouseName} onChange={(e) => setSpouseName(e.target.value)} placeholder="Your spouse's full name" />
              </div>
            )}

            <button type="submit" className="btn-primary w-full">
              {lane === "family" ? "Continue to Family Setup" : "Create Account"}
            </button>
          </form>
        )}

        {step === "family" && lane === "family" && (
          <form onSubmit={handleSubmit} className="card space-y-4">
            <h2 className="text-xl font-bold text-kingdom-navy">Family-First Onboarding</h2>
            <p className="text-sm text-gray-500">
              Set up your household. Each family member can get their own login experience as part of your family account.
            </p>

            <div>
              <label className="label">Household Name</label>
              <input
                className="input-field"
                value={householdName}
                onChange={(e) => setHouseholdName(e.target.value)}
                placeholder="e.g. The Johnson Family"
                required
              />
            </div>

            <div className="border-t border-gray-100 pt-4">
              <label className="label">Add Family Members</label>
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <input className="input-field" value={memberName} onChange={(e) => setMemberName(e.target.value)} placeholder="Name" />
                <input className="input-field" value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)} placeholder="Email" type="email" />
                <input className="input-field" value={memberRelation} onChange={(e) => setMemberRelation(e.target.value)} placeholder="Relationship" />
              </div>
              <button type="button" onClick={addMember} className="btn-outline text-sm py-2">
                + Add Member
              </button>
            </div>

            {members.length > 0 && (
              <ul className="space-y-2">
                {members.map((m, i) => (
                  <li key={i} className="bg-gray-50 rounded-lg px-4 py-2 text-sm flex justify-between">
                    <span><strong>{m.name}</strong> ({m.relationship})</span>
                    <span className="text-gray-400">{m.email}</span>
                  </li>
                ))}
              </ul>
            )}

            <button type="submit" className="btn-primary w-full">Create Family Account</button>
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-kingdom-navy font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <JoinContent />
    </Suspense>
  );
}
