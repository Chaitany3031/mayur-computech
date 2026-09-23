import React from 'react';
import { INSTITUTE_INFO } from '../../data/instituteData';
import { COURSES_DATA } from '../../data/coursesData';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenEnquiry: (courseTitle?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenEnquiry }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Identity & Govt Status */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-neutral-950 text-lg shadow-md shadow-amber-500/20">
                MC
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">{INSTITUTE_INFO.name}</h3>
                <span className="text-[11px] text-amber-400 font-medium">{INSTITUTE_INFO.legalStatus}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Empowering students in Ghansoli & Navi Mumbai with practical computer skills, government-authorized certifications, and personal 1-on-1 mentorship by Mayur Sir since 2014.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-[11px]">
                Govt Center: {INSTITUTE_INFO.centerCode}
              </span>
              <a
                href={INSTITUTE_INFO.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 text-amber-400 font-medium text-[11px] hover:underline"
              >
                ★ {INSTITUTE_INFO.googleRating} Google Rated
              </a>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <a
                href={INSTITUTE_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-red-500/50 flex items-center justify-center text-neutral-300 hover:text-red-400 transition-colors"
                title="YouTube"
              >
                ▶
              </a>
              <a
                href={INSTITUTE_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-pink-500/50 flex items-center justify-center text-neutral-300 hover:text-pink-400 transition-colors"
                title="Instagram"
              >
                📷
              </a>
              <a
                href={INSTITUTE_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 flex items-center justify-center text-neutral-300 hover:text-blue-400 transition-colors"
                title="Facebook"
              >
                f
              </a>
              <a
                href={INSTITUTE_INFO.socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-sky-500/50 flex items-center justify-center text-neutral-300 hover:text-sky-400 transition-colors"
                title="Telegram"
              >
                ✈
              </a>
            </div>
          </div>

          {/* Col 2: Courses Links */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Popular Courses</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {COURSES_DATA.slice(0, 8).map((course) => (
                <button
                  key={course.id}
                  onClick={() => onOpenEnquiry(course.title)}
                  className="text-left text-neutral-400 hover:text-amber-400 transition-colors truncate"
                >
                  • {course.title}
                </button>
              ))}
            </div>
            <a href="#courses" className="text-amber-400 hover:underline block pt-1 text-xs">
              View All 12 Courses & Modules →
            </a>
          </div>

          {/* Col 3: Center & Timings */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Institute Location</h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {INSTITUTE_INFO.address}
            </p>
            <div className="text-xs">
              <span className="text-neutral-500 block">Helpline & WhatsApp:</span>
              <a href={`tel:${INSTITUTE_INFO.phone}`} className="text-white font-mono font-bold hover:text-amber-400">
                {INSTITUTE_INFO.phoneDisplay}
              </a>
            </div>
            <div className="text-xs">
              <span className="text-neutral-500 block">Lab Working Timings:</span>
              <span className="text-amber-400 font-medium">{INSTITUTE_INFO.labTimings}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-neutral-900 bg-neutral-950 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} {INSTITUTE_INFO.name}. All Rights Reserved. Center Code: {INSTITUTE_INFO.centerCode}.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>🔒 CMS Console & RBAC Portal</span>
            </button>
            <span>·</span>
            <a href="#privacy" className="hover:text-neutral-300">Privacy Policy</a>
            <span>·</span>
            <a href="#terms" className="hover:text-neutral-300">Terms of Admission</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
