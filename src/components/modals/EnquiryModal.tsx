import React, { useState, useEffect } from 'react';
import { COURSES_DATA } from '../../data/coursesData';
import { INSTITUTE_INFO } from '../../data/instituteData';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultCourse,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(defaultCourse || COURSES_DATA[0].title);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (defaultCourse) {
      setCourse(defaultCourse);
    }
  }, [defaultCourse]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Save lead in localStorage
    const existingLeads = JSON.parse(localStorage.getItem('mc_leads') || '[]');
    const newLead = {
      id: Date.now().toString(),
      fullName: name,
      phone,
      course,
      message,
      status: 'new',
      date: new Date().toISOString(),
    };
    localStorage.setItem('mc_leads', JSON.stringify([newLead, ...existingLeads]));

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800"
        >
          ✕
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center text-2xl mx-auto">
              ✓
            </div>
            <h3 className="text-xl font-bold text-white">Application Received!</h3>
            <p className="text-xs text-neutral-300">
              Thank you <strong>{name}</strong>! Your request for <strong>{course}</strong> has been logged.
              Mayur Sir will call you at <span className="font-mono text-amber-400">{phone}</span> to schedule your batch.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/918655050595?text=Hello%20Mayur%20Sir%2C%20I%20am%20${encodeURIComponent(name)}%2C%20enquiring%20about%20${encodeURIComponent(course)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs shadow-md transition-colors"
              >
                Open WhatsApp with Mayur Sir
              </a>
            </div>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Admission Enquiry & 2 Free Demo Classes
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Book Your Free Trial</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Shinde"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98200XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Course of Interest
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {COURSES_DATA.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title} ({c.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Batch Preference / Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Morning 8am / Weekend / Evening"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 transition-all cursor-pointer mt-2"
              >
                Confirm Admission Trial Request
              </button>

              <div className="text-center pt-2">
                <span className="text-[11px] text-neutral-500">
                  Center Helpline: <strong className="text-neutral-300 font-mono">{INSTITUTE_INFO.phoneDisplay}</strong>
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
