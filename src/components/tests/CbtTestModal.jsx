import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Send,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const CbtTestModal = () => {
  const { activeCbtTest, setActiveCbtTest, recordTestResult } = useApp();
  const { user } = useAuth();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: optionIndex }
  const [markedForReview, setMarkedForReview] = useState({}); // { [questionId]: boolean }
  const [visitedQuestions, setVisitedQuestions] = useState({ 0: true });
  const [secondsRemaining, setSecondsRemaining] = useState(30 * 60); // 30 minutes
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

  useEffect(() => {
    if (!activeCbtTest) return;
    const duration = (activeCbtTest.durationMinutes || 30) * 60;
    setSecondsRemaining(duration);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setMarkedForReview({});
    setVisitedQuestions({ 0: true });

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeCbtTest]);

  if (!activeCbtTest) return null;

  const questions = activeCbtTest.questions || [];
  const currentQ = questions[currentQuestionIndex];
  if (!currentQ) return null;

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: optIndex
    });
  };

  const handleClearResponse = () => {
    const next = { ...selectedAnswers };
    delete next[currentQ.id];
    setSelectedAnswers(next);
  };

  const handleToggleMarkReview = () => {
    setMarkedForReview({
      ...markedForReview,
      [currentQ.id]: !markedForReview[currentQ.id]
    });
    // Move to next
    if (currentQuestionIndex < questions.length - 1) {
      handleJumpToQuestion(currentQuestionIndex + 1);
    }
  };

  const handleSaveAndNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      handleJumpToQuestion(currentQuestionIndex + 1);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setVisitedQuestions({
      ...visitedQuestions,
      [index]: true
    });
  };

  const handleSubmitExam = () => {
    // Calculate final scores
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let totalScore = 0;

    const subjectStats = {};

    questions.forEach(q => {
      const selected = selectedAnswers[q.id];
      const subj = q.subject || 'General';
      if (!subjectStats[subj]) {
        subjectStats[subj] = { correct: 0, incorrect: 0, unattempted: 0, score: 0 };
      }

      if (selected === undefined) {
        unattemptedCount++;
        subjectStats[subj].unattempted++;
      } else if (selected === q.correctOption) {
        correctCount++;
        totalScore += activeCbtTest.positiveMarks || 4;
        subjectStats[subj].correct++;
        subjectStats[subj].score += activeCbtTest.positiveMarks || 4;
      } else {
        incorrectCount++;
        totalScore -= activeCbtTest.negativeMarks || 1;
        subjectStats[subj].incorrect++;
        subjectStats[subj].score -= activeCbtTest.negativeMarks || 1;
      }
    });

    const maxMarks = questions.length * (activeCbtTest.positiveMarks || 4);
    const percentage = Math.max(0, Math.round((totalScore / maxMarks) * 100));
    
    // Percentile estimation algorithm
    const percentile = Math.min(99.98, Math.max(50.0, (percentage * 0.95 + 4.5).toFixed(2)));

    const resultRecord = {
      id: 'res-' + Date.now(),
      testId: activeCbtTest.id,
      testTitle: activeCbtTest.title,
      studentName: user?.name || 'Aarav Sharma',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      totalScore,
      maxMarks,
      percentage,
      percentile: `${percentile}%`,
      rank: Math.max(1, Math.round((100 - percentile) * 120)),
      correctCount,
      incorrectCount,
      unattemptedCount,
      subjectStats,
      questions,
      selectedAnswers
    };

    setConfirmSubmitOpen(false);
    recordTestResult(resultRecord);
  };

  // Question Status Color Coding
  const getQuestionStatusClass = (idx, qId) => {
    const isAnswered = selectedAnswers[qId] !== undefined;
    const isMarked = markedForReview[qId];
    const isVisited = visitedQuestions[idx];

    if (isAnswered && isMarked) return 'bg-purple-600 text-white'; // Answered & Marked for review
    if (isMarked) return 'bg-purple-500/80 text-white'; // Marked for review
    if (isAnswered) return 'bg-emerald-600 text-white'; // Answered
    if (isVisited) return 'bg-red-500 text-white'; // Not answered
    return 'bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300'; // Not visited
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col overflow-hidden select-none animate-in fade-in">
      
      {/* Top NTA CBT Header */}
      <div className="h-16 px-4 sm:px-6 bg-navy-950 border-b border-navy-800 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-500 text-navy-950 font-black flex items-center justify-center text-xs">
            CBT
          </div>
          <div>
            <span className="text-[10px] font-bold text-gold-400 block uppercase tracking-wider">
              Computer Based Test Simulator • NTA Pattern
            </span>
            <h2 className="text-xs sm:text-sm font-extrabold text-white truncate max-w-xs sm:max-w-md">
              {activeCbtTest.title}
            </h2>
          </div>
        </div>

        {/* Timer & Submit CTA */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-900 border border-navy-700 text-gold-400 font-mono font-bold text-sm sm:text-base">
            <Clock className="w-4 h-4 text-gold-400" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setConfirmSubmitOpen(true)}
            className="px-4 py-2 rounded-xl gold-gradient-bg text-navy-950 font-black text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Main Examination Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-100 dark:bg-navy-950 text-slate-900 dark:text-slate-100">
        
        {/* Left Side: Question Pane */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto p-4 sm:p-8 border-r border-slate-200 dark:border-navy-800">
          
          <div className="space-y-6">
            
            {/* Question Info Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-navy-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-navy-900 text-gold-400 font-black">
                  Q {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="font-bold text-slate-500 dark:text-slate-400">
                  Subject: <strong className="text-navy-950 dark:text-white">{currentQ.subject}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3 font-semibold">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">+{activeCbtTest.positiveMarks || 4}</span>
                <span className="text-red-500 font-bold">-{activeCbtTest.negativeMarks || 1}</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-sm sm:text-base font-bold text-navy-950 dark:text-white leading-relaxed">
              {currentQ.text}
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === optIdx;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
                      isSelected
                        ? 'border-gold-500 bg-gold-500/10 dark:bg-gold-500/15 shadow-md'
                        : 'border-slate-200 dark:border-navy-800 hover:border-slate-400 dark:hover:border-navy-700 bg-white dark:bg-navy-900'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'gold-gradient-bg text-navy-950'
                          : 'bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {letter}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {opt}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Bottom Action Buttons */}
          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-navy-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearResponse}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Response</span>
              </button>

              <button
                onClick={handleToggleMarkReview}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  markedForReview[currentQ.id]
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Mark for Review</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => handleJumpToQuestion(currentQuestionIndex - 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleSaveAndNext}
                className="px-5 py-2 rounded-xl text-xs sm:text-sm font-black gold-gradient-bg text-navy-950 shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Side: Question Status Palette */}
        <div className="w-full lg:w-80 bg-white dark:bg-navy-900 p-4 sm:p-6 border-l border-slate-200 dark:border-navy-800 flex flex-col justify-between shrink-0">
          
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Question Palette
            </h4>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] mb-4 pb-4 border-b border-slate-200 dark:border-navy-800">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md bg-emerald-600 text-white font-bold flex items-center justify-center">✓</span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md bg-red-500 text-white font-bold flex items-center justify-center">✗</span>
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md bg-purple-600 text-white font-bold flex items-center justify-center">★</span>
                <span>Marked Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md bg-slate-200 dark:bg-navy-800 text-slate-600 flex items-center justify-center">•</span>
                <span>Not Visited</span>
              </div>
            </div>

            {/* Number grid */}
            <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const statusClass = getQuestionStatusClass(idx, q.id);

                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`h-9 rounded-xl font-bold text-xs transition-transform active:scale-90 flex items-center justify-center ${statusClass} ${
                      isCurrent ? 'ring-2 ring-gold-500 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Summary Counts */}
          <div className="pt-4 border-t border-slate-200 dark:border-navy-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Answered:</span>
              <strong className="text-emerald-500 font-bold">{Object.keys(selectedAnswers).length}</strong>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Marked for Review:</span>
              <strong className="text-purple-400 font-bold">{Object.values(markedForReview).filter(Boolean).length}</strong>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Unattempted:</span>
              <strong className="text-red-400 font-bold">{questions.length - Object.keys(selectedAnswers).length}</strong>
            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Modal before Submit */}
      {confirmSubmitOpen && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-navy-750 text-slate-900 dark:text-white space-y-4">
            <h3 className="text-lg font-black text-navy-950 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-gold-500" />
              Submit Examination?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              You have answered <strong className="text-gold-500 font-bold">{Object.keys(selectedAnswers).length}</strong> out of <strong className="text-white font-bold">{questions.length}</strong> questions. Time remaining: {formatTime(secondsRemaining)}.
            </p>
            <p className="text-xs text-slate-500">
              Once submitted, your answers will be automatically evaluated and detailed solutions with your national rank percentile will be generated.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setConfirmSubmitOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300"
              >
                Continue Test
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-5 py-2.5 rounded-xl text-xs font-bold gold-gradient-bg text-navy-950 hover:brightness-110 active:scale-95 shadow-md"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
