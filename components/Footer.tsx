import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-kingdom-navy text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="mb-2 text-lg">
          <span className="text-kingdom-gold font-bold">Kingdom Folk</span> — kingdomfolk.co
        </p>
        <p className="text-sm mb-6 text-gray-400">
          A paid Christian community for singles, couples, and families. Not a dating app.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <Link href="/guidelines" className="hover:text-white transition">Community Covenant</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
          <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link href="/cancellation" className="hover:text-white transition">Cancellation & Refunds</Link>
          <Link href="/learn-more" className="hover:text-white transition">About</Link>
        </div>
        <p className="text-sm text-gray-500">&copy; 2026 Kingdom Folk. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
