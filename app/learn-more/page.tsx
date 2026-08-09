import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { MEMBERSHIP_PRICE } from "@/lib/types";

export default function LearnMorePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-kingdom-navy mb-6 font-serif">About Kingdom Folk</h1>
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p>
            Kingdom Folk is a paid Christian community for singles, couples, and families.
            Singles join for fellowship and community — not dating. Couples join for Christian mingling,
            retreats, prayer, and accountability. Families join for devotionals, game nights, household covenants, and community.
          </p>
          <p>
            One membership — ${MEMBERSHIP_PRICE}/month. You choose your lane at signup: Singles Ministry, Couples Corner, or Family Side.
          </p>
          <p>
            This is not a dating app, matchmaking service, or swipe platform. It is a Kingdom-centered community
            built for genuine fellowship, stronger covenants, and shared faith experiences.
          </p>
        </div>
        <div className="mt-12 text-center">
          <Link href="/join" className="btn-primary">Join Kingdom Folk — ${MEMBERSHIP_PRICE}/month</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
