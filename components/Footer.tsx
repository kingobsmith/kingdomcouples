import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-kingdom-navy text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="mb-2 text-lg">
          Part of the <span className="text-kingdom-gold font-bold">Kingdom AI Network</span>
        </p>
        <p className="text-sm mb-6 text-gray-400">
          A relationship ecosystem — not a dating app. Built for households, couples, and singles.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <Link href="/guidelines" className="hover:text-white transition">
            Community Guidelines
          </Link>
          <Link href="/learn-more" className="hover:text-white transition">
            About KingdomCouples
          </Link>
          <a href="https://robbinhoodent.com" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">
            Robbin&apos; Hood Ent
          </a>
          <a href="https://thewisemen.co" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">
            The Wise Men
          </a>
          <a href="https://virtuouswomen.co" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">
            Women of Virtue
          </a>
        </div>
        <p className="text-sm text-gray-500">&copy; 2026 KingdomCouples.co. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
