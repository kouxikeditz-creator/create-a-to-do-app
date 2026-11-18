import React, { useState } from 'react';
import { 
  Trophy, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  Award, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  BarChart2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TestsView = () => {
  const { tests, setActiveCbtTest, testResults, setCurrentTestResult, leaderboardData } = useApp();
  const [activeTab, setActiveTab] = useState('tests'); // 'tests' | 'results' | 'leaderboard'

  return (
    <div className="py-8 space-y-8 animate-in fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-gold-600 dark:text-gold-400">
          NTA Examination Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-950 dark:text-white">
          All India CBT Mock Test Series
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Simulate real exam pressure with our Computer Based Test (CBT) engine. Experience identical NTA interfaces, timer countdowns, negative marking (+4 / -1), and instant national percentile calculation.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-navy-800 pb-3">
        <button
          onClick={() => setActiveTab('tests')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'tests'
              ? 'gold-gradient-bg text-navy-950 shadow-md shadow-gold-500/20'
              : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Available Mock Tests ({tests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'results'
              ? 'gold-gradient-bg text-navy-950 shadow-md shadow-gold-500/20'
              : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>My Test Scorecards ({testResults.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'leaderboard'
              ? 'gold-gradient-bg text-navy-950 shadow-md shadow-gold-500/20'
              : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>National AIR Leaderboard</span>
        </button>
      </div>

      {/* TAB 1: TESTS LIST */}
      {activeTab === 'tests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div
              key={test.id}
              className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-500/50 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-gold-500/15 text-gold-600 dark:text-gold-400 border border-gold-500/30">
                    {test.category} • {test.targetExam}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    {test.difficulty}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-navy-950 dark:text-white group-hover:text-gold-500 transition-colors line-clamp-2">
                  {test.title}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-navy-750">
                    <span className="text-[10px] text-slate-400 block font-semibold">Duration</span>
                    <span className="font-bold text-navy-950 dark:text-white flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold-500" />
                      {test.durationMinutes} Minutes
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-navy-750">
                    <span className="text-[10px] text-slate-400 block font-semibold">Pattern</span>
                    <span className="font-bold text-navy-950 dark:text-white">
                      +{test.positiveMarks} / -{test.negativeMarks} Marks
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-500">
                  <span>Subjects: <strong>{test.subjects.join(', ')}</strong></span>
                </div>
              </div>

              {/* Start Exam CTA */}
              <button
                onClick={() => setActiveCbtTest(test)}
                className="w-full py-3 rounded-xl gold-gradient-bg text-navy-950 font-black text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start CBT Examination</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: MY SCORECARDS */}
      {activeTab === 'results' && (
        <div className="space-y-4">
          {testResults.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-navy-800 p-8 space-y-3">
              <Trophy className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-navy-950 dark:text-white">No mock tests attempted yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Attempt any available test above to generate your comprehensive performance report and solutions.
              </p>
              <button
                onClick={() => setActiveTab('tests')}
                className="px-5 py-2.5 rounded-xl gold-gradient-bg text-navy-950 font-bold text-xs"
              >
                Take First Mock Test
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testResults.map((res) => (
                <div
                  key={res.id}
                  onClick={() => setCurrentTestResult(res)}
                  className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-500/40 shadow-sm cursor-pointer transition-all space-y-4"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gold-600 dark:text-gold-400">{res.date}</span>
                    <span className="px-2 py-0.5 rounded font-black bg-emerald-500/15 text-emerald-500 uppercase">
                      Evaluated
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-navy-950 dark:text-white">
                    {res.testTitle}
                  </h3>

                  <div className="grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850">
                      <span className="text-[10px] text-slate-400 block font-semibold">Score</span>
                      <strong className="text-base text-gold-500 font-black">{res.totalScore} / {res.maxMarks}</strong>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850">
                      <span className="text-[10px] text-slate-400 block font-semibold">Percentile</span>
                      <strong className="text-base text-navy-950 dark:text-white font-black">{res.percentile}</strong>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850">
                      <span className="text-[10px] text-slate-400 block font-semibold">Projected AIR</span>
                      <strong className="text-base text-emerald-500 font-black">#{res.rank}</strong>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-gold-600 dark:text-gold-400 font-bold">
                    <span>View Solutions & Analysis</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: NATIONAL LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-navy-900 to-navy-950 text-white border border-gold-500/40 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase">All-India Benchmarking</span>
              <h3 className="text-lg font-black text-white">Top Rankers Hall of Fame</h3>
            </div>
            <span className="px-3 py-1.5 rounded-xl gold-gradient-bg text-navy-950 font-black text-xs">
              Live Ranking
            </span>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-navy-800 overflow-hidden bg-white dark:bg-navy-900 shadow-sm">
            <div className="divide-y divide-slate-100 dark:divide-navy-800">
              {leaderboardData.map((st) => (
                <div key={st.rank} className="p-4 sm:p-5 flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center shrink-0 ${
                        st.rank === 1
                          ? 'gold-gradient-bg text-navy-950 shadow-md'
                          : 'bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {st.rank}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-navy-950 dark:text-white">{st.name}</h4>
                      <p className="text-xs text-slate-400">{st.city} • {st.exam}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-black text-base text-gold-600 dark:text-gold-400">{st.score}</span>
                    <span className="block text-[11px] text-emerald-500 font-bold">{st.percentile}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
