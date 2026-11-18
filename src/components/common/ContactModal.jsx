import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContactModal = () => {
  const { isContactOpen, setIsContactOpen } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isContactOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsContactOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-navy-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-750 p-6 sm:p-8 space-y-6 my-auto text-slate-900 dark:text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-navy-800 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-gold-600 dark:text-gold-400 block">
              24/7 Academic Support
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white">
              Contact Mission Rank Academy
            </h3>
          </div>

          <button
            onClick={() => setIsContactOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 space-y-1">
            <Phone className="w-5 h-5 text-gold-500 mb-1" />
            <h4 className="font-bold text-navy-950 dark:text-white">Toll-Free Helpline</h4>
            <p className="text-slate-500 font-mono">1800-209-RANK</p>
            <span className="text-[10px] text-slate-400">9:00 AM - 9:00 PM Daily</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 space-y-1">
            <MessageCircle className="w-5 h-5 text-emerald-500 mb-1" />
            <h4 className="font-bold text-navy-950 dark:text-white">Instant WhatsApp</h4>
            <p className="text-slate-500 font-mono">+91 98765 43210</p>
            <span className="text-[10px] text-emerald-500 font-bold">2-Min Avg Reply</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 space-y-1">
            <Mail className="w-5 h-5 text-blue-500 mb-1" />
            <h4 className="font-bold text-navy-950 dark:text-white">Admissions Desk</h4>
            <p className="text-slate-500 font-mono">admissions@missionrank.com</p>
            <span className="text-[10px] text-slate-400">Official Queries</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Student or Parent Name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-semibold focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 00000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-semibold focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">How can our academic counselors help you?</label>
            <textarea
              rows={3}
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about batch timings, scholarship admission tests, fee structures, or curriculum..."
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-semibold focus:outline-none focus:border-gold-500 resize-none"
            />
          </div>

          {submitted && (
            <p className="text-emerald-500 font-bold flex items-center gap-1.5 text-xs">
              <CheckCircle2 className="w-4 h-4" /> Query received! An academic counselor will call you within 15 minutes.
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsContactOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-200 font-bold"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl gold-gradient-bg text-navy-950 font-black hover:brightness-110 active:scale-95 shadow-md flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Request</span>
            </button>
          </div>
        </form>

        {/* Offline Campuses */}
        <div className="pt-2 border-t border-slate-100 dark:border-navy-800 text-[11px] text-slate-400">
          <strong className="text-slate-600 dark:text-slate-300 block mb-1">Campus Locations:</strong>
          <p>Kota: Road No. 1, IPIA, Kota, Rajasthan 324005 • NCR: Knowledge Park V, Greater Noida, UP</p>
        </div>

      </div>
    </div>
  );
};
