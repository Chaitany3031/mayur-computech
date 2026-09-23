import React from 'react';
import { INSTITUTE_INFO } from '../../data/instituteData';

interface HeroSectionProps {
  onExploreCourses: () => void;
  onOpenEnquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreCourses, onOpenEnquiry }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-neutral-800/80 bg-gradient-to-b from-neutral-950 via-[#0a0c10] to-neutral-950">
      {/* Subtle atmospheric glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-24 right-10 w-72 h-72 bg-blue-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Center Code Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-700/80 text-xs text-neutral-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-semibold text-white">Govt. Authorised Center</span>
              <span className="text-neutral-500">|</span>
              <span className="font-mono text-amber-400 font-semibold">Code: {INSTITUTE_INFO.centerCode}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Learn Today.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                Build Tomorrow.
              </span>
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed">
              Step into Ghansoli’s premier computer institute. From Maharashtra State Certified{' '}
              <strong className="text-white font-semibold">MS-CIT & CCTP Typing</strong> to{' '}
              <strong className="text-white font-semibold">Tally Prime GST, Python & Robotics</strong>,
              we deliver 100% practical, hands-on workstations with personal 1-on-1 mentorship by Mayur Sir.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreCourses}
                className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Explore 12 Courses</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <button
                onClick={onOpenEnquiry}
                className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700/80 font-semibold text-sm transition-all hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>Book 2 Free Demo Classes</span>
              </button>

              <a
                href={INSTITUTE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors flex items-center gap-2 text-xs font-semibold"
                title="Chat with Mayur Sir on WhatsApp"
              >
                <span>💬 WhatsApp Advisor</span>
              </a>
            </div>

            {/* Trust Proof Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-neutral-400 border-t border-neutral-800/80">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-sm">✓</span>
                <span>Individual PC per Student</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-sm">✓</span>
                <span>Bilingual (Marathi/Hindi/English)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-sm">✓</span>
                <span>MPSC & Govt Job Valid</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-sm">✓</span>
                <span>0% EMI Fee Options</span>
              </div>
            </div>
          </div>

          {/* Right Column: Google Verified Rating Card & Metric Showcase */}
          <div className="lg:col-span-5 space-y-4">
            {/* Google Rating Hero Card */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                    Official Business Rating
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">Google Verified Profile</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-2 shadow">
                  <svg className="w-full h-full" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-4 py-2">
                <div className="text-5xl font-black text-white font-mono">{INSTITUTE_INFO.googleRating}</div>
                <div>
                  <div className="flex text-amber-400 text-lg">★★★★★</div>
                  <div className="text-xs text-neutral-300 font-medium mt-0.5">
                    Based on <strong>{INSTITUTE_INFO.totalReviews} Verified Student Reviews</strong>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Sector 5, Ghansoli</span>
                <a
                  href={INSTITUTE_INFO.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1"
                >
                  <span>Read Reviews</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Metrics 4-Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4">
                <div className="text-2xl font-black text-amber-400 font-mono">{INSTITUTE_INFO.stats.studentsTrained}</div>
                <div className="text-xs font-semibold text-white mt-1">Students Trained</div>
                <div className="text-[11px] text-neutral-400">Since 2014 in Navi Mumbai</div>
              </div>

              <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4">
                <div className="text-2xl font-black text-emerald-400 font-mono">{INSTITUTE_INFO.stats.passRate}</div>
                <div className="text-xs font-semibold text-white mt-1">First-Attempt Pass Rate</div>
                <div className="text-[11px] text-neutral-400">In Govt. MS-CIT & Typing</div>
              </div>

              <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4">
                <div className="text-2xl font-black text-blue-400 font-mono">{INSTITUTE_INFO.stats.experienceYears}</div>
                <div className="text-xs font-semibold text-white mt-1">Years Mentorship</div>
                <div className="text-[11px] text-neutral-400">Directly guided by Mayur Sir</div>
              </div>

              <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4">
                <div className="text-2xl font-black text-purple-400 font-mono">7:30 - 21:30</div>
                <div className="text-xs font-semibold text-white mt-1">Lab Open Daily</div>
                <div className="text-[11px] text-neutral-400">Flexible 1-hr & 2-hr batches</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
