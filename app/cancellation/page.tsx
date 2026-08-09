import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CancellationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-kingdom-navy font-serif">Cancellation & Refunds</h1>
        <div className="text-gray-600 mt-6 space-y-4">
          <p>Kingdom Folk membership is $9.99/month, billed monthly through Stripe.</p>
          <p>You may cancel anytime from your dashboard using Manage Billing, which opens the Stripe billing portal.</p>
          <p>When you cancel, access continues until the end of your current billing period. After that, membership status becomes inactive and dashboard access is removed.</p>
          <p>Refunds are handled on a case-by-case basis. Contact support@kingdomfolk.co for billing questions.</p>
          <p>Failed payments will mark your subscription as past due. Access is removed until payment is resolved.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
