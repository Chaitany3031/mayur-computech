import React, { useState } from 'react';
import { INSTITUTE_INFO } from '../../data/instituteData';
import { AppAuthControls } from '../auth/ClerkWrapper';

interface NavbarProps {
  onOpenEnquiry: (courseTitle?: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Notification / Authority Bar */}
      <div className="bg-neutral-900/90 border-b border-neutral-800 text-[11px] text-neutral-300 py-1.5 px-4 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 font-medium border border-amber-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Govt. Authorised
            </span>
            <span className="hidden sm:inline text-neutral-400">Center Code:</span>
            <span className="font-mono text-neutral-200 font-semibold">{INSTITUTE_INFO.centerCode}</span>
            <span className="hidden md:inline text-neutral-600">·</span>
            <span className="hidden md:inline text-neutral-400">Sector 5, Ghansoli, Navi Mumbai</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={INSTITUTE_INFO.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors font-medium"
            >
              <span>★ {INSTITUTE_INFO.googleRating}</span>
              <span className="text-neutral-400">({INSTITUTE_INFO.totalReviews} Google Reviews)</span>
            </a>
            <span className="text-neutral-600">·</span>
            <a
              href={`tel:${INSTITUTE_INFO.phone}`}
              className="text-neutral-200 hover:text-amber-400 transition-colors font-mono font-medium"
            >
              📞 {INSTITUTE_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/80 sticky top-[31px] z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-neutral-950 text-base shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform">
              MC
            </div>
            <div>
              <div className="font-bold text-base text-white tracking-tight flex items-center gap-2">
                <span>{INSTITUTE_INFO.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 font-mono font-normal">
                  v2.5
                </span>
              </div>
              <div className="text-[10px] text-neutral-400 font-medium tracking-wide">
                Govt. Recognized Computer Education
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-neutral-300">
            <a href="#courses" className="hover:text-amber-400 transition-colors">Courses (12)</a>
            <a href="#why-us" className="hover:text-amber-400 transition-colors">Why Choose Us</a>
            <a href="#mentor" className="hover:text-amber-400 transition-colors">Meet Mayur Sir</a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">Google Reviews</a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Center Location</a>
          </nav>

          {/* Actions & Clerk Auth Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenEnquiry()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-semibold transition-all cursor-pointer"
            >
              <span>Quick Admission</span>
            </button>

            {/* Clerk Authentication Controls */}
            <AppAuthControls onOpenAdmin={onOpenAdmin} />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-neutral-900/95 border-b border-neutral-800 px-4 py-4 space-y-3">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-neutral-300">
              <a
                href="#courses"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400 py-1"
              >
                Courses (12)
              </a>
              <a
                href="#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400 py-1"
              >
                Why Choose Us
              </a>
              <a
                href="#mentor"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400 py-1"
              >
                Meet Mayur Sir
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400 py-1"
              >
                Google Reviews (4.9★)
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400 py-1"
              >
                FAQ
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400 py-1"
              >
                Location & Timings
              </a>
            </nav>

            <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full text-center py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-xs"
              >
                Enquire for Admission
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full text-center py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold rounded-lg text-xs"
              >
                Open CMS / RBAC Portal
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
