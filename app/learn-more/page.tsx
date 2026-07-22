import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function LearnMorePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-kingdom-navy mb-6 font-serif">About KingdomCouples</h1>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-kingdom-navy mb-3">What Is KingdomCouples?</h2>
            <p>
              KingdomCouples (Kin Folk) is a Christian social platform designed as a relationship ecosystem —
              not a dating app. We serve three distinct lanes: Family Side, Couples Corner, and Singles Ministry,
              each with its own community, needs, and experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-kingdom-navy mb-3">Why Three Lanes?</h2>
            <p>
              Households, married couples, and singles each have different needs. Throwing everyone into one
              generic social feed creates pressure and confusion. KingdomCouples defines audience lanes from
              the start so every member knows exactly where they belong.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-kingdom-navy mb-3">Not a Dating App</h2>
            <p>
              There is no swiping, no hookup energy, and no worldly dating aesthetic. Singles connect as
              friends first. Couples strengthen their covenant together. Families build household-to-household
              networks. Chemistry may decide later — friendship decides now.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-kingdom-navy mb-3">One Kingdom Login</h2>
            <p>
              Your credentials work across the entire Kingdom ecosystem. One account, one identity,
              scalable across all Kingdom platforms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-kingdom-navy mb-3">Family-First Onboarding</h2>
            <p>
              For the Family Side, onboarding starts with the household — not the individual. Parents and
              guardians set up the family account, and each member can have their own login experience within
              the family structure.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/join" className="btn-primary">Join KingdomCouples</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
