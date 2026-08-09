import Link from "next/link";
import { Lane, LANE_INFO, MEMBERSHIP_PRICE, TRIAL_DAYS } from "@/lib/types";

const icons: Record<string, React.ReactNode> = {
  home: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  heart: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  people: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

export default function LaneCard({ lane }: { lane: Lane }) {
  const info = LANE_INFO[lane];

  return (
    <div className={`card border-t-4 ${info.borderColor} hover:-translate-y-1 transition-transform duration-300`}>
      <div className={`${info.bgLight} w-16 h-16 rounded-full flex items-center justify-center mb-6 ${info.textColor}`}>
        {icons[info.icon]}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{info.title}</h3>
      <p className="text-sm font-semibold text-gray-500 mb-3">{info.subtitle}</p>
      <p className="text-gray-600 mb-4 leading-relaxed">{info.description}</p>
      <p className="text-kingdom-navy font-bold mb-1">{TRIAL_DAYS}-day free trial</p>
      <p className="text-gray-500 text-sm mb-4">then ${MEMBERSHIP_PRICE}/month</p>
      <Link
        href={`/join?lane=${lane}`}
        className={`inline-flex items-center justify-center w-full font-bold py-3 rounded-full ${info.bgLight} ${info.textColor} hover:opacity-80 transition`}
      >
        {info.membershipLabel}
      </Link>
    </div>
  );
}
