import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MEMBERSHIP_PRICE, TRIAL_DAYS } from "@/lib/types";
import { BRAND } from "@/lib/brand";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 py-16 prose prose-gray">
        <h1 className="text-3xl font-bold text-kingdom-navy font-serif">{BRAND.name} Terms of Service</h1>
        <p className="text-gray-600 mt-4">By joining {BRAND.name} at {BRAND.domain}, you agree to these terms.</p>
        <h2 className="text-xl font-bold mt-8">Membership</h2>
        <p className="text-gray-600 mt-4">{BRAND.name} membership is ${MEMBERSHIP_PRICE}/month after a {TRIAL_DAYS}-day free trial, billed recurring through Stripe. You choose one lane: single, couple, or family. Promo codes may be applied at checkout.</p>
        <h2 className="text-xl font-bold mt-8">Community Standards</h2>
        <p className="text-gray-600">Members must follow the Community Covenant. Violations may result in suspension without refund.</p>
        <h2 className="text-xl font-bold mt-8">Account</h2>
        <p className="text-gray-600">You are responsible for your account credentials. One Kingdom Login credentials may be used across Kingdom ecosystem platforms.</p>
        <h2 className="text-xl font-bold mt-8">Content</h2>
        <p className="text-gray-600">{BRAND.name} provides events, resources, and community access. We do not guarantee specific outcomes from community participation.</p>
      </div>
      <Footer />
    </div>
  );
}
