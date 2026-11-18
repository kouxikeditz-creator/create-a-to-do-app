import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Star, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotesView = () => {
  const { notes, setActivePdfNote, downloadNote, downloadedNoteIds } = useApp();

  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const classLevels = ['All', 'Class 12', 'Class 11', 'Class 10', 'Class 9'];
  const subjects = ['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science', 'Computer Science', 'General Test'];
  const materialTypes = ['All', 'Formula Sheets', 'Revision Notes', 'Previous Year Papers', 'Important Questions', 'Sample Papers'];

  const filteredNotes = notes.filter((n) => {
    const matchesSearch = !searchQuery ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesClass = selectedClass === 'All' || n.classLevel.includes(selectedClass);
    const matchesSubject = selectedSubject === 'All' || n.subject === selectedSubject;
    const matchesType = selectedType === 'All' || n.category === selectedType;

    return matchesSearch && matchesClass && matchesSubject && matchesType;
  });

  const handleDownload = (e, note) => {
    e.stopPropagation();
    downloadNote(note);
    const blob = new Blob([note.contentSnippet], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="py-8 space-y-8 animate-in fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-gold-600 dark:text-gold-400">
          Knowledge Repository
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-950 dark:text-white">
          Study Materials, Formula Sheets & PYQs
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Exhaustive chapter notes, 1-page formula summaries, past 15-year solved question papers, and high-frequency question banks compiled by Kota's senior evaluators.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by chapter, formula, or exam name..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-sm text-navy-950 dark:text-white font-semibold focus:outline-none focus:border-gold-500"
          />
        </div>

        {/* Filter Rows */}
        <div className="space-y-3 text-xs font-bold">
          
          {/* Class Level */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-slate-500 shrink-0">Class:</span>
            {classLevels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedClass(lvl)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  selectedClass === lvl
                    ? 'gold-gradient-bg text-navy-950 font-black'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Material Type */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-slate-500 shrink-0">Type:</span>
            {materialTypes.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  selectedType === t
                    ? 'bg-navy-900 dark:bg-white text-white dark:text-navy-950 font-black'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Subject */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-slate-500 shrink-0">Subject:</span>
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  selectedSubject === s
                    ? 'border border-gold-500 text-gold-500 font-black'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => {
          const isDownloaded = downloadedNoteIds.includes(note.id);

          return (
            <div
              key={note.id}
              onClick={() => setActivePdfNote(note)}
              className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-500/50 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-gold-500/15 text-gold-600 dark:text-gold-400 border border-gold-500/30">
                    {note.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                    <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    <span>{note.rating}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-base text-navy-950 dark:text-white group-hover:text-gold-500 transition-colors line-clamp-2">
                  {note.title}
                </h3>

                {/* Metadata */}
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span>{note.subject}</span>
                  <span>•</span>
                  <span>{note.classLevel}</span>
                  <span>•</span>
                  <span>{note.pages} Pages</span>
                </div>

                {/* Snippet preview */}
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 font-mono bg-slate-50 dark:bg-navy-850 p-2.5 rounded-xl border border-slate-100 dark:border-navy-750">
                  {note.contentSnippet}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {note.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-navy-800 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  By {note.author}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActivePdfNote(note)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300 transition-colors"
                    title="Read Online"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => handleDownload(e, note)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                      isDownloaded
                        ? 'bg-emerald-600 text-white'
                        : 'gold-gradient-bg text-navy-950 hover:brightness-110 active:scale-95'
                    }`}
                  >
                    {isDownloaded ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                    <span>{isDownloaded ? 'Downloaded' : 'Download'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
