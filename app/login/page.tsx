"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/lib/auth";
import { getDashboardPath } from "@/lib/types";

export default function LoginPage() {
  const router = useRouter();
  const { login, member, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && member) {
      router.push(getDashboardPath(member.role));
    }
  }, [member, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const err = await login(email, password);
    if (err) setError(err);
  }

  return (
    <div className="min-h-screen bg-kingdom-cream">
      <Navbar />
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-kingdom-navy font-serif">One Kingdom Login</h1>
            <p className="text-sm text-gray-500 mt-2">Sign in to your Kingdom Folk membership</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg px-4 py-2">{error}</p>}
            <button type="submit" className="btn-primary w-full">Sign In</button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              New to Kingdom Folk? <Link href="/join" className="text-kingdom-navy font-semibold hover:underline">Start your free trial</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
