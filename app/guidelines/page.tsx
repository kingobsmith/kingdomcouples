import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-kingdom-navy mb-2 font-serif">{BRAND.name} Community Covenant</h1>
        <p className="text-gray-500 mb-8">{BRAND.name} is fellowship — not a dating or matchmaking service.</p>
        <div className="space-y-6">
          {[
            { title: "Honor God", desc: "Every interaction should reflect the love of Christ." },
            { title: "Not a Dating App", desc: `${BRAND.name} is for fellowship. No swiping, no romance profiles, no matchmaking.` },
            { title: "Three Lanes, One Community", desc: "Family Side, Couples Corner, and Singles Ministry each have their own space and purpose." },
            { title: "No Solicitation or Spam", desc: "Commercial solicitation and spam are not permitted." },
            { title: "No Harassment", desc: "Bullying, unwanted contact, or intimidation will result in suspension." },
            { title: "Protect Families", desc: "No minors in adult community areas without proper guardian workflows." },
            { title: "Report Concerns", desc: `Use the report form in your dashboard or email ${BRAND.supportEmail}.` },
          ].map((g, i) => (
            <div key={g.title} className="card">
              <h2 className="font-bold text-kingdom-navy mb-2"><span className="text-kingdom-gold mr-2">{i + 1}.</span>{g.title}</h2>
              <p className="text-gray-600 text-sm">{g.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/join" className="btn-primary">Join {BRAND.name}</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
