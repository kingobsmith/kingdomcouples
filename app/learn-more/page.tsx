import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { MEMBERSHIP_PRICE, TRIAL_DAYS } from "@/lib/types";
import { BRAND } from "@/lib/brand";

export default function LearnMorePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-kingdom-navy mb-2 font-serif">About {BRAND.name}</h1>
        <p className="text-kingdom-gold font-semibold mb-8">{BRAND.tagline}</p>
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p>
            {BRAND.name} is a paid Christian community for singles, couples, and families.
            It is not a dating app and should not feel like one. We are a Kingdom-centered
            fellowship platform with three distinct lanes.
          </p>
          <div className="space-y-4">
            <div className="card">
              <h2 className="font-bold text-kingdom-sage mb-2">Family Side</h2>
              <p className="text-sm">Households connecting with households — devotionals, game nights, household covenants, and community.</p>
            </div>
            <div className="card">
              <h2 className="font-bold text-kingdom-navy mb-2">Couples Corner</h2>
              <p className="text-sm">Married couples connecting with married couples — fellowship, retreats, prayer, and accountability.</p>
            </div>
            <div className="card">
              <h2 className="font-bold text-kingdom-plum mb-2">Singles Ministry</h2>
              <p className="text-sm">Friendship-first connection for singles — no dating pressure, no swiping, no romance matching.</p>
            </div>
          </div>
          <p>
            One membership — {TRIAL_DAYS}-day free trial, then ${MEMBERSHIP_PRICE}/month.
            You choose your lane at signup.
          </p>
        </div>
        <div className="mt-12 text-center">
          <Link href="/join" className="btn-primary">Join {BRAND.name}</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
