"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { getDashboardPath } from "@/lib/types";
import { BRAND } from "@/lib/brand";

export default function Navbar() {
  const { member, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl font-extrabold text-kingdom-navy tracking-tight font-serif">
              Kingdom <span className="text-kingdom-gold">Folk</span>
            </span>
            <span className="hidden lg:block text-xs text-gray-500 mt-0.5">{BRAND.tagline}</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <a href="/#family" className="text-gray-600 hover:text-kingdom-navy font-medium transition text-sm">
              Family Side
            </a>
            <a href="/#couples" className="text-gray-600 hover:text-kingdom-navy font-medium transition text-sm">
              Couples Corner
            </a>
            <a href="/#singles" className="text-gray-600 hover:text-kingdom-navy font-medium transition text-sm">
              Singles Ministry
            </a>
            <Link href="/learn-more" className="text-gray-600 hover:text-kingdom-navy font-medium transition text-sm">
              About
            </Link>
            <Link href="/guidelines" className="text-gray-600 hover:text-kingdom-navy font-medium transition text-sm">
              Covenant
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {member ? (
              <>
                <Link
                  href={getDashboardPath(member.role)}
                  className="text-sm font-semibold text-kingdom-navy hover:underline hidden sm:block"
                >
                  Dashboard
                </Link>
                <button onClick={() => logout()} className="btn-outline text-sm py-2 px-4">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold text-kingdom-navy hover:underline hidden sm:block">
                  Sign In
                </Link>
                <Link href="/join" className="btn-primary text-sm py-2 px-5">
                  Join — Free Trial
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
