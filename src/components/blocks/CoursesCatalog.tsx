import React, { useState, useMemo } from 'react';
import { Course, CourseCategory } from '../../types';
import { COURSES_DATA } from '../../data/coursesData';

interface CoursesCatalogProps {
  onSelectCourseSyllabus: (course: Course) => void;
  onEnquireCourse: (courseTitle: string) => void;
}

export const CoursesCatalog: React.FC<CoursesCatalogProps> = ({
  onSelectCourseSyllabus,
  onEnquireCourse,
}) => {
  const [activeCategory, setActiveCategory] = useState<CourseCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchesCategory =
        activeCategory === 'all' || course.category === activeCategory;
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="courses" className="py-20 bg-neutral-950 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Explore Opportunities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Professional Training Programs
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              From foundational computer literacy to advanced software engineering, AI robotics, and certified GST accounting.
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search courses (e.g. Excel, Python, Typing)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-neutral-800/80">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/10'
                : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            All Programs ({COURSES_DATA.length})
          </button>
          <button
            onClick={() => setActiveCategory('beginner')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'beginner'
                ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/10'
                : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            Beginner & Office (4)
          </button>
          <button
            onClick={() => setActiveCategory('tech')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'tech'
                ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/10'
                : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            Programming & Tech (4)
          </button>
          <button
            onClick={() => setActiveCategory('business')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'business'
                ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/10'
                : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            Finance & Business (4)
          </button>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900/40 rounded-2xl border border-neutral-800">
            <p className="text-neutral-400 text-sm">No courses found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-3 text-xs text-amber-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 group relative"
              >
                {/* Popular Pill */}
                {course.popular && (
                  <span className="absolute -top-2.5 right-6 px-2.5 py-0.5 rounded-full bg-amber-400 text-neutral-950 font-black text-[10px] tracking-wider uppercase shadow-md shadow-amber-500/20">
                    High Demand
                  </span>
                )}

                <div>
                  {/* Badge & Duration Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-800 text-neutral-300 border border-neutral-700/60">
                      {course.badge}
                    </span>
                    <span className="text-xs font-mono text-amber-400 font-medium">
                      ⏱ {course.duration}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {course.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs font-medium text-amber-400/90 mt-1 mb-3">
                    {course.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3 mb-4">
                    {course.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-1.5 py-3 border-t border-neutral-800/80 mb-4">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <span className="text-amber-400 text-[10px] mt-0.5">✦</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onSelectCourseSyllabus(course)}
                    className="flex-1 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors cursor-pointer text-center"
                  >
                    View Syllabus ({course.syllabus.length} Modules)
                  </button>

                  <button
                    onClick={() => onEnquireCourse(course.title)}
                    className="py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
