import React from 'react';
import { Users, BookOpen, Award, GraduationCap, Trophy, CheckCircle2 } from 'lucide-react';

export const StatsSection = () => {
  const stats = [
    {
      id: 'enrolled',
      icon: Users,
      value: '50,000+',
      label: 'Students Enrolled',
      subtext: 'Across 28 Indian States & UTs',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'courses',
      icon: BookOpen,
      value: '450+',
      label: 'Comprehensive Courses',
      subtext: 'JEE, NEET, CUET & Class 9-12',
      color: 'text-gold-500',
      bgColor: 'bg-gold-500/10'
    },
    {
      id: 'faculty',
      icon: GraduationCap,
      value: '120+',
      label: 'Expert Master Faculty',
      subtext: 'Ex-IITians, AIIMS Doctors & Gold Medalists',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 'success',
      icon: Trophy,
      value: '98.4%',
      label: 'Exam Success Rate',
      subtext: 'Qualified with 90%+ Percentiles',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    }
  ];

  return (
    <section className="py-12 border-y border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-navy-850/80 border border-slate-200/80 dark:border-navy-750 hover:border-gold-500/50 hover:shadow-lg transition-all text-center sm:text-left group"
            >
              <div className="flex items-center justify-center sm:justify-start mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight">
                {stat.value}
              </h3>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                {stat.label}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
