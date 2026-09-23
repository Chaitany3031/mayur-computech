import React from 'react';
import { Course } from '../../types';

interface SyllabusModalProps {
  course: Course | null;
  onClose: () => void;
  onEnquire: (courseTitle: string) => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({
  course,
  onClose,
  onEnquire,
}) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 text-lg"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="pr-8 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-800 text-neutral-300 border border-neutral-700/60">
              {course.badge}
            </span>
            <span className="text-xs font-mono text-amber-400 font-semibold">
              ⏱ {course.duration}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight">{course.title}</h2>
          <p className="text-xs font-medium text-amber-400 mt-1">{course.tagline}</p>
          <p className="text-xs text-neutral-300 mt-2 leading-relaxed">{course.description}</p>
        </div>

        {/* Career Prospects */}
        <div className="mb-6 p-3.5 bg-neutral-950/70 border border-neutral-800 rounded-xl">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            Career Opportunities & Roles
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {course.careerProspects.map((career, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-200"
              >
                💼 {career}
              </span>
            ))}
          </div>
        </div>

        {/* Syllabus Modules */}
        <div className="space-y-4 mb-8 max-h-[380px] overflow-y-auto pr-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Curriculum Breakdown ({course.syllabus.length} Modules)
          </h4>

          {course.syllabus.map((mod) => (
            <div
              key={mod.moduleNumber}
              className="bg-neutral-950 border border-neutral-800 rounded-xl p-4"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-6 h-6 rounded-md bg-amber-400/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-amber-400/30">
                  {mod.moduleNumber}
                </span>
                <h5 className="text-sm font-bold text-white">{mod.title}</h5>
              </div>

              <div className="grid sm:grid-cols-2 gap-1.5 pl-8">
                {mod.topics.map((topic, tidx) => (
                  <div key={tidx} className="flex items-center gap-2 text-xs text-neutral-300">
                    <span className="text-amber-400/70 text-[10px]">▸</span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onEnquire(course.title);
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            Enquire for {course.title}
          </button>
        </div>
      </div>
    </div>
  );
};
