import React from 'react';
import { INSTITUTE_INFO } from '../../data/instituteData';

interface MentorSpotlightProps {
  onOpenEnquiry: () => void;
}

export const MentorSpotlight: React.FC<MentorSpotlightProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="mentor" className="py-20 bg-neutral-950 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-[#101217] border border-neutral-800 rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle gradient orb */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Mentor Visual & Badges */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-1 shadow-2xl shadow-amber-500/10">
                  <div className="w-full h-full rounded-2xl bg-neutral-950 flex flex-col items-center justify-center text-center p-4">
                    <span className="text-4xl mb-1">👨‍🏫</span>
                    <span className="font-extrabold text-white text-base">Mayur Sir</span>
                    <span className="text-[10px] text-amber-400 font-mono">Center Director</span>
                  </div>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-400 text-neutral-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full whitespace-nowrap shadow-md">
                  13+ Years Experience
                </div>
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white">{INSTITUTE_INFO.mentor.name}</h3>
                <p className="text-xs text-amber-400 font-medium mt-0.5">{INSTITUTE_INFO.mentor.role}</p>
                <div className="mt-2 text-[11px] text-neutral-400 font-mono">
                  {INSTITUTE_INFO.mentor.credentials}
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-2 mt-4">
                <a
                  href={INSTITUTE_INFO.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-red-600/30 text-neutral-300 hover:text-red-400 text-xs transition-colors border border-neutral-700"
                  title="YouTube Channel"
                >
                  YouTube
                </a>
                <a
                  href={INSTITUTE_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-pink-600/30 text-neutral-300 hover:text-pink-400 text-xs transition-colors border border-neutral-700"
                  title="Instagram"
                >
                  Instagram
                </a>
                <a
                  href={INSTITUTE_INFO.socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-sky-600/30 text-neutral-300 hover:text-sky-400 text-xs transition-colors border border-neutral-700"
                  title="Telegram Channel"
                >
                  Telegram
                </a>
              </div>
            </div>

            {/* Right: Mentor Story & Direct Communication */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Direct Mentorship, Zero Intermediaries
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                "Real learning begins when a student gets hands-on practice with patient, step-by-step guidance."
              </h2>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                {INSTITUTE_INFO.mentor.bio}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-neutral-950/60 border border-neutral-800/90 rounded-xl p-3.5">
                  <div className="text-white font-semibold text-xs flex items-center gap-2">
                    <span className="text-amber-400">✓</span>
                    <span>1-on-1 Personalized Attention</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    No mass lectures. Mayur Sir reviews each student's exercises on their computer workstation.
                  </p>
                </div>

                <div className="bg-neutral-950/60 border border-neutral-800/90 rounded-xl p-3.5">
                  <div className="text-white font-semibold text-xs flex items-center gap-2">
                    <span className="text-amber-400">✓</span>
                    <span>Direct Career Consultation</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Free guidance on MPSC eligibility, typing GCC-TBC speed rules, or resume preparation.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${INSTITUTE_INFO.phone}`}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>📞 Call Mayur Sir: {INSTITUTE_INFO.phoneDisplay}</span>
                </a>

                <button
                  onClick={onOpenEnquiry}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Request a Callback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
