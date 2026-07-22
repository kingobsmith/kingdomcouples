import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LaneCard from "@/components/LaneCard";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="relative bg-kingdom-navy text-white py-20 sm:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-kingdom-gold font-semibold text-sm sm:text-base tracking-widest uppercase mb-4">
            KingdomCouples.co
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight font-serif">
            Where Christians Come to{" "}
            <span className="text-kingdom-gold">Mingle.</span>
          </h1>
          <p className="text-lg sm:text-2xl font-medium mb-4 text-gray-200">
            No dating required.
          </p>
          <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            A Christian social platform for families, married couples, and singles.
            Not a worldly dating app — a Kingdom relationship community built for every season of life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/join" className="btn-secondary text-lg">
              Join the Community
            </Link>
            <a href="#lanes" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-kingdom-navy transition">
              Explore the Lanes
            </a>
          </div>
          <div className="mt-6">
            <Link href="/login" className="text-gray-300 hover:text-white text-sm underline transition">
              Already a member? Sign in with One Kingdom Login
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-kingdom-navy mb-6 font-serif">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            KingdomCouples is a relationship ecosystem — not a dating marketplace.
            We believe households, couples, and singles each have different needs,
            and this platform reflects that from the start.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Connect with believers who share your season. Build fellowship, find support,
            pray together, and grow in Christ — without the pressure of swipe culture or hookup energy.
          </p>
        </div>
      </section>

      <section id="lanes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-kingdom-navy mb-4 font-serif">
            Choose Your Lane
          </h2>
          <p className="text-lg text-gray-600">
            A dedicated space for every season of Kingdom life.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <LaneCard lane="family" />
          <LaneCard lane="couples" />
          <LaneCard lane="singles" />
        </div>
      </section>

      <section className="py-16 px-4 bg-kingdom-navy/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-kingdom-navy mb-8 font-serif">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {[
              { title: "Family-First", desc: "Households connect with households. Parent-led onboarding, not individual-first." },
              { title: "Covenant-Centered", desc: "Couples strengthen their marriage through fellowship with other married believers." },
              { title: "Friends-First Singles", desc: "No dating pressure. Chemistry decides later, friendship decides now." },
              { title: "One Kingdom Login", desc: "One credential across the entire Kingdom ecosystem. Simple and secure." },
            ].map((item) => (
              <div key={item.title} className="card">
                <h3 className="font-bold text-kingdom-navy mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-kingdom-navy mb-4 font-serif">Ready to Connect?</h2>
        <p className="text-gray-600 mb-8">Join thousands of Kingdom-minded believers building real community.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/join" className="btn-primary">Get Started</Link>
          <Link href="/learn-more" className="btn-outline">Learn More</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
