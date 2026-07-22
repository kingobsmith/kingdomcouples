"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { getDashboardPath, LANE_INFO } from "@/lib/types";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const [church, setChurch] = useState("");
  const [testimony, setTestimony] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.onboardingComplete) {
      router.push(getDashboardPath(user.role));
    }
  }, [user, router]);

  function handleComplete(e: React.FormEvent) {
    e.preventDefault();
    updateProfile({
      church,
      testimony,
      bio,
      onboardingComplete: true,
    });
    if (user) {
      router.push(getDashboardPath(user.role));
    }
  }

  if (!user) return null;

  const laneInfo = LANE_INFO[user.lane];

  return (
    <div className="min-h-screen bg-kingdom-cream flex items-center justify-center px-4 py-12">
      <div className="card max-w-lg w-full">
        <h1 className="text-2xl font-bold text-kingdom-navy mb-2 font-serif">Welcome to {laneInfo.title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          Complete your profile so the community can get to know you. Your account will be reviewed by a moderator before full access.
        </p>

        <form onSubmit={handleComplete} className="space-y-4">
          <div>
            <label className="label">Home Church</label>
            <input
              className="input-field"
              value={church}
              onChange={(e) => setChurch(e.target.value)}
              placeholder="Your church name"
            />
          </div>
          <div>
            <label className="label">Short Bio</label>
            <textarea
              className="input-field min-h-[80px]"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A few words about yourself..."
            />
          </div>
          <div>
            <label className="label">Your Testimony</label>
            <textarea
              className="input-field min-h-[120px]"
              value={testimony}
              onChange={(e) => setTestimony(e.target.value)}
              placeholder="Share your faith journey..."
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Complete Setup & Enter Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
