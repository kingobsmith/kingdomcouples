"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Lane, LANE_INFO, membershipFromLane, MEMBERSHIP_PRICE, TRIAL_DAYS } from "@/lib/types";
import { BRAND } from "@/lib/brand";

function JoinContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [lane, setLane] = useState<Lane | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [churchName, setChurchName] = useState("");
  const [howDidYouHear, setHowDidYouHear] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [covenantAccepted, setCovenantAccepted] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [relationshipStage, setRelationshipStage] = useState<"married" | "engaged">("married");
  const [householdName, setHouseholdName] = useState("");
  const [numberOfAdults, setNumberOfAdults] = useState("2");
  const [numberOfChildren, setNumberOfChildren] = useState("0");
  const [accessCode, setAccessCode] = useState("");

  useEffect(() => {
    const laneParam = searchParams.get("lane") as Lane | null;
    if (laneParam && LANE_INFO[laneParam]) setLane(laneParam);
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!lane) return;
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName, email, phone, city, state, country,
          membershipType: membershipFromLane(lane),
          churchName, howDidYouHear, password, termsAccepted, covenantAccepted,
          partnerName: lane === "couples" ? partnerName : undefined,
          partnerEmail: lane === "couples" ? partnerEmail : undefined,
          relationshipStage: lane === "couples" ? relationshipStage : undefined,
          householdName: lane === "family" ? householdName : undefined,
          numberOfAdults: lane === "family" ? numberOfAdults : undefined,
          numberOfChildren: lane === "family" ? numberOfChildren : undefined,
          accessCode: accessCode.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        setSubmitting(false);
        return;
      }

      if (data.skipPayment) {
        router.push(`/dashboard/${lane}`);
        return;
      }

      const checkoutRes = await fetch("/api/stripe/checkout", { method: "POST" });
      const checkoutData = await checkoutRes.json();
      if (checkoutData.url) {
        window.location.href = checkoutData.url;
      } else {
        setError(checkoutData.error || "Could not start payment. Sign in and try again from your dashboard.");
        router.push(`/dashboard/${lane}`);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-kingdom-cream">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-kingdom-navy text-center mb-2 font-serif">Join {BRAND.name}</h1>
        <p className="text-kingdom-gold text-center text-sm font-medium mb-1">{BRAND.tagline}</p>
        <p className="text-gray-500 text-center mb-2">{TRIAL_DAYS}-day free trial, then ${MEMBERSHIP_PRICE}/month</p>

        {!lane ? (
          <div className="space-y-4 mt-8">
            <p className="text-center text-gray-600 mb-6">Choose your membership lane:</p>
            {(Object.keys(LANE_INFO) as Lane[]).map((l) => (
              <button
                key={l}
                onClick={() => setLane(l)}
                className={`card w-full text-left hover:shadow-xl transition border-l-4 ${LANE_INFO[l].borderColor}`}
              >
                <h3 className="font-bold text-kingdom-navy">{LANE_INFO[l].title}</h3>
                <p className="text-sm text-gray-500">{LANE_INFO[l].subtitle}</p>
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card space-y-4 mt-8">
            <div className="bg-kingdom-navy/5 rounded-lg px-4 py-3">
              <p className="text-sm font-semibold text-kingdom-navy">{LANE_INFO[lane].title} — {TRIAL_DAYS}-day free trial</p>
              <button type="button" onClick={() => setLane(null)} className="text-xs text-gray-500 hover:underline">Change lane</button>
            </div>

            <div>
              <label className="label">Full Name *</label>
              <input className="input-field" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Email *</label>
                <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="label">Phone *</label>
                <input className="input-field" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="label">City *</label>
                <input className="input-field" value={city} onChange={(e) => setCity(e.target.value)} required />
              </div>
              <div>
                <label className="label">State *</label>
                <input className="input-field" value={state} onChange={(e) => setState(e.target.value)} required />
              </div>
              <div>
                <label className="label">Country *</label>
                <input className="input-field" value={country} onChange={(e) => setCountry(e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="label">Church Name (optional)</label>
              <input className="input-field" value={churchName} onChange={(e) => setChurchName(e.target.value)} />
            </div>
            <div>
              <label className="label">How did you hear about us?</label>
              <input className="input-field" value={howDidYouHear} onChange={(e) => setHowDidYouHear(e.target.value)} />
            </div>
            <div>
              <label className="label">Password *</label>
              <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>

            {lane === "couples" && (
              <>
                <div>
                  <label className="label">Partner Name *</label>
                  <input className="input-field" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} required />
                </div>
                <div>
                  <label className="label">Partner Email (optional)</label>
                  <input className="input-field" type="email" value={partnerEmail} onChange={(e) => setPartnerEmail(e.target.value)} />
                </div>
                <div>
                  <label className="label">Relationship Stage *</label>
                  <select className="input-field" value={relationshipStage} onChange={(e) => setRelationshipStage(e.target.value as "married" | "engaged")}>
                    <option value="married">Married</option>
                    <option value="engaged">Engaged</option>
                  </select>
                </div>
              </>
            )}

            {lane === "family" && (
              <>
                <div>
                  <label className="label">Household Name *</label>
                  <input className="input-field" value={householdName} onChange={(e) => setHouseholdName(e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Number of Adults *</label>
                    <input className="input-field" type="number" min="1" value={numberOfAdults} onChange={(e) => setNumberOfAdults(e.target.value)} required />
                  </div>
                  <div>
                    <label className="label">Number of Children</label>
                    <input className="input-field" type="number" min="0" value={numberOfChildren} onChange={(e) => setNumberOfChildren(e.target.value)} />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="label">Access Code (optional)</label>
              <input className="input-field" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} placeholder="Complimentary access code" />
              <p className="text-xs text-gray-400 mt-1">Have a VIP or complimentary code? Enter it here for free access.</p>
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1" required />
              <span>I accept the <Link href="/terms" className="text-kingdom-navy underline" target="_blank">Terms of Service</Link> *</span>
            </label>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" checked={covenantAccepted} onChange={(e) => setCovenantAccepted(e.target.checked)} className="mt-1" required />
              <span>I accept the <Link href="/guidelines" className="text-kingdom-navy underline" target="_blank">Community Covenant</Link> *</span>
            </label>

            {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg px-4 py-2">{error}</p>}

            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting ? "Processing..." : accessCode.trim() ? "Create Account" : `Start ${TRIAL_DAYS}-Day Free Trial`}
            </button>
            {!accessCode.trim() && (
              <p className="text-xs text-gray-500 text-center">Card required. ${MEMBERSHIP_PRICE}/month after trial. Promo codes accepted at checkout.</p>
            )}
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-8">
          Already a member? <Link href="/login" className="text-kingdom-navy font-semibold hover:underline">Sign in</Link>
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
