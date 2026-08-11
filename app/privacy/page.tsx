import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MEMBERSHIP_PRICE, TRIAL_DAYS } from "@/lib/types";
import { BRAND } from "@/lib/brand";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-kingdom-navy font-serif">{BRAND.name} Privacy Policy</h1>
        <div className="text-gray-600 mt-6 space-y-4">
          <p>{BRAND.name} collects name, email, phone, location, church affiliation, and membership lane to provide community services.</p>
          <p>We do not collect health information, therapy information, or private prayer details during signup.</p>
          <p>Payment data is processed by Stripe. We store Stripe customer and subscription IDs for billing management.</p>
          <p>Member data is synced to Super CRM for community management. Email is used as the deduplication key.</p>
          <p>We do not sell personal data. Contact {BRAND.supportEmail} for data requests.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
