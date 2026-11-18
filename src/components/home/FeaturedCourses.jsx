import React, { useState } from 'react';
import { 
  Star, 
  Users, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FeaturedCourses = () => {
  const { 
    courses, 
    setCurrentView, 
    setSelectedCourse, 
    setCourseDetailOpen, 
    initiateEnrollment, 
    isEnrolled,
    setActiveLecturePlayer 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'JEE', 'NEET', 'CUET', 'Class 12', 'Class 11', 'Class 10', 'Class 9'];

  const filteredCourses = activeCategory === 'All'
    ? courses.slice(0, 6)
    : courses.filter(c => c.category === activeCategory || c.classLevel.includes(activeCategory));

  const handleCardClick = (course) => {
    setSelectedCourse(course);
    setCourseDetailOpen(true);
  };

  const handleEnrollClick = (e, course) => {
    e.stopPropagation();
    if (isEnrolled(course.id)) {
      // Open player with first lecture
      const firstChapter = course.chapters[0];
      const firstLecture = firstChapter?.lectures[0];
      setActiveLecturePlayer({
        isOpen: true,
        course,
        chapter: firstChapter,
        lecture: firstLecture
      });
    } else {
      initiateEnrollment(course);
    }
  };

  return (
    <section className="py-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-gold-600 dark:text-gold-400">
              Targeted Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 dark:text-white mt-1">
              Featured Flagship Batches
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              Structured courses crafted by Kota's master educators with complete syllabus coverage, DPPs, and live doubt solving.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('courses');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-gold-600 dark:text-gold-400 hover:text-gold-500 self-start md:self-auto"
          >
            <span>View All {courses.length} Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'gold-gradient-bg text-navy-950 shadow-md shadow-gold-500/20'
                  : 'bg-white dark:bg-navy-850 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-750 hover:border-gold-500/50'
              }`}
            >
              {cat === 'All' ? 'All Batches' : cat}
            </button>
          ))}
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const enrolled = isEnrolled(course.id);
            return (
              <div
                key={course.id}
                onClick={() => handleCardClick(course)}
                className="group rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-800 hover:border-gold-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
              >
                {/* Thumbnail Header */}
                <div className="relative h-48 w-full overflow-hidden bg-navy-950">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"></div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-black rounded-lg gold-gradient-bg text-navy-950 shadow-md">
                      {course.badge || course.category}
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-navy-900/90 text-white border border-white/20 backdrop-blur-md">
                      {course.classLevel}
                    </span>
                  </div>

                  {/* Rating Top Right */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1 border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    <span>{course.rating}</span>
                  </div>

                  {/* Live / Duration tag */}
                  <div className="absolute bottom-3 left-3 text-xs text-white font-medium flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-gold-400" />
                      {course.lecturesCount} Lectures
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base sm:text-lg text-navy-950 dark:text-white group-hover:text-gold-500 transition-colors line-clamp-2">
                      {course.title}
                    </h3>

                    {/* Teacher Mini Bio */}
                    <div className="flex items-center gap-2.5 pt-1">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructorName}
                        className="w-7 h-7 rounded-full object-cover border border-gold-400"
                      />
                      <div className="text-xs">
                        <p className="font-bold text-navy-900 dark:text-slate-200 truncate">{course.instructorName}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{course.instructorRole}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 pt-1 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-navy-950 dark:text-white">
                          ₹{course.price.toLocaleString('en-IN')}
                        </span>
                        {course.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{course.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                        {course.discountPercent}% OFF • EMI from ₹{Math.round(course.price / 3)}/mo
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleEnrollClick(e, course)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-md ${
                        enrolled
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'gold-gradient-bg text-navy-950 hover:brightness-110 active:scale-95'
                      }`}
                    >
                      {enrolled ? (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Continue</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Enroll Now</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
