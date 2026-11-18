import React from 'react';
import { Star, Award, GraduationCap, Users, BookOpen, CheckCircle } from 'lucide-react';
import { teachersData } from '../../data/teachersData';

export const TeachersSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-navy-900 border-t border-slate-200 dark:border-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-gold-600 dark:text-gold-400">
            India's Master Educators
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 dark:text-white mt-1">
            Learn From Legends of Kota & IITs
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3">
            Our faculty members have mentored over 250+ Top 100 All India Rankers in JEE and NEET. Experience their unmatched teaching methodology.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachersData.map((teacher) => (
            <div
              key={teacher.id}
              className="rounded-3xl bg-slate-50 dark:bg-navy-850 border border-slate-200/90 dark:border-navy-750 hover:border-gold-500/50 hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Top Avatar & Badges */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-gold-500/50 shadow-md group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute -bottom-2 -right-2 px-2 py-0.5 text-[10px] font-black rounded-md gold-gradient-bg text-navy-950 shadow">
                      {teacher.subject}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-navy-900 text-gold-400 dark:bg-navy-950 border border-gold-500/30">
                      {teacher.badge}
                    </span>
                    <div className="flex items-center gap-1 justify-end mt-2 text-xs font-bold text-navy-900 dark:text-white">
                      <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                      <span>{teacher.rating} ({teacher.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Name & Credentials */}
                <h3 className="text-lg font-black text-navy-950 dark:text-white">
                  {teacher.name}
                </h3>
                <p className="text-xs font-bold text-gold-600 dark:text-gold-400 mt-0.5">
                  {teacher.role}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-navy-400 shrink-0" />
                  <span className="truncate">{teacher.qualification}</span>
                </p>

                {/* Bio */}
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {teacher.bio}
                </p>
              </div>

              {/* Bottom Rank Metrics */}
              <div className="pt-4 mt-6 border-t border-slate-200 dark:border-navy-700/80 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800">
                  <span className="text-[10px] text-slate-400 block font-semibold">Experience</span>
                  <span className="font-bold text-navy-900 dark:text-white">{teacher.experience}</span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800">
                  <span className="text-[10px] text-slate-400 block font-semibold">Top Selections</span>
                  <span className="font-bold text-gold-600 dark:text-gold-400">{teacher.topRankers}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
