import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LaneCard from "@/components/LaneCard";
import Link from "next/link";
import { MEMBERSHIP_PRICE, TRIAL_DAYS } from "@/lib/types";
import { BRAND } from "@/lib/brand";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="relative bg-kingdom-navy text-white py-20 sm:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-kingdom-gold font-semibold text-sm sm:text-base tracking-widest uppercase mb-4">
            {BRAND.domain}
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4 leading-tight font-serif">
            Kingdom <span className="text-kingdom-gold">Folk</span>
          </h1>
          <p className="text-2xl sm:text-4xl font-semibold mb-6 text-kingdom-gold">
            {BRAND.tagline}
          </p>
          <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            A Christian community for singles, couples, and families — not a dating app.
            Genuine fellowship, stronger covenants, and Kingdom-centered connection.
          </p>
          <p className="text-kingdom-cream font-semibold text-sm sm:text-base mb-4">
            {TRIAL_DAYS}-day free trial · then ${MEMBERSHIP_PRICE}/month
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/join" className="btn-secondary text-lg">
              Join Kingdom Folk — Free Trial
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
            <div id="family" className="card scroll-mt-24">
              <h3 className="font-bold text-kingdom-sage mb-2">Family Side</h3>
              <p className="text-gray-600 text-sm">Households connecting with households.</p>
            </div>
            <div id="couples" className="card scroll-mt-24">
              <h3 className="font-bold text-kingdom-navy mb-2">Couples Corner</h3>
              <p className="text-gray-600 text-sm">Married couples connecting with married couples.</p>
            </div>
            <div id="singles" className="card scroll-mt-24">
              <h3 className="font-bold text-kingdom-plum mb-2">Singles Ministry</h3>
              <p className="text-gray-600 text-sm">Friendship-first connection — no dating pressure.</p>
            </div>
          </div>
          <p className="text-center text-kingdom-navy font-semibold mt-8">
            {TRIAL_DAYS}-day free trial · ${MEMBERSHIP_PRICE}/month · Pick one lane at signup
          </p>
        </div>
      </section>

      <section id="lanes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-kingdom-navy mb-4 font-serif">
            Choose Your Membership Lane
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kingdom Folk is for every season of Kingdom life — families, couples, and singles.
            Same price. You choose the lane that fits you.
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
            What Kingdom Folk Members Can Expect
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {[
              "Genuine Christian fellowship — not a dating marketplace",
              "Events rooted in faith, family, and covenant",
              "Singles Ministry without dating pressure",
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
        <h2 className="text-2xl font-bold text-kingdom-navy mb-4 font-serif">Ready to Join Kingdom Folk?</h2>
        <p className="text-gray-600 mb-8">Create your account, choose your lane, and start your free trial.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/join?lane=singles" className="btn-primary">Singles Ministry</Link>
          <Link href="/join?lane=couples" className="btn-primary">Couples Corner</Link>
          <Link href="/join?lane=family" className="btn-primary">Family Side</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
