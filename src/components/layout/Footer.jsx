import React from 'react';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  ShieldCheck, 
  Award, 
  Heart,
  Youtube,
  MessageCircle,
  Instagram,
  Linkedin,
  Twitter,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer = () => {
  const { setCurrentView, setIsContactOpen, setIsAboutOpen } = useApp();

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter / CTA Grid */}
        <div className="rounded-3xl p-8 sm:p-10 mb-16 relative overflow-hidden bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-500/30 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/40">
                <Award className="w-3.5 h-3.5 text-gold-400" />
                Mission Rank SAT 2025
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Win up to 100% Scholarship on JEE & NEET Courses
              </h3>
              <p className="text-sm text-slate-400 max-w-xl">
                Take the Mission Rank Scholarship Admission Test (SAT) online from home and unlock India's most prestigious mentorship batch.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3">
              <input
                type="tel"
                placeholder="Enter your WhatsApp number"
                className="px-4 py-3 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 flex-1 text-sm"
              />
              <button 
                onClick={() => setIsContactOpen(true)}
                className="px-6 py-3 rounded-xl gold-gradient-bg text-navy-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20 whitespace-nowrap"
              >
                <span>Register Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy-900 border-2 border-gold-500 text-gold-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                MISSION <span className="gold-gradient-text">RANK</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              Mission Rank Academy is India's leading EdTech institute dedicated to producing Top 100 All India Ranks in JEE Main & Advanced, NEET-UG, CUET, and School Board Examinations through high-impact pedagogy, live interactive masterclasses, and rigorous CBT testing.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-700 flex items-center justify-center hover:text-red-500 hover:border-red-500/50 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://t.me" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-700 flex items-center justify-center hover:text-sky-400 hover:border-sky-400/50 transition-colors">
                <Send className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-700 flex items-center justify-center hover:text-pink-400 hover:border-pink-400/50 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-700 flex items-center justify-center hover:text-blue-400 hover:border-blue-400/50 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-700 flex items-center justify-center hover:text-white hover:border-white/50 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-gold-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => setCurrentView('courses')} className="hover:text-white transition-colors">
                  All Courses
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('live')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  Live Classes <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded font-bold">LIVE</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('recorded')} className="hover:text-white transition-colors">
                  Recorded Lectures
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('notes')} className="hover:text-white transition-colors">
                  PDF Notes & PYQs
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('tests')} className="hover:text-white transition-colors">
                  CBT Test Engine
                </button>
              </li>
              <li>
                <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors">
                  Our Methodology
                </button>
              </li>
            </ul>
          </div>

          {/* Target Exams */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-gold-400">
              Target Exams
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => setCurrentView('courses')} className="hover:text-white transition-colors">
                  JEE Main & Advanced
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('courses')} className="hover:text-white transition-colors">
                  NEET-UG Medical
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('courses')} className="hover:text-white transition-colors">
                  CUET UG 2025
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('courses')} className="hover:text-white transition-colors">
                  Class 12 CBSE & State Boards
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('courses')} className="hover:text-white transition-colors">
                  Class 11 Science Base
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('courses')} className="hover:text-white transition-colors">
                  Class 9 & 10 Olympiads
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-gold-400">
              Help & Support
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>1800-RANK-999 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-green-400 shrink-0" />
                <span>+91 98765 43210 (WhatsApp)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>support@missionrank.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Corporate Center: Knowledge Park V, Greater Noida & Kota Campus, Rajasthan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Mission Rank Academy Pvt. Ltd. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Encrypted Payments via Razorpay
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Award className="w-4 h-4 text-gold-400" />
              ISO 9001:2015 Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
