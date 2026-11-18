import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  HelpCircle, 
  Plus, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Trophy, 
  Send, 
  Trash2, 
  Sparkles,
  Upload
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export const TeacherDashboard = () => {
  const { user } = useAuth();
  const { 
    courses, 
    liveClasses, 
    setLiveClasses, 
    notes, 
    setNotes, 
    doubts, 
    answerDoubt,
    addNotification 
  } = useApp();

  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'schedule-live' | 'upload-notes' | 'doubts'
  
  // Live Class form
  const [liveTitle, setLiveTitle] = useState('');
  const [liveSubject, setLiveSubject] = useState(user?.subject || 'Physics');
  const [liveTime, setLiveTime] = useState('Tomorrow, 6:00 PM');
  const [liveTarget, setLiveTarget] = useState('JEE Main 2025');
  const [liveScheduledMsg, setLiveScheduledMsg] = useState(false);

  // Upload Note form
  const [noteTitle, setNoteTitle] = useState('');
  const [noteCategory, setNoteCategory] = useState('Formula Sheets');
  const [noteSubject, setNoteSubject] = useState(user?.subject || 'Physics');
  const [noteSnippet, setNoteSnippet] = useState('');
  const [noteUploadedMsg, setNoteUploadedMsg] = useState(false);

  // Answering Doubts
  const [replyText, setReplyText] = useState({});

  const teacherCourses = courses.filter(c => 
    c.instructorName.includes(user?.name?.split(' ')[1] || 'Verma') ||
    c.subjects?.some(s => s.toLowerCase().includes(user?.subject?.toLowerCase() || 'physics'))
  );

  const handleScheduleLiveClass = (e) => {
    e.preventDefault();
    if (!liveTitle.trim()) return;

    const newLive = {
      id: 'live-' + Date.now(),
      title: liveTitle,
      subject: liveSubject,
      category: liveTarget.includes('JEE') ? 'JEE' : liveTarget.includes('NEET') ? 'NEET' : 'Class 12',
      targetExam: liveTarget,
      instructor: user?.name || 'Dr. Rajesh Verma',
      instructorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      date: 'Upcoming',
      time: liveTime,
      scheduledStartTime: '06:00 PM',
      duration: '90 min',
      isLive: false,
      attendeesCount: 0,
      roomUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      description: 'Scheduled interactive live stream masterclass by faculty.'
    };

    setLiveClasses([newLive, ...liveClasses]);
    setLiveTitle('');
    setLiveScheduledMsg(true);
    addNotification({
      title: `New Live Class: ${liveTitle}`,
      message: `${user?.name} has scheduled a session for ${liveTime}`,
      type: 'live'
    });
    setTimeout(() => setLiveScheduledMsg(false), 3000);
  };

  const handleUploadNote = (e) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;

    const newNote = {
      id: 'note-' + Date.now(),
      title: noteTitle,
      category: noteCategory,
      subject: noteSubject,
      classLevel: 'Class 12 & Competitive',
      targetExam: 'JEE & NEET',
      pages: 18,
      fileSize: '4.2 MB',
      author: user?.name || 'Faculty',
      downloads: 1,
      rating: 5.0,
      tags: [noteSubject, 'Faculty Verified'],
      contentSnippet: noteSnippet || 'High-yield study materials and derivation breakdowns prepared for Mission Rank students.'
    };

    setNotes([newNote, ...notes]);
    setNoteTitle('');
    setNoteSnippet('');
    setNoteUploadedMsg(true);
    addNotification({
      title: `Study Material Uploaded: ${noteTitle}`,
      message: `New PDF notes available in ${noteSubject} by ${user?.name}`,
      type: 'notes'
    });
    setTimeout(() => setNoteUploadedMsg(false), 3000);
  };

  const handleSendDoubtAnswer = (doubtId) => {
    const text = replyText[doubtId];
    if (!text?.trim()) return;

    answerDoubt(doubtId, text, user?.name || 'Dr. Rajesh Verma');
    setReplyText(prev => ({ ...prev, [doubtId]: '' }));
    addNotification({
      title: 'Teacher Replied to Your Doubt',
      message: `${user?.name} answered a student doubt in the Doubt Clinic`,
      type: 'info'
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Teacher Profile Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-500/30 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-gold-500 shadow-md"
          />
          <div className="space-y-1 text-center sm:text-left">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-gold-500/20 text-gold-400 border border-gold-500/30">
              Senior Faculty & HOD Panel
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{user?.name}</h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Department of {user?.subject || 'Physics'} • Mentoring 45,000+ Enrolled Students across India
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-navy-800 pb-3 overflow-x-auto">
        {[
          { id: 'courses', label: 'My Assigned Courses', icon: BookOpen },
          { id: 'schedule-live', label: 'Schedule Live Class', icon: Video },
          { id: 'upload-notes', label: 'Upload PDF Notes', icon: FileText },
          { id: 'doubts', label: 'Student Doubt Desk', icon: HelpCircle, badge: doubts.filter(d => d.status !== 'Answered').length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'gold-gradient-bg text-navy-950 shadow-md shadow-gold-500/20'
                : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {tab.badge > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-600 text-white font-extrabold">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: COURSES */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teacherCourses.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-3"
              >
                <img
                  src={c.thumbnail}
                  alt={c.title}
                  className="w-full h-36 rounded-2xl object-cover"
                />
                <span className="text-[10px] font-bold text-gold-600 dark:text-gold-400 uppercase">
                  {c.category} • {c.classLevel}
                </span>
                <h3 className="font-bold text-sm text-navy-950 dark:text-white line-clamp-2">
                  {c.title}
                </h3>
                <div className="pt-2 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-xs text-slate-500">
                  <span>{c.chapters?.length || 3} Chapters</span>
                  <span className="font-bold text-gold-500">{c.studentsEnrolled?.toLocaleString()} Students</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SCHEDULE LIVE CLASS */}
      {activeTab === 'schedule-live' && (
        <div className="max-w-2xl bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-navy-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-black text-navy-950 dark:text-white">
              Schedule New Live Interactive Masterclass
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Broadcasts to all enrolled students with live notifications and countdown alarms.
            </p>
          </div>

          <form onSubmit={handleScheduleLiveClass} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Class Topic / Lecture Title
              </label>
              <input
                type="text"
                required
                value={liveTitle}
                onChange={(e) => setLiveTitle(e.target.value)}
                placeholder="e.g. Thermodynamics: Carnot Cycle & Entropy Numerical Shortcuts"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-semibold focus:outline-none focus:border-gold-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Subject</label>
                <select
                  value={liveSubject}
                  onChange={(e) => setLiveSubject(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-bold"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Exam Batch</label>
                <select
                  value={liveTarget}
                  onChange={(e) => setLiveTarget(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-bold"
                >
                  <option value="JEE Main & Advanced 2025">JEE Main & Advanced</option>
                  <option value="NEET-UG 2025">NEET-UG Medical</option>
                  <option value="CUET UG 2025">CUET UG 2025</option>
                  <option value="Class 12 Boards">Class 12 Boards</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Date & Time Slot</label>
              <input
                type="text"
                value={liveTime}
                onChange={(e) => setLiveTime(e.target.value)}
                placeholder="e.g. Tomorrow, 6:30 PM - 8:00 PM"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-semibold focus:outline-none focus:border-gold-500"
              />
            </div>

            {liveScheduledMsg && (
              <p className="text-emerald-500 font-bold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4" /> Live class scheduled! Students notified.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl gold-gradient-bg text-navy-950 font-black text-sm hover:brightness-110 active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Publish Live Class Schedule</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: UPLOAD NOTES */}
      {activeTab === 'upload-notes' && (
        <div className="max-w-2xl bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-navy-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-black text-navy-950 dark:text-white">
              Upload Study Material or Formula Sheet
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Add chapter revision notes, PYQs, and mind maps directly to the student study library.
            </p>
          </div>

          <form onSubmit={handleUploadNote} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Document Title
              </label>
              <input
                type="text"
                required
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="e.g. Ray Optics & Optical Instruments 1-Page Formula Summary"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-semibold focus:outline-none focus:border-gold-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
                <select
                  value={noteCategory}
                  onChange={(e) => setNoteCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-bold"
                >
                  <option value="Formula Sheets">Formula Sheets</option>
                  <option value="Revision Notes">Revision Notes</option>
                  <option value="Previous Year Papers">Previous Year Papers (PYQ)</option>
                  <option value="Important Questions">Important Questions</option>
                  <option value="Sample Papers">Sample Papers</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Subject</label>
                <select
                  value={noteSubject}
                  onChange={(e) => setNoteSubject(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-bold"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Summary Content & Formulas
              </label>
              <textarea
                rows={4}
                value={noteSnippet}
                onChange={(e) => setNoteSnippet(e.target.value)}
                placeholder="Enter key formulas, notes summary, or solved derivations..."
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-mono text-xs focus:outline-none focus:border-gold-500 resize-none"
              />
            </div>

            {noteUploadedMsg && (
              <p className="text-emerald-500 font-bold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4" /> Study note published to platform!
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl gold-gradient-bg text-navy-950 font-black text-sm hover:brightness-110 active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Publish Note to Study Section</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: STUDENT DOUBT RESOLUTION DESK */}
      {activeTab === 'doubts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-navy-950 dark:text-white">
                Student Doubt Resolution Desk
              </h3>
              <p className="text-xs text-slate-500">
                Answer queries submitted by students during live classes or self-study sessions.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {doubts.map((d) => (
              <div
                key={d.id}
                className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy-950 dark:text-white">{d.studentName}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-gold-600 dark:text-gold-400">{d.subject}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    d.status === 'Answered'
                      ? 'bg-emerald-500/20 text-emerald-500'
                      : 'bg-amber-500/20 text-amber-500'
                  }`}>
                    {d.status}
                  </span>
                </div>

                <p className="font-semibold text-sm text-navy-950 dark:text-slate-100">{d.question}</p>

                {d.answer ? (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200">
                    <strong className="block font-bold mb-1">Your Answer:</strong>
                    <p>{d.answer}</p>
                  </div>
                ) : (
                  <div className="pt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your explanation/solution for the student..."
                      value={replyText[d.id] || ''}
                      onChange={(e) => setReplyText({ ...replyText, [d.id]: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                    />
                    <button
                      onClick={() => handleSendDoubtAnswer(d.id)}
                      className="px-4 py-2 rounded-xl gold-gradient-bg text-navy-950 font-bold text-xs flex items-center gap-1.5 hover:brightness-110 shadow-md shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
