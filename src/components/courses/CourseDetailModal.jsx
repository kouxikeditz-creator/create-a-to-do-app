import React from 'react';
import { 
  X, 
  Star, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  FileText, 
  Award, 
  ShieldCheck,
  ChevronRight,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CourseDetailModal = () => {
  const { 
    selectedCourse, 
    setSelectedCourse, 
    courseDetailOpen, 
    setCourseDetailOpen,
    isEnrolled,
    initiateEnrollment,
    setActiveLecturePlayer
  } = useApp();

  if (!courseDetailOpen || !selectedCourse) return null;

  const enrolled = isEnrolled(selectedCourse.id);

  const handleStartLecture = (chapter, lecture) => {
    if (!enrolled && !lecture.isFree) {
      alert('This is a premium lecture. Please enroll in the course to unlock full access.');
      return;
    }
    setCourseDetailOpen(false);
    setActiveLecturePlayer({
      isOpen: true,
      course: selectedCourse,
      chapter,
      lecture
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-navy-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-750 flex flex-col overflow-hidden my-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setCourseDetailOpen(false)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Area */}
        <div className="overflow-y-auto flex-1">
          
          {/* Hero Header */}
          <div className="relative h-64 sm:h-72 w-full bg-navy-950">
            <img
              src={selectedCourse.thumbnail}
              alt={selectedCourse.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-navy-900 via-navy-950/60 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-black rounded-lg gold-gradient-bg text-navy-950">
                  {selectedCourse.category}
                </span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-navy-800/90 text-white border border-white/20">
                  {selectedCourse.classLevel}
                </span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-600/90 text-white">
                  {selectedCourse.language}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white leading-tight">
                {selectedCourse.title}
              </h2>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold">Course Rating</span>
                <div className="flex items-center gap-1 mt-0.5 font-bold text-navy-900 dark:text-white text-sm">
                  <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                  <span>{selectedCourse.rating} ({selectedCourse.reviewsCount} reviews)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold">Duration</span>
                <span className="font-bold text-navy-900 dark:text-white text-sm mt-0.5 block">
                  {selectedCourse.duration}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold">Total Lectures</span>
                <span className="font-bold text-navy-900 dark:text-white text-sm mt-0.5 block">
                  {selectedCourse.lecturesCount} Video Classes
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold">Mock Tests</span>
                <span className="font-bold text-navy-900 dark:text-white text-sm mt-0.5 block">
                  {selectedCourse.testsCount} Full CBT Tests
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-bold text-navy-950 dark:text-white mb-2">About This Batch</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedCourse.description}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-bold text-navy-950 dark:text-white mb-3">What You Will Get</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedCourse.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Teacher Details */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <img
                  src={selectedCourse.instructorAvatar}
                  alt={selectedCourse.instructorName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-gold-500"
                />
                <div>
                  <h4 className="font-extrabold text-base text-navy-950 dark:text-white">
                    {selectedCourse.instructorName}
                  </h4>
                  <p className="text-xs text-gold-600 dark:text-gold-400 font-bold">
                    {selectedCourse.instructorRole}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    15+ Years Kota & IITian Faculty • 50,000+ Students Mentored
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Curriculum Syllabus */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-navy-950 dark:text-white">
                  Curriculum & Lectures ({selectedCourse.chapters.length} Modules)
                </h3>
                <span className="text-xs text-gold-600 dark:text-gold-400 font-bold">
                  Demo lectures unlocked
                </span>
              </div>

              <div className="space-y-4">
                {selectedCourse.chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="rounded-2xl border border-slate-200 dark:border-navy-750 overflow-hidden"
                  >
                    <div className="bg-slate-100 dark:bg-navy-850 px-4 py-3 font-bold text-xs sm:text-sm text-navy-950 dark:text-white flex items-center justify-between">
                      <span>{chapter.title}</span>
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                        {chapter.lectures.length} Lectures
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-navy-800 bg-white dark:bg-navy-900">
                      {chapter.lectures.map((lec) => {
                        const canPlay = enrolled || lec.isFree;
                        return (
                          <div
                            key={lec.id}
                            onClick={() => handleStartLecture(chapter, lec)}
                            className={`p-3.5 flex items-center justify-between gap-3 text-xs sm:text-sm transition-colors cursor-pointer ${
                              canPlay
                                ? 'hover:bg-gold-500/10 text-navy-900 dark:text-slate-200'
                                : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-navy-850'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {canPlay ? (
                                <div className="w-8 h-8 rounded-lg bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0">
                                  <Play className="w-4 h-4 fill-current" />
                                </div>
                              ) : (
                                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-navy-800 text-slate-400 flex items-center justify-center shrink-0">
                                  <Lock className="w-4 h-4" />
                                </div>
                              )}
                              <div>
                                <p className="font-semibold">{lec.title}</p>
                                <span className="text-[11px] text-slate-400">{lec.duration}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {lec.isFree && (
                                <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                                  Free Preview
                                </span>
                              )}
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-navy-950 border-t border-slate-200 dark:border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-navy-950 dark:text-white">
                ₹{selectedCourse.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-slate-400 line-through">
                ₹{selectedCourse.originalPrice?.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              {selectedCourse.discountPercent}% Discount Applied • 100% Money-Back Guarantee
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {enrolled ? (
              <button
                onClick={() => {
                  setCourseDetailOpen(false);
                  const firstChapter = selectedCourse.chapters[0];
                  const firstLecture = firstChapter?.lectures[0];
                  setActiveLecturePlayer({
                    isOpen: true,
                    course: selectedCourse,
                    chapter: firstChapter,
                    lecture: firstLecture
                  });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 flex items-center justify-center gap-2 shadow-lg"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Continue Course</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setCourseDetailOpen(false);
                  initiateEnrollment(selectedCourse);
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl gold-gradient-bg text-navy-950 font-extrabold text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-gold-500/25 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enroll in Batch</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
