import React from 'react';
import { 
  Video, 
  HelpCircle, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WhyChooseUs = () => {
  const { setCurrentView } = useApp();

  const features = [
    {
      icon: Video,
      title: '2-Way Live Interactive Classes',
      desc: 'Real-time doubt asking, audio hand-raising, and live polls that keep students 100% engaged throughout the lecture.',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    },
    {
      icon: HelpCircle,
      title: '24/7 Dedicated Doubt Clinic',
      desc: 'Never let a doubt stop your momentum. Snap a photo of any tough problem and receive verified video solutions within 15 minutes.',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      icon: Cpu,
      title: 'Exact NTA CBT Test Engine',
      desc: 'Simulate the exact feel of JEE Main and NEET Computer Based Tests with instant percentile, negative marking, and error analysis.',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      icon: FileText,
      title: 'Curated Kota Notes & PYQs',
      desc: 'Comprehensive formula cheat sheets, NCERT extract mind maps, and past 15 years solved papers categorized chapter-wise.',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      icon: TrendingUp,
      title: 'AI Rank Predictor & Analytics',
      desc: 'Identify your strong vs weak chapters. Get an accurate percentile projection based on 50,000+ peer mock test submissions.',
      color: 'text-pink-500',
      bg: 'bg-pink-500/10'
    },
    {
      icon: ShieldCheck,
      title: 'Ex-IITian & Doctor Mentorship',
      desc: 'Regular 1-on-1 academic counseling sessions with top rankers who have walked the path and achieved single-digit AIRs.',
      color: 'text-gold-500',
      bg: 'bg-gold-500/10'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-navy-950 border-t border-slate-200 dark:border-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gold-500/15 text-gold-600 dark:text-gold-400 border border-gold-500/30 mb-3">
            The Mission Rank Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 dark:text-white">
            Engineered for Top 100 All India Ranks
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3">
            Every feature on our platform is designed around one singular objective: maximizing your accuracy, speed, and conceptual mastery on exam day.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-800 hover:border-gold-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-navy-950 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-extrabold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-gold-400" />
              Ready to elevate your preparation?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Join over 50,000 students already learning on Mission Rank Academy.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentView('courses');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-xl gold-gradient-bg text-navy-950 font-extrabold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-gold-500/20 whitespace-nowrap flex items-center gap-2"
          >
            <span>Start Learning Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
