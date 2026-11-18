import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  CheckCircle2, 
  Volume2, 
  Maximize2, 
  FileText, 
  MessageSquare, 
  Lock, 
  ChevronRight, 
  Download,
  Send,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const VideoLecturePlayer = () => {
  const { 
    activeLecturePlayer, 
    setActiveLecturePlayer, 
    isEnrolled, 
    markLectureComplete,
    enrolledCourses,
    askDoubt 
  } = useApp();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('curriculum'); // 'curriculum' | 'notes' | 'doubts'
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [doubtText, setDoubtText] = useState('');
  const [doubtSubmitted, setDoubtSubmitted] = useState(false);

  if (!activeLecturePlayer.isOpen || !activeLecturePlayer.course || !activeLecturePlayer.lecture) {
    return null;
  }

  const { course, chapter, lecture } = activeLecturePlayer;
  const enrolled = isEnrolled(course.id);
  const enrolledData = enrolledCourses.find(e => e.courseId === course.id);
  const isLectureCompleted = enrolledData?.completedLectures?.includes(lecture.id);

  const handleSelectLecture = (ch, lec) => {
    if (!enrolled && !lec.isFree) {
      alert('This is a premium lecture. Please enroll in the course to unlock.');
      return;
    }
    setActiveLecturePlayer({
      ...activeLecturePlayer,
      chapter: ch,
      lecture: lec
    });
  };

  const handleMarkComplete = () => {
    markLectureComplete(course.id, lecture.id);
  };

  const handleDoubtSubmit = (e) => {
    e.preventDefault();
    if (!doubtText.trim()) return;
    askDoubt({
      studentName: user?.name || 'Student',
      subject: course.category || 'Physics',
      question: `[Lecture: ${lecture.title}] - ${doubtText}`
    });
    setDoubtText('');
    setDoubtSubmitted(true);
    setTimeout(() => setDoubtSubmitted(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col overflow-hidden animate-in fade-in">
      
      {/* Top Header */}
      <div className="h-16 px-4 sm:px-6 bg-navy-950/90 border-b border-navy-800 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveLecturePlayer({ isOpen: false, course: null, chapter: null, lecture: null })}
            className="p-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[11px] font-bold text-gold-400 block truncate max-w-xs sm:max-w-md">
              {course.title}
            </span>
            <h3 className="text-xs sm:text-sm font-extrabold text-white truncate max-w-xs sm:max-w-md">
              {lecture.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {enrolled && (
            <button
              onClick={handleMarkComplete}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isLectureCompleted
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-gold-500/20 hover:bg-gold-500/30 text-gold-400 border border-gold-500/40'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isLectureCompleted ? 'Completed' : 'Mark Complete'}</span>
            </button>
          )}

          {/* Speed Selector */}
          <div className="hidden sm:flex items-center bg-navy-900 rounded-lg p-1 border border-navy-700 text-xs font-bold">
            {['0.75x', '1x', '1.25x', '1.5x', '2x'].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2 py-0.5 rounded ${playbackSpeed === spd ? 'bg-gold-500 text-navy-950 font-black' : 'text-slate-400 hover:text-white'}`}
              >
                {spd}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Player & Sidebar Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Video Canvas Area */}
        <div className="flex-1 bg-black flex flex-col justify-center items-center relative overflow-hidden">
          
          {/* Simulated Premium Video Player */}
          <div className="w-full h-full max-h-[75vh] lg:max-h-none flex items-center justify-center relative group">
            
            {/* Embedded video player container */}
            <iframe
              src={`${lecture.videoUrl}?autoplay=1&mute=0&controls=1&rel=0`}
              title={lecture.title}
              className="w-full h-full border-0 aspect-video max-h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* Video Watermark Branding */}
            <div className="absolute top-4 left-4 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity">
              <span className="text-xs font-black tracking-widest text-gold-400 uppercase drop-shadow-md">
                MISSION RANK ACADEMY • WATERMARKED
              </span>
            </div>
          </div>

          {/* Quick Playbar / Under-video notes on mobile */}
          <div className="w-full bg-navy-950 px-4 py-3 border-t border-navy-800 text-xs text-slate-400 flex items-center justify-between">
            <span className="truncate">
              Instructor: <strong className="text-white">{course.instructorName}</strong> ({course.category})
            </span>
            <span className="text-gold-400 font-bold shrink-0">
              Playback Speed: {playbackSpeed}
            </span>
          </div>

        </div>

        {/* Right Tabbed Sidebar */}
        <div className="w-full lg:w-96 bg-navy-900 border-l border-navy-800 flex flex-col h-72 lg:h-auto shrink-0">
          
          {/* Tabs */}
          <div className="flex items-center border-b border-navy-800 bg-navy-950">
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
                activeTab === 'curriculum'
                  ? 'border-gold-500 text-gold-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Curriculum
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
                activeTab === 'notes'
                  ? 'border-gold-500 text-gold-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Lecture Notes
            </button>
            <button
              onClick={() => setActiveTab('doubts')}
              className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
                activeTab === 'doubts'
                  ? 'border-gold-500 text-gold-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Ask Doubt
            </button>
          </div>

          {/* Tab 1: Curriculum Lectures */}
          {activeTab === 'curriculum' && (
            <div className="flex-1 overflow-y-auto divide-y divide-navy-800 p-2">
              {course.chapters.map((ch) => (
                <div key={ch.id} className="py-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                    {ch.title}
                  </p>
                  <div className="space-y-1 mt-1">
                    {ch.lectures.map((lec) => {
                      const isCurrent = lec.id === lecture.id;
                      const isDone = enrolledData?.completedLectures?.includes(lec.id);
                      const canPlay = enrolled || lec.isFree;

                      return (
                        <div
                          key={lec.id}
                          onClick={() => handleSelectLecture(ch, lec)}
                          className={`p-2.5 rounded-xl text-xs flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                            isCurrent
                              ? 'bg-gold-500/20 text-gold-400 font-bold border border-gold-500/40'
                              : canPlay
                              ? 'hover:bg-navy-800 text-slate-200'
                              : 'opacity-50 text-slate-500 hover:bg-navy-850'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : canPlay ? (
                              <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                            ) : (
                              <Lock className="w-3.5 h-3.5 shrink-0" />
                            )}
                            <span className="truncate">{lec.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0">{lec.duration}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Lecture Notes */}
          {activeTab === 'notes' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-slate-300">
              <div className="p-3.5 rounded-2xl bg-navy-850 border border-navy-700/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <FileText className="w-4 h-4 text-gold-400" />
                    <span>Official Class Annotations</span>
                  </div>
                  <span className="text-[10px] bg-gold-500/20 text-gold-400 px-2 py-0.5 rounded font-bold">PDF</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  Hand-annotated blackboard notes by {course.instructorName} with all solved derivations.
                </p>
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Hand-annotated PDF notes downloaded to your device!');
                  }}
                  className="w-full py-2 rounded-xl gold-gradient-bg text-navy-950 font-bold flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Notes (4.8 MB)</span>
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-navy-850 border border-navy-700/80 space-y-2">
                <h4 className="font-bold text-white text-xs">Summary Formulas Covered:</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                  <li>Kinematic velocity & acceleration integrals</li>
                  <li>Trajectory vertex coordinates: (u^2 sin 2θ / 2g, u^2 sin^2 θ / 2g)</li>
                  <li>Relative motion in 2D collision conditions</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 3: Ask Doubt in Classroom */}
          {activeTab === 'doubts' && (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <HelpCircle className="w-4 h-4 text-gold-400" />
                  <span>Ask {course.instructorName}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Got stuck at a particular timestamp or formula? Post your query and our faculty will respond in the Doubt Clinic.
                </p>

                {doubtSubmitted && (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Doubt submitted! Check your dashboard for teacher solution.</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleDoubtSubmit} className="mt-4 space-y-2">
                <textarea
                  rows={3}
                  value={doubtText}
                  onChange={(e) => setDoubtText(e.target.value)}
                  placeholder="Type your question or timestamp doubt here..."
                  className="w-full p-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl gold-gradient-bg text-navy-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Question</span>
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
