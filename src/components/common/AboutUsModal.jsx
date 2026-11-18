import React from 'react';
import { X, GraduationCap, Award, ShieldCheck, Target, Heart, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutUsModal = () => {
  const { isAboutOpen, setIsAboutOpen } = useApp();

  if (!isAboutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-navy-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-750 p-6 sm:p-10 space-y-6 my-auto text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-navy-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-900 border-2 border-gold-500 text-gold-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-gold-600 dark:text-gold-400 block">
                Our Genesis & Philosophy
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white">
                About Mission Rank Academy
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsAboutOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mission Statement */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 space-y-2">
          <h4 className="font-extrabold text-base text-navy-950 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-gold-500" />
            "Your Mission. Your Rank. Your Future."
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Founded by a collective of visionary IIT Delhi alumni and AIIMS gold medalists, Mission Rank Academy was created to democratize elite Kota-level coaching for every student across India regardless of their geographical location. We believe that with the right guidance, systematic practice, and unyielding discipline, every hardworking aspirant can secure an All India Rank.
          </p>
        </div>

        {/* The 4-Pillar Pedagogy */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-base text-navy-950 dark:text-white">
            The 4-Pillar Kota Rank Accelerator Model
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-750 space-y-1">
              <span className="font-bold text-gold-600 dark:text-gold-400 block">1. Conceptual Mastery</span>
              <p className="text-slate-600 dark:text-slate-400">
                Live interactive masterclasses dismantling tough concepts with 3D animations and derivation roots, eliminating rote memorization.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-750 space-y-1">
              <span className="font-bold text-blue-500 block">2. Daily Problem Drills (DPPs)</span>
              <p className="text-slate-600 dark:text-slate-400">
                Curated problem sheets with multi-concept questions that mirror the evolving difficulty of JEE Advanced and NEET.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-750 space-y-1">
              <span className="font-bold text-emerald-500 block">3. True NTA CBT Simulator</span>
              <p className="text-slate-600 dark:text-slate-400">
                Color-coded examination interface conditioning students to master time management, accuracy, and negative marking penalty control.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-750 space-y-1">
              <span className="font-bold text-purple-500 block">4. 24/7 Doubt Resolution</span>
              <p className="text-slate-600 dark:text-slate-400">
                Dedicated subject clinics ensuring no concept bottleneck lingers unaddressed for more than 15 minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 border-t border-slate-100 dark:border-navy-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>Govt. of India Recognized Startup India Hub</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-gold-500" />
            <span>ISO 9001:2015 Quality Certified Education</span>
          </div>
        </div>

      </div>
    </div>
  );
};
