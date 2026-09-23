import React, { useState } from 'react';
import { ClerkWrapper } from './components/auth/ClerkWrapper';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/blocks/HeroSection';
import { CoursesCatalog } from './components/blocks/CoursesCatalog';
import { WhyChooseUs } from './components/blocks/WhyChooseUs';
import { MentorSpotlight } from './components/blocks/MentorSpotlight';
import { GoogleReviews } from './components/blocks/GoogleReviews';
import { FAQSection } from './components/blocks/FAQSection';
import { ContactSection } from './components/blocks/ContactSection';
import { Footer } from './components/layout/Footer';
import { SyllabusModal } from './components/modals/SyllabusModal';
import { EnquiryModal } from './components/modals/EnquiryModal';
import { AdminPortalModal } from './components/admin/AdminPortalModal';
import { Course } from './types';
import { INSTITUTE_INFO } from './data/instituteData';

export default function App() {
  const [selectedCourseSyllabus, setSelectedCourseSyllabus] = useState<Course | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryDefaultCourse, setEnquiryDefaultCourse] = useState<string | undefined>();
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const handleOpenEnquiry = (courseTitle?: string) => {
    setEnquiryDefaultCourse(courseTitle);
    setEnquiryModalOpen(true);
  };

  const handleScrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ClerkWrapper>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
        {/* Navigation & Header */}
        <Navbar
          onOpenEnquiry={handleOpenEnquiry}
          onOpenAdmin={() => setAdminModalOpen(true)}
        />

        {/* Main Content Body */}
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection
            onExploreCourses={handleScrollToCourses}
            onOpenEnquiry={() => handleOpenEnquiry()}
          />

          {/* 12 Courses Catalog */}
          <CoursesCatalog
            onSelectCourseSyllabus={(course) => setSelectedCourseSyllabus(course)}
            onEnquireCourse={(courseTitle) => handleOpenEnquiry(courseTitle)}
          />

          {/* Why Choose Us Matrix */}
          <WhyChooseUs />

          {/* Mentor Spotlight (Mayur Sir) */}
          <MentorSpotlight
            onOpenEnquiry={() => handleOpenEnquiry()}
          />

          {/* Google Verified 4.9★ Reviews */}
          <GoogleReviews />

          {/* Interactive FAQ Section */}
          <FAQSection />

          {/* Contact, Timings & Quick Admission */}
          <ContactSection
            onSuccessEnquiry={() => {}}
          />
        </main>

        {/* Global Footer */}
        <Footer
          onOpenAdmin={() => setAdminModalOpen(true)}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* Floating WhatsApp Action Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <a
            href={INSTITUTE_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs shadow-2xl shadow-emerald-500/30 hover:scale-105 transition-all"
            title="Chat with Mayur Sir on WhatsApp"
          >
            <span className="text-base">💬</span>
            <span className="hidden sm:inline">WhatsApp Advisor</span>
          </a>
        </div>

        {/* Modals */}
        <SyllabusModal
          course={selectedCourseSyllabus}
          onClose={() => setSelectedCourseSyllabus(null)}
          onEnquire={(title) => handleOpenEnquiry(title)}
        />

        <EnquiryModal
          isOpen={enquiryModalOpen}
          onClose={() => setEnquiryModalOpen(false)}
          defaultCourse={enquiryDefaultCourse}
        />

        <AdminPortalModal
          isOpen={adminModalOpen}
          onClose={() => setAdminModalOpen(false)}
        />
      </div>
    </ClerkWrapper>
  );
}
