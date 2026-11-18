import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Award, 
  Users, 
  Star, 
  Search,
  BookOpen,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const HeroSection = () => {
  const { setCurrentView, searchQuery, setSearchQuery } = useApp();
  const { isAuthenticated, openAuthModal } = useAuth();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('courses');
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background radial glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-gold-500/15 via-blue-600/10 to-transparent blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-gold-500/10 rounded-full blur-[90px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Announcement Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 dark:bg-gold-500/20 border border-gold-500/30 text-gold-700 dark:text-gold-400 text-xs sm:text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-gold-500 animate-spin" />
              <span>Admissions Open for 2025/2026 Pinnacle Batches</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-navy-950 dark:text-white leading-[1.12]">
              Your Mission. <br className="hidden sm:inline" />
              <span className="gold-gradient-text">Your Rank.</span> <br />
              Your Future.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              India's premier digital academy for students preparing for <strong className="text-navy-900 dark:text-white font-bold">JEE, NEET, CUET</strong>, and <strong className="text-navy-900 dark:text-white font-bold">Class 9–12 School Boards</strong>. Master every concept with Kota's legendary educators, 2-way live classes, and NTA-pattern CBT tests.
            </p>

            {/* Search Courses Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto lg:mx-0">
              <div className="relative flex items-center shadow-lg rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 focus-within:border-gold-500 p-1.5 transition-all">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses e.g. JEE Main, NEET Biology, Class 10 Math..."
                  className="w-full px-3 py-2 text-sm bg-transparent text-navy-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl gold-gradient-bg text-navy-950 font-bold text-xs sm:text-sm shadow-md hover:brightness-110 active:scale-95 transition-all shrink-0"
                >
                  Explore
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  setCurrentView('courses');
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl gold-gradient-bg text-navy-950 font-extrabold text-sm sm:text-base shadow-xl shadow-gold-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  if (isAuthenticated) setCurrentView('dashboard');
                  else openAuthModal('register');
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-navy-900 dark:bg-navy-850 hover:bg-navy-800 text-white font-bold text-sm sm:text-base border border-slate-300 dark:border-navy-700 transition-all flex items-center justify-center gap-2"
              >
                <span>Join Free Trial</span>
                <Play className="w-4 h-4 fill-gold-400 text-gold-400" />
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Live Doubts in Every Class
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                NTA CBT Mock Tests
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Free Kota PDF Notes
              </span>
            </div>
          </div>

          {/* Right Hero Visual Cards */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Interactive Card */}
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-navy-900 to-navy-950 border-2 border-gold-500/40 shadow-2xl shadow-navy-950/50 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-2xl"></div>

              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-navy-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
                    <Award className="w-6 h-6 text-gold-400" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">AIR Hall of Fame 2024</h3>
                    <p className="text-xs text-slate-400">Mission Rank Academy Toppers</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  98.4% Success
                </span>
              </div>

              {/* Topper Spotlights */}
              <div className="space-y-4 py-6">
                
                {/* Topper 1 */}
                <div className="p-3.5 rounded-2xl bg-navy-850/90 border border-navy-700/80 flex items-center justify-between hover:border-gold-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
                      alt="Rohan Kulkarni"
                      className="w-11 h-11 rounded-xl object-cover border border-gold-500/50"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-white">Rohan Kulkarni</h4>
                      <p className="text-xs text-slate-400">IIT Bombay CSE • 342/360</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-black rounded-lg gold-gradient-bg text-navy-950">
                    AIR 3
                  </span>
                </div>

                {/* Topper 2 */}
                <div className="p-3.5 rounded-2xl bg-navy-850/90 border border-navy-700/80 flex items-center justify-between hover:border-gold-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
                      alt="Siddhi Agrawal"
                      className="w-11 h-11 rounded-xl object-cover border border-gold-500/50"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-white">Siddhi Agrawal</h4>
                      <p className="text-xs text-slate-400">AIIMS New Delhi • 715/720</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-black rounded-lg gold-gradient-bg text-navy-950">
                    AIR 12
                  </span>
                </div>

                {/* Topper 3 */}
                <div className="p-3.5 rounded-2xl bg-navy-850/90 border border-navy-700/80 flex items-center justify-between hover:border-gold-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
                      alt="Aditya Nair"
                      className="w-11 h-11 rounded-xl object-cover border border-gold-500/50"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-white">Aditya Nair</h4>
                      <p className="text-xs text-slate-400">SRCC Delhi • 796/800</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-black rounded-lg gold-gradient-bg text-navy-950">
                    99.94%
                  </span>
                </div>

              </div>

              {/* Bottom live stats */}
              <div className="pt-4 border-t border-navy-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-slate-300">1,420 students taking mock tests right now</span>
                </div>
                <div className="flex items-center gap-1 text-gold-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  <span>4.96/5</span>
                </div>
              </div>

            </div>

            {/* Floating Badge Bottom Left */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 rounded-2xl p-3.5 bg-white dark:bg-navy-850 border border-slate-200 dark:border-navy-700 shadow-xl items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-500">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-navy-900 dark:text-white">Rank Predictor 99%</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">AI Accuracy Match</p>
              </div>
            </div>

            {/* Floating Badge Top Right */}
            <div className="hidden sm:flex absolute -top-6 -right-4 rounded-2xl p-3 bg-white dark:bg-navy-850 border border-slate-200 dark:border-navy-700 shadow-xl items-center gap-2.5 animate-pulse-slow">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-black text-xs">
                IIT
              </div>
              <p className="text-xs font-bold text-navy-900 dark:text-white">Ex-IITian Mentors</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
