import React from 'react';
import { Star, Award, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { testimonialsData } from '../../data/testimonialsData';

export const AchievementsSection = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-navy-950 border-t border-slate-200 dark:border-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-gold-600 dark:text-gold-400">
            Student Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 dark:text-white mt-1">
            Proven Results in JEE, NEET & CUET
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3">
            Real stories from our students who turned their aspirations into top national ranks and secured admission in India's apex colleges.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-800 hover:border-gold-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 dark:text-navy-800 -z-0" />

              <div className="relative z-10 space-y-4">
                {/* Header Rating & Verified */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Student
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              {/* Bottom Student Bio & Rank Badge */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-gold-400"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-navy-950 dark:text-white">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {item.college}
                    </p>
                    <p className="text-[11px] text-gold-600 dark:text-gold-400 font-bold">
                      {item.batch}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1.5 rounded-xl gold-gradient-bg text-navy-950 font-black text-xs sm:text-sm shadow-md">
                    {item.rank}
                  </span>
                  <span className="block text-[10px] text-slate-400 font-bold mt-1">
                    {item.score}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
