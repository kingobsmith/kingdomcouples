import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-kingdom-navy mb-6 font-serif">Community Covenant & Code of Conduct</h1>
        <div className="space-y-6">
          {[
            { title: "Honor God", desc: "Every interaction should reflect the love of Christ." },
            { title: "No Dating or Romance Matching", desc: "This is fellowship, not a dating or matchmaking service. No swiping, no romance profiles." },
            { title: "No Solicitation or Spam", desc: "Commercial solicitation and spam are not permitted." },
            { title: "No Harassment", desc: "Bullying, unwanted contact, or intimidation will result in suspension." },
            { title: "Protect Families", desc: "No minors in adult community areas without proper guardian workflows." },
            { title: "Be Authentic", desc: "Honest representation builds trust in the Body of Christ." },
            { title: "Report Concerns", desc: "Use the report form in your dashboard or email support@kingdomfolk.co." },
          ].map((g, i) => (
            <div key={g.title} className="card">
              <h2 className="font-bold text-kingdom-navy mb-2"><span className="text-kingdom-gold mr-2">{i + 1}.</span>{g.title}</h2>
              <p className="text-gray-600 text-sm">{g.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/join" className="btn-primary">Join Kingdom Folk</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
