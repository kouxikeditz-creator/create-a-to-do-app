import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Play, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CoursesView = () => {
  const { 
    courses, 
    setSelectedCourse, 
    setCourseDetailOpen, 
    initiateEnrollment, 
    isEnrolled,
    setActiveLecturePlayer,
    searchQuery,
    setSearchQuery 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const categories = ['All', 'JEE', 'NEET', 'CUET', 'Class 12', 'Class 11', 'Class 10', 'Class 9'];
  const subjects = ['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'Science'];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = !searchQuery || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || 
      c.category === selectedCategory || 
      c.classLevel.includes(selectedCategory);

    const matchesSubject = selectedSubject === 'All' ||
      c.subjects.some(s => s.toLowerCase().includes(selectedSubject.toLowerCase()));

    return matchesSearch && matchesCategory && matchesSubject;
  });

  const handleCardClick = (course) => {
    setSelectedCourse(course);
    setCourseDetailOpen(true);
  };

  const handleEnrollClick = (e, course) => {
    e.stopPropagation();
    if (isEnrolled(course.id)) {
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
    <div className="py-8 space-y-8 animate-in fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-gold-600 dark:text-gold-400">
          Academic Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-950 dark:text-white">
          All Courses & Batches ({courses.length})
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Comprehensive preparation programs for JEE Main & Advanced, NEET-UG, CUET, and School Board Examinations (Classes 9, 10, 11, and 12).
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course title, topic, or instructor name..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-sm text-navy-950 dark:text-white focus:outline-none focus:border-gold-500 font-semibold"
          />
        </div>

        {/* Category Pills */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-500 block">Exam / Class Level:</span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'gold-gradient-bg text-navy-950 shadow-md shadow-gold-500/20'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All Exams' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-500 block">Subject Filter:</span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {subjects.map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedSubject === subj
                    ? 'bg-navy-900 dark:bg-white text-white dark:text-navy-950'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Courses Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-navy-800 p-8 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-navy-950 dark:text-white">No courses match your filter</h3>
          <p className="text-xs text-slate-500">Try adjusting your search keywords or resetting the exam filter.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedSubject('All'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl gold-gradient-bg text-navy-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const enrolled = isEnrolled(course.id);
            return (
              <div
                key={course.id}
                onClick={() => handleCardClick(course)}
                className="group rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-800 hover:border-gold-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-navy-950">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"></div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-black rounded-lg gold-gradient-bg text-navy-950">
                      {course.category}
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-navy-900/90 text-white border border-white/20">
                      {course.classLevel}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    <span>{course.rating}</span>
                  </div>

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

                {/* Body */}
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
                        {course.discountPercent}% OFF • EMI Available
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
      )}

    </div>
  );
};
