import Link from "next/link";
import { BRAND } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="bg-kingdom-navy text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-2xl font-bold font-serif mb-1">
          <span className="text-kingdom-cream">Kingdom </span>
          <span className="text-kingdom-gold">Folk</span>
        </p>
        <p className="text-sm text-kingdom-gold mb-2">{BRAND.tagline}</p>
        <p className="text-sm mb-6 text-gray-400 max-w-xl mx-auto">
          A Christian community for singles, couples, and families — not a dating app.
          One membership, three lanes, Kingdom-centered connection.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
          <a href="/#family" className="hover:text-white transition">Family Side</a>
          <a href="/#couples" className="hover:text-white transition">Couples Corner</a>
          <a href="/#singles" className="hover:text-white transition">Singles Ministry</a>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <Link href="/guidelines" className="hover:text-white transition">Community Covenant</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
          <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link href="/cancellation" className="hover:text-white transition">Cancellation</Link>
          <Link href="/learn-more" className="hover:text-white transition">About</Link>
          <a href={`mailto:${BRAND.supportEmail}`} className="hover:text-white transition">{BRAND.supportEmail}</a>
        </div>
        <p className="text-sm text-gray-500">&copy; 2026 {BRAND.name}. {BRAND.domain}</p>
      </div>
    </footer>
  );
}
