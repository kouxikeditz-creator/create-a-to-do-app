import React from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Flame, 
  Play, 
  Download, 
  HelpCircle, 
  ArrowRight, 
  Star,
  Sparkles,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export const StudentDashboard = () => {
  const { user, setIsProfileModalOpen } = useAuth();
  const { 
    courses, 
    enrolledCourses, 
    setCurrentView, 
    setActiveLecturePlayer, 
    liveClasses, 
    setActiveLiveRoom, 
    notes, 
    setActivePdfNote, 
    downloadedNoteIds,
    tests, 
    setActiveCbtTest, 
    testResults, 
    setCurrentTestResult,
    doubts,
    askDoubt
  } = useApp();

  // Find enrolled course objects
  const enrolledList = enrolledCourses.map(e => {
    const courseObj = courses.find(c => c.id === e.courseId);
    return {
      ...e,
      course: courseObj
    };
  }).filter(e => e.course);

  // Active or upcoming live class
  const upcomingLive = liveClasses[0];

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Welcome & Motivational Streak Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-500/30 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-gold-500/20 text-gold-400 border border-gold-500/40">
              <Flame className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
              <span>{user?.streakDays || 14} Days Learning Streak • Top 5% Consistent</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Welcome back, {user?.name || 'Aarav'}! 🎯
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Target: <strong className="text-gold-400">{user?.targetExam || 'JEE Main & Advanced 2025'}</strong>. Consistency beats talent every single day. Complete today's lectures and practice mock tests.
            </p>
          </div>

          <div className="flex items-center gap-3 self-stretch md:self-auto">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-200 border border-navy-700 text-xs font-bold transition-all text-center"
            >
              Edit Profile
            </button>
            <button
              onClick={() => setCurrentView('tests')}
              className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl gold-gradient-bg text-navy-950 font-black text-xs hover:brightness-110 active:scale-95 transition-all shadow-md text-center"
            >
              Take Mock Test
            </button>
          </div>
        </div>
      </div>

      {/* 4 Learning Progress Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Hours Studied</span>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-2xl font-black text-navy-950 dark:text-white">
            {user?.hoursStudied || 86} hrs
          </h3>
          <p className="text-[11px] text-emerald-500 font-bold mt-1">+12 hrs this week</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Batches Enrolled</span>
            <BookOpen className="w-5 h-5 text-gold-500" />
          </div>
          <h3 className="text-2xl font-black text-navy-950 dark:text-white">
            {enrolledList.length} Active
          </h3>
          <p className="text-[11px] text-gold-500 font-bold mt-1">Full Curriculum Unlocked</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Tests Attempted</span>
            <Trophy className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-2xl font-black text-navy-950 dark:text-white">
            {user?.testsTaken || 9} Taken
          </h3>
          <p className="text-[11px] text-purple-400 font-bold mt-1">Avg Score: {user?.avgScore || '84.5%'}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Saved Notes</span>
            <FileText className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-black text-navy-950 dark:text-white">
            {downloadedNoteIds.length} Saved
          </h3>
          <p className="text-[11px] text-emerald-500 font-bold mt-1">Offline Access Ready</p>
        </div>
      </div>

      {/* Grid: Enrolled Courses & Upcoming Live Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Enrolled Courses Progress (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-navy-950 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gold-500" />
              My Enrolled Batches
            </h2>
            <button
              onClick={() => setCurrentView('courses')}
              className="text-xs font-bold text-gold-600 dark:text-gold-400 hover:underline"
            >
              Browse More
            </button>
          </div>

          <div className="space-y-4">
            {enrolledList.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-center space-y-3">
                <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="font-bold text-base text-navy-950 dark:text-white">No courses enrolled yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Explore our flagship JEE, NEET, CUET, or Class 9-12 batches and begin learning today.
                </p>
                <button
                  onClick={() => setCurrentView('courses')}
                  className="px-5 py-2.5 rounded-xl gold-gradient-bg text-navy-950 font-bold text-xs"
                >
                  Explore Courses
                </button>
              </div>
            ) : (
              enrolledList.map(({ course, progress, completedLectures }) => {
                const firstChapter = course.chapters[0];
                const firstLecture = firstChapter?.lectures[0];

                return (
                  <div
                    key={course.id}
                    className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm hover:border-gold-500/40 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-navy-700"
                        />
                        <div>
                          <span className="text-[10px] font-black uppercase text-gold-600 dark:text-gold-400">
                            {course.category} • {course.classLevel}
                          </span>
                          <h3 className="font-bold text-sm sm:text-base text-navy-950 dark:text-white line-clamp-1">
                            {course.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Mentor: {course.instructorName}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setActiveLecturePlayer({
                            isOpen: true,
                            course,
                            chapter: firstChapter,
                            lecture: firstLecture
                          });
                        }}
                        className="px-4 py-2.5 rounded-xl gold-gradient-bg text-navy-950 font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md shrink-0"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Continue Learning</span>
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-navy-800">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-500 dark:text-slate-400">Course Progress</span>
                        <span className="text-gold-600 dark:text-gold-400 font-extrabold">{progress}% Completed</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-navy-800 overflow-hidden">
                        <div
                          style={{ width: `${progress}%` }}
                          className="h-full rounded-full gold-gradient-bg transition-all duration-500"
                        ></div>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {completedLectures?.length || 0} lectures watched • Next: {firstLecture?.title || 'Lecture 1'}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right 4 Cols: Upcoming Live Class & Scheduled Tests */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Upcoming Live Class Widget */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-navy-950 dark:text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-red-500" />
                Live Class Station
              </h3>
              {upcomingLive?.isLive && (
                <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-red-600 text-white animate-pulse">
                  LIVE NOW
                </span>
              )}
            </div>

            {upcomingLive && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 space-y-2">
                  <span className="text-[10px] font-bold text-gold-600 dark:text-gold-400 block uppercase">
                    {upcomingLive.subject} • {upcomingLive.time}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-navy-950 dark:text-white line-clamp-2">
                    {upcomingLive.title}
                  </h4>
                  <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
                    <img
                      src={upcomingLive.instructorAvatar}
                      alt={upcomingLive.instructor}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>{upcomingLive.instructor}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveLiveRoom(upcomingLive)}
                  className="w-full py-2.5 rounded-xl gold-gradient-bg text-navy-950 font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Live Classroom</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick CBT Test CTA */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-navy-900 to-navy-950 border border-navy-750 text-white shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-gold-400" />
                Next Mock Exam
              </h3>
              <span className="text-[10px] text-slate-400">All-India</span>
            </div>

            <p className="text-xs text-slate-300">
              JEE Main Full Mock Test 01 is scheduled. Test your speed, accuracy, and negative marking control.
            </p>

            <button
              onClick={() => {
                if (tests[0]) setActiveCbtTest(tests[0]);
              }}
              className="w-full py-2.5 rounded-xl bg-white text-navy-950 font-bold text-xs hover:bg-slate-100 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Launch NTA CBT Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Grid: Saved Notes & Doubt Clinic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Saved Notes Quick Access */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm sm:text-base text-navy-950 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-gold-500" />
              Downloaded Study Materials & PYQs
            </h3>
            <button
              onClick={() => setCurrentView('notes')}
              className="text-xs font-bold text-gold-600 dark:text-gold-400 hover:underline"
            >
              All Notes
            </button>
          </div>

          <div className="space-y-2.5">
            {notes.slice(0, 3).map((note) => (
              <div
                key={note.id}
                onClick={() => setActivePdfNote(note)}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 hover:bg-slate-100 dark:hover:bg-navy-800 border border-slate-200 dark:border-navy-750 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3 truncate pr-2">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/15 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-xs shrink-0">
                    PDF
                  </div>
                  <div className="truncate">
                    <h4 className="font-bold text-xs text-navy-950 dark:text-white truncate">{note.title}</h4>
                    <p className="text-[11px] text-slate-500">{note.subject} • {note.pages} Pages</p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePdfNote(note);
                  }}
                  className="p-2 rounded-lg text-slate-400 hover:text-gold-500 transition-colors shrink-0"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Student Doubt Resolution Clinic */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm sm:text-base text-navy-950 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-500" />
              My Doubts & Teacher Solutions
            </h3>
            <span className="text-[11px] text-slate-400">24/7 Response</span>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {doubts.map((d) => (
              <div
                key={d.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gold-600 dark:text-gold-400">{d.subject}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    d.status === 'Answered'
                      ? 'bg-emerald-500/20 text-emerald-500'
                      : 'bg-amber-500/20 text-amber-500'
                  }`}>
                    {d.status}
                  </span>
                </div>
                <p className="font-semibold text-navy-950 dark:text-slate-200">{d.question}</p>
                {d.answer && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 space-y-1">
                    <span className="font-bold block text-[10px]">Answered by {d.answeredBy}:</span>
                    <p className="text-[11px] leading-relaxed">{d.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
