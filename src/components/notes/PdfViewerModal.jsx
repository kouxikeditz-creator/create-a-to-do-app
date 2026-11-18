import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Printer, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  Bookmark
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PdfViewerModal = () => {
  const { activePdfNote, setActivePdfNote, downloadNote, downloadedNoteIds } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isDownloaded, setIsDownloaded] = useState(false);

  if (!activePdfNote) return null;

  const totalPages = activePdfNote.pages || 14;
  const isAlreadySaved = downloadedNoteIds.includes(activePdfNote.id) || isDownloaded;

  const handleDownload = () => {
    downloadNote(activePdfNote);
    setIsDownloaded(true);
    // Simulate real file download trigger
    const blob = new Blob([activePdfNote.contentSnippet], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activePdfNote.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in">
      <div className="relative w-full max-w-4xl h-[92vh] bg-white dark:bg-navy-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-750 flex flex-col overflow-hidden">
        
        {/* Top PDF Controls Toolbar */}
        <div className="h-16 px-4 sm:px-6 bg-slate-100 dark:bg-navy-950 border-b border-slate-200 dark:border-navy-800 flex items-center justify-between text-navy-950 dark:text-white shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePdfNote(null)}
              className="p-2 rounded-xl bg-slate-200 dark:bg-navy-800 hover:bg-slate-300 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="truncate max-w-[200px] sm:max-w-md">
              <span className="text-[10px] font-black uppercase text-gold-600 dark:text-gold-400 block">
                {activePdfNote.category} • {activePdfNote.subject}
              </span>
              <h3 className="text-xs sm:text-sm font-extrabold truncate">
                {activePdfNote.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Page navigation */}
            <div className="flex items-center bg-white dark:bg-navy-850 border border-slate-200 dark:border-navy-700 rounded-xl px-2 py-1 text-xs font-bold">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-navy-750 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="mx-2 text-[11px]">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-navy-750 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-white dark:bg-navy-850 border border-slate-200 dark:border-navy-700 rounded-xl px-2 py-1 text-xs">
              <button
                onClick={() => setZoomLevel(z => Math.max(80, z - 10))}
                className="p-1 hover:text-gold-500"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-bold mx-1">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(z => Math.min(140, z + 10))}
                className="p-1 hover:text-gold-500"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all ${
                isAlreadySaved
                  ? 'bg-emerald-600 text-white'
                  : 'gold-gradient-bg text-navy-950 hover:brightness-110 active:scale-95'
              }`}
            >
              {isAlreadySaved ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              <span className="hidden sm:inline">{isAlreadySaved ? 'Saved to Device' : 'Download PDF'}</span>
            </button>
          </div>
        </div>

        {/* PDF Document Canvas View */}
        <div className="flex-1 overflow-y-auto bg-slate-200 dark:bg-navy-950/70 p-4 sm:p-8 flex justify-center items-start">
          
          {/* Simulated A4 Paper */}
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-2xl bg-white dark:bg-navy-900 border border-slate-300 dark:border-navy-700 shadow-2xl rounded-2xl p-6 sm:p-10 transition-transform duration-200 text-slate-800 dark:text-slate-100"
          >
            {/* Header Document Crest */}
            <div className="border-b-2 border-gold-500/40 pb-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gold-600 dark:text-gold-400">
                  MISSION RANK ACADEMY • STUDY DOSSIER
                </span>
                <h2 className="text-xl font-black text-navy-950 dark:text-white mt-0.5">
                  {activePdfNote.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Target Exam: {activePdfNote.targetExam} • Authored by {activePdfNote.author}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-navy-950 text-gold-400 border border-gold-500 flex items-center justify-center font-black text-sm">
                MRA
              </div>
            </div>

            {/* Main Formatted Study Notes Content */}
            <div className="space-y-6 font-mono text-xs sm:text-sm leading-relaxed bg-slate-50 dark:bg-navy-850 p-6 rounded-2xl border border-slate-200 dark:border-navy-750">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-navy-700">
                <span className="text-xs font-bold text-gold-600 dark:text-gold-400">
                  HIGH-YIELD CORE FORMULAS & CONCEPTS (PAGE {currentPage} OF {totalPages})
                </span>
                <span className="text-[10px] text-slate-400">CLASS 2025/2026 EDITION</span>
              </div>

              <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {activePdfNote.contentSnippet}
              </pre>

              {/* Extra Practice Note Block */}
              <div className="mt-4 p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 text-xs text-gold-800 dark:text-gold-300 font-sans">
                <h4 className="font-extrabold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-gold-500" />
                  Exam Day Tip:
                </h4>
                <p>
                  Always re-verify units in numericals before filling the final answer. In JEE Main & Advanced, questions often test conversions between cm, mm, and standard SI units.
                </p>
              </div>
            </div>

            {/* Document Footer */}
            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-navy-800 flex items-center justify-between text-[10px] text-slate-400">
              <span>Mission Rank Academy © Protected Study Material</span>
              <span>Page {currentPage} of {totalPages}</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
