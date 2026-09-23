import React from 'react';
import { INSTITUTE_INFO } from '../../data/instituteData';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: '💡',
      title: 'Concept Clarity & Bilingual Teaching',
      desc: 'Step-by-step fundamental clarity taught in your preferred language—Marathi, Hindi, or English. No student is left behind.',
    },
    {
      icon: '⌨️',
      title: '100% Hands-on Lab Workstations',
      desc: 'Dedicated individual computer for every student with unrestricted lab practice hours and live troubleshooting.',
    },
    {
      icon: '📊',
      title: 'Real-World Case Studies',
      desc: 'Work on actual GST filing invoices, financial spreadsheets, AI robotics sensor wiring, and live-deployed web portfolios.',
    },
    {
      icon: '👨‍🏫',
      title: 'Direct Mentorship by Mayur Sir',
      desc: 'Direct 1-on-1 attention from Mayur Sir (13+ years teaching experience). Regular doubt clearing sessions with zero rush.',
    },
    {
      icon: '📜',
      title: 'Govt. Valid State Certification',
      desc: `Authorised center (Code: ${INSTITUTE_INFO.centerCode}). All MS-CIT and CCTP typing certificates are 100% valid for government recruitment & private firms.`,
    },
    {
      icon: '🕒',
      title: 'Flexible Batches: 7:30 AM to 9:30 PM',
      desc: 'Morning, afternoon, and evening batches with 0% interest monthly installment (EMI) fee plans to fit every student and parent budget.',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-[#08090d] border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Why Mayur Computech
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Real-World Competence
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            We focus on practical, hands-on lab sessions to ensure every student gains real technical confidence before stepping into interviews or exams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 rounded-2xl p-6 transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
