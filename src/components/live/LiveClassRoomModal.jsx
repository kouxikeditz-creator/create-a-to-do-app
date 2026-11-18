import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Hand, 
  Users, 
  Radio, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Smile, 
  Volume2, 
  Award,
  ThumbsUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const LiveClassRoomModal = () => {
  const { activeLiveRoom, setActiveLiveRoom } = useApp();
  const { user } = useAuth();

  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(() => {
    return activeLiveRoom?.chatMessages || [
      { id: '1', sender: 'Sneha Patel', role: 'student', text: 'Good morning sir! Excited for this rotation class.', time: '2m ago' },
      { id: '2', sender: 'Dr. Rajesh Verma', role: 'teacher', text: 'Welcome everyone! Today we are tackling the toughest Rolling with Slipping problems.', time: '1m ago' },
      { id: '3', sender: 'Devansh Tiwari', role: 'student', text: 'Sir will you also cover the impulse angular momentum theorem?', time: 'Just now' }
    ];
  });

  const [handRaised, setHandRaised] = useState(false);
  const [pollVoted, setPollVoted] = useState(null);
  const [pollVotes, setPollVotes] = useState([74, 21, 3, 2]);

  if (!activeLiveRoom) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: 'm-' + Date.now(),
      sender: user?.name || 'Student',
      role: user?.role || 'student',
      text: chatInput,
      time: 'Just now'
    };

    setMessages(prev => [...prev, newMsg]);
    setChatInput('');
  };

  const handleVotePoll = (index) => {
    if (pollVoted !== null) return;
    setPollVoted(index);
    setPollVotes(prev => {
      const next = [...prev];
      next[index] += 1;
      return next;
    });
  };

  const handleRaiseHand = () => {
    setHandRaised(!handRaised);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col overflow-hidden animate-in fade-in">
      
      {/* Top Bar */}
      <div className="h-16 px-4 sm:px-6 bg-navy-950/90 border-b border-navy-800 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveLiveRoom(null)}
            className="p-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-red-600 text-white animate-pulse">
              <Radio className="w-3.5 h-3.5" />
              <span>LIVE</span>
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-white truncate max-w-xs sm:max-w-md">
              {activeLiveRoom.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Attendees Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-900 border border-navy-800 text-xs font-bold text-slate-300">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>{(activeLiveRoom.attendeesCount || 1420).toLocaleString()} Watching</span>
          </div>

          {/* Raise Hand Button */}
          <button
            onClick={handleRaiseHand}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              handRaised
                ? 'bg-amber-500 text-navy-950 shadow-lg shadow-amber-500/20'
                : 'bg-navy-850 hover:bg-navy-800 text-slate-200 border border-navy-700'
            }`}
          >
            <Hand className="w-4 h-4" />
            <span>{handRaised ? 'Hand Raised' : 'Raise Hand'}</span>
          </button>
        </div>
      </div>

      {/* Main Classroom Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Video Stream Area */}
        <div className="flex-1 bg-black flex flex-col justify-center items-center relative overflow-hidden">
          
          <div className="w-full h-full max-h-[70vh] lg:max-h-none flex items-center justify-center relative group">
            <iframe
              src={`${activeLiveRoom.roomUrl}?autoplay=1&mute=0&controls=1&rel=0`}
              title={activeLiveRoom.title}
              className="w-full h-full aspect-video border-0 max-h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* Hand Raised Banner */}
            {handRaised && (
              <div className="absolute top-4 left-4 z-20 px-3.5 py-2 rounded-xl bg-amber-500/90 text-navy-950 backdrop-blur-md text-xs font-black flex items-center gap-2 shadow-lg animate-bounce">
                <Hand className="w-4 h-4" />
                <span>Your hand is raised! {activeLiveRoom.instructor} will address your doubt shortly.</span>
              </div>
            )}
          </div>

          {/* Live Stream Bottom Ticker */}
          <div className="w-full bg-navy-950 px-4 py-3 border-t border-navy-800 text-xs text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gold-400">{activeLiveRoom.instructor}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{activeLiveRoom.subject} Masterclass</span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              HD 1080p 60fps • Low Latency Mode Active
            </span>
          </div>

        </div>

        {/* Right Interactive Sidebar: Chat & Live Poll */}
        <div className="w-full lg:w-96 bg-navy-900 border-l border-navy-800 flex flex-col h-80 lg:h-auto shrink-0">
          
          {/* Live Poll Box at top of sidebar */}
          <div className="p-4 bg-navy-950 border-b border-navy-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-gold-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Live Teacher Poll
              </span>
              <span className="text-[10px] text-slate-400">Question 1/3</span>
            </div>
            <p className="text-xs font-bold text-white mb-2.5">
              Which reaches the bottom first: solid cylinder or hollow sphere?
            </p>
            <div className="space-y-1.5">
              {['Solid Cylinder (I = 1/2 mR²)', 'Hollow Sphere (I = 2/3 mR²)', 'Both at same time', 'Depends on incline angle'].map((opt, i) => (
                <button
                  key={i}
                  disabled={pollVoted !== null}
                  onClick={() => handleVotePoll(i)}
                  className={`w-full p-2 rounded-lg text-xs font-semibold text-left transition-all relative overflow-hidden flex items-center justify-between ${
                    pollVoted === i
                      ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50'
                      : 'bg-navy-850 hover:bg-navy-800 text-slate-200 border border-navy-700'
                  }`}
                >
                  <span className="truncate pr-2">{opt}</span>
                  {pollVoted !== null && (
                    <span className="font-bold text-[10px] text-gold-400">{pollVotes[i]}%</span>
                  )}
                </button>
              ))}
            </div>
            {pollVoted !== null && (
              <p className="text-[10px] text-emerald-400 font-bold mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Vote recorded! Solid cylinder has lesser moment of inertia, hence higher acceleration.
              </p>
            )}
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {messages.map((m) => {
              const isTeacher = m.role === 'teacher';
              const isMe = m.sender === user?.name;
              return (
                <div
                  key={m.id}
                  className={`p-2.5 rounded-xl text-xs leading-relaxed ${
                    isTeacher
                      ? 'bg-gold-500/15 border border-gold-500/40 text-gold-200'
                      : isMe
                      ? 'bg-blue-600/20 border border-blue-500/30 text-white ml-2'
                      : 'bg-navy-850 border border-navy-750 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`font-bold text-[11px] flex items-center gap-1 ${isTeacher ? 'text-gold-400 font-black' : isMe ? 'text-blue-400' : 'text-slate-300'}`}>
                      {m.sender}
                      {isTeacher && (
                        <span className="px-1.5 py-0.2 text-[9px] rounded bg-gold-500 text-navy-950 font-black uppercase">
                          Teacher
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-500">{m.time}</span>
                  </div>
                  <p className="text-xs">{m.text}</p>
                </div>
              );
            })}
          </div>

          {/* Chat Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 bg-navy-950 border-t border-navy-800 flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask a question in live class..."
              className="flex-1 px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-gold-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl gold-gradient-bg text-navy-950 hover:brightness-110 active:scale-95 transition-all shadow-md shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
