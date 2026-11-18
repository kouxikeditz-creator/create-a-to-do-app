import React, { useState } from 'react';
import { 
  X, 
  Trophy, 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  Share2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TestResultModal = () => {
  const { currentTestResult, setCurrentTestResult, leaderboardData } = useApp();
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'solutions' | 'leaderboard'
  const [filterSubject, setFilterSubject] = useState('All');

  if (!currentTestResult) return null;

  const {
    testTitle,
    totalScore,
    maxMarks,
    percentage,
    percentile,
    rank,
    correctCount,
    incorrectCount,
    unattemptedCount,
    subjectStats,
    questions,
    selectedAnswers
  } = currentTestResult;

  const filteredQuestions = filterSubject === 'All'
    ? questions
    : questions.filter(q => q.subject === filterSubject);

  const subjectsList = ['All', ...new Set(questions.map(q => q.subject))];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in">
      <div className="relative w-full max-w-4xl h-[92vh] bg-white dark:bg-navy-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-750 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="h-16 px-6 bg-slate-100 dark:bg-navy-950 border-b border-slate-200 dark:border-navy-800 flex items-center justify-between text-navy-950 dark:text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gold-gradient-bg text-navy-950 flex items-center justify-center font-black">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-gold-600 dark:text-gold-400 block">
                Official NTA Scorecard & Performance Analysis
              </span>
              <h3 className="text-xs sm:text-sm font-extrabold truncate max-w-xs sm:max-w-md">
                {testTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setCurrentTestResult(null)}
            className="p-2 rounded-xl bg-slate-200 dark:bg-navy-800 hover:bg-slate-300 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center border-b border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-900 px-6">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'summary'
                ? 'border-gold-500 text-gold-600 dark:text-gold-400 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            Scorecard Summary
          </button>
          <button
            onClick={() => setActiveTab('solutions')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'solutions'
                ? 'border-gold-500 text-gold-600 dark:text-gold-400 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            Detailed Solutions ({questions.length})
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'leaderboard'
                ? 'border-gold-500 text-gold-600 dark:text-gold-400 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            All-India Leaderboard
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* TAB 1: SUMMARY SCORECARD */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              
              {/* Highlight Rank & Score Card */}
              <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-navy-900 to-navy-950 border border-gold-500/40 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div className="p-4 rounded-2xl bg-navy-850/80 border border-navy-700">
                    <span className="text-xs text-slate-400 block font-semibold">Total Score</span>
                    <h3 className="text-3xl font-black text-gold-400 mt-1">
                      {totalScore} <span className="text-sm font-bold text-slate-400">/ {maxMarks}</span>
                    </h3>
                    <span className="text-[10px] text-emerald-400 font-bold block mt-1">{percentage}% Aggregate</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-navy-850/80 border border-navy-700">
                    <span className="text-xs text-slate-400 block font-semibold">National Percentile</span>
                    <h3 className="text-3xl font-black text-white mt-1">
                      {percentile}
                    </h3>
                    <span className="text-[10px] text-gold-400 font-bold block mt-1">Top 1% Tier</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-navy-850/80 border border-navy-700">
                    <span className="text-xs text-slate-400 block font-semibold">Projected AIR</span>
                    <h3 className="text-3xl font-black text-white mt-1">
                      #{rank}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-bold block mt-1">Among 50k Aspirants</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-navy-850/80 border border-navy-700">
                    <span className="text-xs text-slate-400 block font-semibold">Accuracy</span>
                    <h3 className="text-3xl font-black text-emerald-400 mt-1">
                      {correctCount + incorrectCount > 0 ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) : 0}%
                    </h3>
                    <span className="text-[10px] text-slate-400 font-bold block mt-1">{correctCount} Correct Attempts</span>
                  </div>
                </div>
              </div>

              {/* Accuracy & Breakdown Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Correct Answers
                  </span>
                  <p className="text-2xl font-black text-navy-950 dark:text-white mt-1">{correctCount}</p>
                </div>

                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-center">
                  <span className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center justify-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Incorrect Answers
                  </span>
                  <p className="text-2xl font-black text-navy-950 dark:text-white mt-1">{incorrectCount}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-200/50 dark:bg-navy-800 border border-slate-300 dark:border-navy-700 text-center">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> Unattempted
                  </span>
                  <p className="text-2xl font-black text-navy-950 dark:text-white mt-1">{unattemptedCount}</p>
                </div>
              </div>

              {/* Subject-Wise Performance Table */}
              <div className="rounded-2xl border border-slate-200 dark:border-navy-750 overflow-hidden bg-white dark:bg-navy-900">
                <div className="px-5 py-3.5 bg-slate-100 dark:bg-navy-850 font-bold text-xs sm:text-sm text-navy-950 dark:text-white">
                  Subject-Wise Performance Breakdown
                </div>
                <div className="divide-y divide-slate-100 dark:divide-navy-800 text-xs sm:text-sm">
                  {Object.entries(subjectStats || {}).map(([subj, stats]) => (
                    <div key={subj} className="p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-navy-950 dark:text-white">{subj}</h4>
                        <p className="text-xs text-slate-400">
                          {stats.correct} Correct • {stats.incorrect} Incorrect • {stats.unattempted} Left
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-gold-600 dark:text-gold-400">{stats.score} Marks</span>
                        <span className="block text-[11px] text-slate-400">
                          Accuracy: {stats.correct + stats.incorrect > 0 ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: DETAILED STEP-BY-STEP SOLUTIONS */}
          {activeTab === 'solutions' && (
            <div className="space-y-6">
              
              {/* Filter pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {subjectsList.map((subj) => (
                  <button
                    key={subj}
                    onClick={() => setFilterSubject(subj)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      filterSubject === subj
                        ? 'gold-gradient-bg text-navy-950'
                        : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {filteredQuestions.map((q, idx) => {
                  const selected = selectedAnswers[q.id];
                  const isCorrect = selected === q.correctOption;
                  const isUnattempted = selected === undefined;

                  return (
                    <div
                      key={q.id}
                      className="p-6 rounded-2xl border border-slate-200 dark:border-navy-750 bg-white dark:bg-navy-900 space-y-4"
                    >
                      {/* Status Header */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold px-2.5 py-1 rounded-lg bg-navy-100 dark:bg-navy-800 text-navy-950 dark:text-white">
                          Question {idx + 1} • {q.subject}
                        </span>
                        {isCorrect ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-500 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+4)
                          </span>
                        ) : isUnattempted ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-200 dark:bg-navy-800 text-slate-500">
                            Unattempted (0)
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-red-500/20 text-red-500 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect (-1)
                          </span>
                        )}
                      </div>

                      {/* Question Text */}
                      <p className="font-bold text-sm text-navy-950 dark:text-white leading-relaxed">
                        {q.text}
                      </p>

                      {/* Options breakdown */}
                      <div className="space-y-2 text-xs">
                        {q.options.map((opt, oIdx) => {
                          const isUserChoice = selected === oIdx;
                          const isRightAnswer = q.correctOption === oIdx;

                          let borderClass = 'border-slate-200 dark:border-navy-800';
                          let bgClass = 'bg-slate-50 dark:bg-navy-850';

                          if (isRightAnswer) {
                            borderClass = 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/15';
                          } else if (isUserChoice) {
                            borderClass = 'border-red-500 bg-red-500/10 dark:bg-red-500/15';
                          }

                          return (
                            <div
                              key={oIdx}
                              className={`p-3 rounded-xl border ${borderClass} ${bgClass} flex items-center justify-between`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-6 h-6 rounded-lg font-bold flex items-center justify-center bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-300">
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">{opt}</span>
                              </div>
                              {isRightAnswer && (
                                <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">
                                  Correct Answer
                                </span>
                              )}
                              {isUserChoice && !isRightAnswer && (
                                <span className="text-[10px] font-black uppercase text-red-500">
                                  Your Choice
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Step by step explanation */}
                      <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 text-xs text-slate-800 dark:text-slate-200 space-y-1">
                        <strong className="text-gold-600 dark:text-gold-400 font-extrabold block">
                          Step-by-Step Expert Solution:
                        </strong>
                        <p className="leading-relaxed font-sans">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 3: NATIONAL LEADERBOARD */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gold-500/15 border border-gold-500/40 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-navy-950 dark:text-white">
                    National Rank 1 Benchmark
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Calculated from 12,450 verified mock test attempts across Kota, Delhi, Hyderabad, and Patna centers.
                  </p>
                </div>
                <span className="px-3 py-1.5 rounded-xl gold-gradient-bg text-navy-950 font-black text-xs">
                  56 / 60 Top Score
                </span>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-navy-750 overflow-hidden bg-white dark:bg-navy-900">
                <div className="divide-y divide-slate-100 dark:divide-navy-800">
                  {leaderboardData.map((student) => (
                    <div key={student.rank} className="p-4 flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl font-black flex items-center justify-center ${
                            student.rank === 1
                              ? 'gold-gradient-bg text-navy-950'
                              : 'bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {student.rank}
                        </div>
                        <div>
                          <h4 className="font-bold text-navy-950 dark:text-white">{student.name}</h4>
                          <span className="text-[11px] text-slate-400">{student.city}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-black text-gold-600 dark:text-gold-400">{student.score}</span>
                        <span className="block text-[10px] text-emerald-500 font-bold">{student.percentile}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
