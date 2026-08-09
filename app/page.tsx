import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LaneCard from "@/components/LaneCard";
import Link from "next/link";
import { MEMBERSHIP_PRICE } from "@/lib/types";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="relative bg-kingdom-navy text-white py-20 sm:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-kingdom-gold font-semibold text-sm sm:text-base tracking-widest uppercase mb-4">
            kingdomfolk.co
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight font-serif">
            Where Christians Come to{" "}
            <span className="text-kingdom-gold">Mingle.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            A Christian community for singles, couples, and families seeking genuine fellowship,
            stronger covenants, and Kingdom-centered connection.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/join" className="btn-secondary text-lg">
              Join Kingdom Folk — ${MEMBERSHIP_PRICE}/month
            </Link>
            <a href="#lanes" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-kingdom-navy transition">
              Choose Your Lane
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-kingdom-navy mb-8 text-center font-serif">Three Lanes. One Membership.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="card">
              <h3 className="font-bold text-kingdom-plum mb-2">Singles Ministry</h3>
              <p className="text-gray-600 text-sm">Community without dating pressure.</p>
            </div>
            <div className="card">
              <h3 className="font-bold text-kingdom-navy mb-2">Couples Corner</h3>
              <p className="text-gray-600 text-sm">Christian mingling, prayer, retreats, and accountability.</p>
            </div>
            <div className="card">
              <h3 className="font-bold text-kingdom-sage mb-2">Family Side</h3>
              <p className="text-gray-600 text-sm">Devotionals, household covenants, and shared experiences.</p>
            </div>
          </div>
          <p className="text-center text-kingdom-navy font-semibold mt-8">
            All three lanes — ${MEMBERSHIP_PRICE}/month. One membership. You choose your lane at signup.
          </p>
        </div>
      </section>

      <section id="lanes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-kingdom-navy mb-4 font-serif">
            Choose Your Membership Lane
          </h2>
          <p className="text-lg text-gray-600">
            Pick the lane that fits your season. Same price, same Kingdom community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <LaneCard lane="singles" />
          <LaneCard lane="couples" />
          <LaneCard lane="family" />
        </div>
      </section>

      <section className="py-16 px-4 bg-kingdom-navy/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-kingdom-navy mb-8 font-serif">
            What Kingdom Folk Members Can Expect
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {[
              "Genuine Christian fellowship",
              "Events rooted in faith and family",
              "A community without dating pressure",
              "Resources for singles, couples, and households",
            ].map((item) => (
              <div key={item} className="card flex items-start gap-3">
                <span className="text-kingdom-gold font-bold text-lg">✓</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-kingdom-navy mb-4 font-serif">Ready to Join?</h2>
        <p className="text-gray-600 mb-8">Create your account, choose your lane, and start your membership.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/join?lane=singles" className="btn-primary">Choose Singles Membership</Link>
          <Link href="/join?lane=couples" className="btn-primary">Choose Couples Membership</Link>
          <Link href="/join?lane=family" className="btn-primary">Choose Family Membership</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
