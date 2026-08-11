import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MEMBERSHIP_PRICE, TRIAL_DAYS } from "@/lib/types";
import { BRAND } from "@/lib/brand";

export default function CancellationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-kingdom-navy font-serif">{BRAND.name} — Cancellation & Refunds</h1>
        <div className="text-gray-600 mt-6 space-y-4">
          <p>{BRAND.name} offers a {TRIAL_DAYS}-day free trial, then ${MEMBERSHIP_PRICE}/month billed through Stripe.</p>
          <p>You may cancel anytime from your dashboard using Manage Billing, which opens the Stripe billing portal.</p>
          <p>When you cancel, access continues until the end of your current billing period. After that, membership status becomes inactive and dashboard access is removed.</p>
          <p>Refunds are handled on a case-by-case basis. Contact {BRAND.supportEmail} for billing questions.</p>
          <p>Failed payments will mark your subscription as past due. Access is removed until payment is resolved.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
