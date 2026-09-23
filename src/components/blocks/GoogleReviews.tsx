import React from 'react';
import { INSTITUTE_INFO, TESTIMONIALS_DATA } from '../../data/instituteData';

export const GoogleReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#07080b] border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Real Student Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified Google Business Reviews
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Genuine feedback and career success stories shared by our students on our official Google Business Profile.
          </p>
        </div>

        {/* Google Reviews Banner */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center p-3 shadow-md shrink-0">
              <svg className="w-full h-full" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            </div>
            <div>
              <div className="text-base font-bold text-white">{INSTITUTE_INFO.name}</div>
              <div className="text-xs text-neutral-400">
                Govt. Authorised Center ({INSTITUTE_INFO.centerCode}) · Sector 5, Ghansoli
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-amber-400 font-bold text-lg font-mono">4.9</span>
                <span className="text-amber-400 text-sm">★★★★★</span>
                <span className="text-xs text-neutral-400 font-medium">({INSTITUTE_INFO.totalReviews} Reviews)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={INSTITUTE_INFO.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none text-center px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors shadow-sm"
            >
              ✍️ Write a Google Review
            </a>
            <a
              href={INSTITUTE_INFO.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none text-center px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs border border-neutral-700 transition-colors"
            >
              View Google Profile ↗
            </a>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                {/* Header with avatar & Google badge */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shadow"
                      style={{ backgroundColor: t.bgColor }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{t.name}</span>
                        <span className="text-emerald-400 text-xs" title="Verified Reviewer">✓</span>
                      </div>
                      <div className="text-[11px] text-neutral-400">{t.timeAgo}</div>
                    </div>
                  </div>

                  <div className="text-amber-400 text-sm">★★★★★</div>
                </div>

                {/* Course Pill */}
                <div className="inline-block px-2.5 py-0.5 rounded bg-neutral-800/80 border border-neutral-700/60 text-[11px] font-medium text-amber-300 mb-3">
                  {t.course}
                </div>

                {/* Review Text */}
                <p className="text-xs text-neutral-300 leading-relaxed italic">
                  "{t.reviewText}"
                </p>
              </div>

              {/* Outcome Badge */}
              <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-medium">✓ {t.badge}</span>
                <span className="text-neutral-500 font-mono">Google Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
