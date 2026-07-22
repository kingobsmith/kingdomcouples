import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-kingdom-navy mb-6 font-serif">Community Guidelines</h1>
        <p className="text-gray-600 mb-8">
          KingdomCouples is a sacred space. These guidelines protect our community and honor Christ.
        </p>

        <div className="space-y-6">
          {[
            { title: "Honor God in All Things", desc: "Every interaction should reflect the love of Christ. Speak with grace, truth, and humility." },
            { title: "Friendship First", desc: "This is not a dating app. No pressure, no pursuit, no worldly dating behavior — especially in Singles Ministry." },
            { title: "Respect Boundaries", desc: "Consent, modesty, and personal boundaries are non-negotiable. Never pressure anyone." },
            { title: "Protect Families", desc: "Family Side is built for households. Protect children. Report anything that feels unsafe immediately." },
            { title: "Be Authentic", desc: "Misrepresentation breaks trust in the Body of Christ. Be honest about who you are." },
            { title: "No Harassment", desc: "Bullying, solicitation, inappropriate content, or repeated unwanted contact will result in removal." },
            { title: "Moderation", desc: "All accounts are reviewed upon signup. Moderators may remove content or accounts that violate these standards." },
          ].map((g, i) => (
            <div key={g.title} className="card">
              <h2 className="font-bold text-kingdom-navy mb-2">
                <span className="text-kingdom-gold mr-2">{i + 1}.</span>
                {g.title}
              </h2>
              <p className="text-gray-600 text-sm">{g.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">Ready to be part of a community that honors these values?</p>
          <Link href="/join" className="btn-primary">Join KingdomCouples</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
