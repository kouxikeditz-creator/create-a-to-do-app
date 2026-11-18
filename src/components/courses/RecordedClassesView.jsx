import React, { useState } from 'react';
import { 
  Video, 
  Play, 
  CheckCircle2, 
  Clock, 
  Lock, 
  BookOpen, 
  Search, 
  Filter,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RecordedClassesView = () => {
  const { 
    courses, 
    isEnrolled, 
    setActiveLecturePlayer, 
    enrolledCourses, 
    initiateEnrollment 
  } = useApp();

  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedExam, setSelectedExam] = useState('All');
  const [searchWord, setSearchWord] = useState('');

  const subjects = ['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'];
  const exams = ['All', 'JEE', 'NEET', 'CUET', 'Class 12', 'Class 10'];

  // Flatten all lectures with their course and chapter metadata
  const allLectures = [];
  courses.forEach(course => {
    course.chapters.forEach(chapter => {
      chapter.lectures.forEach(lecture => {
        allLectures.push({
          ...lecture,
          course,
          chapter
        });
      });
    });
  });

  const filteredLectures = allLectures.filter(item => {
    const matchesSearch = !searchWord ||
      item.title.toLowerCase().includes(searchWord.toLowerCase()) ||
      item.chapter.title.toLowerCase().includes(searchWord.toLowerCase()) ||
      item.course.title.toLowerCase().includes(searchWord.toLowerCase());

    const matchesExam = selectedExam === 'All' || 
      item.course.category === selectedExam ||
      item.course.classLevel.includes(selectedExam);

    const matchesSubject = selectedSubject === 'All' ||
      item.course.subjects.some(s => s.toLowerCase().includes(selectedSubject.toLowerCase())) ||
      item.chapter.title.toLowerCase().includes(selectedSubject.toLowerCase());

    return matchesSearch && matchesExam && matchesSubject;
  });

  const handleLectureClick = (item) => {
    const enrolled = isEnrolled(item.course.id);
    if (!enrolled && !item.isFree) {
      initiateEnrollment(item.course);
      return;
    }

    setActiveLecturePlayer({
      isOpen: true,
      course: item.course,
      chapter: item.chapter,
      lecture: item
    });
  };

  return (
    <div className="py-8 space-y-8 animate-in fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-gold-600 dark:text-gold-400">
          Video Lecture Archive
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-950 dark:text-white">
          Recorded Classes & Concept Library
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Over 1,480 full-length HD lectures organized chapter-by-chapter. Learn at your own pace with adjustable playback speeds, timestamps, and synchronized lecture notes.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4">
        
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="Search lectures by topic (e.g. Kinematics, Chemical Bonding, Calculus)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-sm text-navy-950 dark:text-white font-semibold focus:outline-none focus:border-gold-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-slate-500">Subject:</span>
            {subjects.map(s => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  selectedSubject === s
                    ? 'gold-gradient-bg text-navy-950 font-black'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-slate-500">Exam:</span>
            {exams.map(e => (
              <button
                key={e}
                onClick={() => setSelectedExam(e)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  selectedExam === e
                    ? 'bg-navy-900 dark:bg-white text-white dark:text-navy-950 font-black'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Lectures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLectures.map((item) => {
          const enrolled = isEnrolled(item.course.id);
          const enrolledData = enrolledCourses.find(e => e.courseId === item.course.id);
          const isDone = enrolledData?.completedLectures?.includes(item.id);
          const canWatch = enrolled || item.isFree;

          return (
            <div
              key={`${item.course.id}-${item.id}`}
              onClick={() => handleLectureClick(item)}
              className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-500/50 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                
                {/* Thumbnail / Header */}
                <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-navy-950">
                  <img
                    src={item.course.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-transparent"></div>

                  {/* Play overlay button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl gold-gradient-bg text-navy-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      {canWatch ? (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      {item.duration}
                    </span>
                    {item.isFree && (
                      <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-emerald-500 text-white shadow">
                        Free Demo
                      </span>
                    )}
                    {isDone && (
                      <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-emerald-600 text-white flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Watched
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gold-600 dark:text-gold-400 block truncate">
                    {item.chapter.title}
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base text-navy-950 dark:text-white mt-1 group-hover:text-gold-500 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                    Course: {item.course.title}
                  </p>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  By {item.course.instructorName.split(' ')[0]}
                </span>
                <span className="font-bold text-gold-600 dark:text-gold-400 flex items-center gap-1">
                  <span>{canWatch ? 'Watch Now' : 'Unlock Access'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
