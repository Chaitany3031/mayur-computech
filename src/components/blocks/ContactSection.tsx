import React, { useState } from 'react';
import { INSTITUTE_INFO } from '../../data/instituteData';
import { COURSES_DATA } from '../../data/coursesData';

interface ContactSectionProps {
  onSuccessEnquiry?: (name: string, course: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSuccessEnquiry }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: COURSES_DATA[0].title,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    // Save lead in localStorage CRM for CMS admin demonstration
    const existingLeads = JSON.parse(localStorage.getItem('mc_leads') || '[]');
    const newLead = {
      id: Date.now().toString(),
      fullName: formData.name,
      phone: formData.phone,
      course: formData.course,
      message: formData.message,
      status: 'new',
      date: new Date().toISOString(),
    };
    localStorage.setItem('mc_leads', JSON.stringify([newLead, ...existingLeads]));

    setSubmitted(true);
    if (onSuccessEnquiry) {
      onSuccessEnquiry(formData.name, formData.course);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#06070a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left: Contact Info & Address */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Visit Our Center
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Start Your Journey Today
              </h2>
              <p className="text-neutral-400 text-sm mt-2">
                Have questions about the syllabus, batch timings, or fee structure? Visit our center or reach out directly.
              </p>
            </div>

            <div className="space-y-4">
              {/* Address Card */}
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 text-lg">
                  📍
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Institute Address</h4>
                  <p className="text-sm font-medium text-white mt-0.5 leading-snug">
                    {INSTITUTE_INFO.address}
                  </p>
                  <span className="text-[11px] text-neutral-400 block mt-1">
                    (Opposite Sector 5 market, 5 mins from Ghansoli Railway Station)
                  </span>
                </div>
              </div>

              {/* Helpline Card */}
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 text-lg">
                  📞
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Direct Helpline</h4>
                  <a
                    href={`tel:${INSTITUTE_INFO.phone}`}
                    className="text-base font-bold text-white hover:text-amber-400 transition-colors block mt-0.5 font-mono"
                  >
                    {INSTITUTE_INFO.phoneDisplay}
                  </a>
                  <span className="text-[11px] text-neutral-400 block mt-0.5">
                    Direct line to Mayur Sir for admissions & guidance
                  </span>
                </div>
              </div>

              {/* Lab Hours Card */}
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 text-lg">
                  ⏱
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Lab Working Hours</h4>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {INSTITUTE_INFO.labTimings}
                  </p>
                  <span className="text-[11px] text-neutral-400 block mt-0.5">
                    Open all 7 days with flexible 1-hr & 2-hr slots
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Enquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">Book a Free Demo Session</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Fill in your details and Mayur Sir will connect with you with the syllabus and fee structure.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center text-xl mx-auto">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-white">Thank You, {formData.name}!</h4>
                  <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                    Your inquiry for <strong>{formData.course}</strong> has been received. Mayur Sir will call you shortly at <span className="font-mono text-amber-400">{formData.phone}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', course: COURSES_DATA[0].title, message: '' });
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-white"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abhishek Patil"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98200XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Interested Course Program
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {COURSES_DATA.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title} ({c.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Optional Questions / Batch Preference
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Inquiring for morning batch or demo class..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    Submit Quick Admission Request
                  </button>

                  <div className="text-center">
                    <a
                      href={INSTITUTE_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-400 hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <span>💬 Prefer WhatsApp? Chat directly with Mayur Sir</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
