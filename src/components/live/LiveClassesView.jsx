import React, { useState } from 'react';
import { 
  Radio, 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  Play, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Bell
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LiveClassesView = () => {
  const { liveClasses, pastRecordings, setActiveLiveRoom, setActivePdfNote, notes, addNotification } = useApp();
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'recordings'
  const [remindedIds, setRemindedIds] = useState([]);

  const handleRemindMe = (live) => {
    setRemindedIds(prev => [...prev, live.id]);
    addNotification({
      title: `Reminder Set: ${live.title}`,
      message: `You will be alerted 10 minutes prior to class with ${live.instructor}.`,
      type: 'live'
    });
  };

  const currentLive = liveClasses.find(l => l.isLive) || liveClasses[0];

  return (
    <div className="py-8 space-y-8 animate-in fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white animate-pulse">
            <Radio className="w-3.5 h-3.5" />
            <span>2-WAY LIVE BROADCAST</span>
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-950 dark:text-white">
          Live Interactive Classrooms
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Interact face-to-face with Kota's master faculty, participate in live polls, solve high-yield exam problems together, and get instant voice and chat doubt clarification.
        </p>
      </div>

      {/* Featured LIVE NOW Hero Station */}
      {currentLive && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border-2 border-red-500/50 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  STREAMING LIVE NOW
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-navy-800 text-gold-400 text-xs font-bold border border-gold-500/30">
                  {currentLive.targetExam}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-600/30 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  {currentLive.subject}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                {currentLive.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {currentLive.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <img
                    src={currentLive.instructorAvatar}
                    alt={currentLive.instructor}
                    className="w-8 h-8 rounded-full object-cover border border-gold-400"
                  />
                  <span className="font-bold text-white">{currentLive.instructor}</span>
                </div>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <Users className="w-4 h-4" />
                  {(currentLive.attendeesCount || 1420).toLocaleString()} Students in Room
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-3">
              <button
                onClick={() => setActiveLiveRoom(currentLive)}
                className="w-full py-4 rounded-2xl gold-gradient-bg text-navy-950 font-black text-sm sm:text-base hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-gold-500/30 flex items-center justify-center gap-2.5"
              >
                <Radio className="w-5 h-5 text-red-700 animate-pulse" />
                <span>Join Live Classroom</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center">
                Interactive chat, live polls, and hand-raise enabled
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-navy-800 pb-3">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'upcoming'
              ? 'gold-gradient-bg text-navy-950 shadow-md shadow-gold-500/20'
              : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Scheduled Live Classes ({liveClasses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('recordings')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'recordings'
              ? 'gold-gradient-bg text-navy-950 shadow-md shadow-gold-500/20'
              : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Past Class Recordings Library ({pastRecordings.length})</span>
        </button>
      </div>

      {/* TAB 1: SCHEDULE */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveClasses.map((live) => {
              const isReminded = remindedIds.includes(live.id);
              return (
                <div
                  key={live.id}
                  className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-500/40 shadow-sm transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-gold-500/15 text-gold-600 dark:text-gold-400 border border-gold-500/30">
                        {live.subject} • {live.category}
                      </span>
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {live.time}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-navy-950 dark:text-white line-clamp-2">
                      {live.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {live.description}
                    </p>

                    <div className="flex items-center gap-3 pt-2 text-xs">
                      <img
                        src={live.instructorAvatar}
                        alt={live.instructor}
                        className="w-8 h-8 rounded-full object-cover border border-gold-400"
                      />
                      <div>
                        <p className="font-bold text-navy-950 dark:text-white">{live.instructor}</p>
                        <p className="text-[10px] text-slate-400">{live.targetExam}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleRemindMe(live)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isReminded
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>{isReminded ? 'Reminder Set' : 'Set Reminder'}</span>
                    </button>

                    <button
                      onClick={() => setActiveLiveRoom(live)}
                      className="px-4 py-2 rounded-xl gold-gradient-bg text-navy-950 font-bold text-xs hover:brightness-110 active:scale-95 shadow-md flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>{live.isLive ? 'Join Now' : 'Enter Room'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PAST RECORDINGS */}
      {activeTab === 'recordings' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastRecordings.map((rec) => (
              <div
                key={rec.id}
                className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-gold-600 dark:text-gold-400">{rec.subject}</span>
                    <span className="text-slate-400">{rec.date} • {rec.duration}</span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-navy-950 dark:text-white line-clamp-2">
                    {rec.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Faculty: <strong>{rec.instructor}</strong> • {rec.views}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      if (notes[0]) setActivePdfNote(notes[0]);
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download Class Notes</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveLiveRoom({
                        id: rec.id,
                        title: rec.title,
                        subject: rec.subject,
                        instructor: rec.instructor,
                        instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                        roomUrl: rec.videoUrl,
                        attendeesCount: 320,
                        isLive: false
                      });
                    }}
                    className="px-4 py-2 rounded-xl gold-gradient-bg text-navy-950 font-bold text-xs hover:brightness-110 active:scale-95 shadow-md flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Replay</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
