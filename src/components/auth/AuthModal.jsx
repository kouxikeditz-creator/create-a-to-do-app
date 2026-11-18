import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  GraduationCap, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal = () => {
  const { authModalState, closeAuthModal, login, register, switchRole } = useAuth();
  const [mode, setMode] = useState(authModalState.view || 'login'); // 'login' | 'register' | 'forgot'
  const [emailOrPhone, setEmailOrPhone] = useState('aarav.sharma@gmail.com');
  const [password, setPassword] = useState('pass1234');
  const [name, setName] = useState('Aarav Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [targetExam, setTargetExam] = useState('JEE Main & Advanced 2025');
  const [classLevel, setClassLevel] = useState('Class 12');
  const [forgotSent, setForgotSent] = useState(false);

  if (!authModalState.isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      login(emailOrPhone, password);
    } else if (mode === 'register') {
      register({
        name,
        email: emailOrPhone,
        phone,
        targetExam,
        classLevel
      });
    } else if (mode === 'forgot') {
      setForgotSent(true);
      setTimeout(() => {
        setForgotSent(false);
        setMode('login');
      }, 3000);
    }
  };

  const handleQuickDemoLogin = (roleType) => {
    switchRole(roleType);
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-navy-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-750 p-6 sm:p-8 space-y-6 my-auto text-slate-900 dark:text-white">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Branding Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-navy-900 border-2 border-gold-500 text-gold-400 mb-2 shadow-lg">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-black text-navy-950 dark:text-white">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'register' && 'Join Mission Rank'}
            {mode === 'forgot' && 'Reset Password'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === 'login' && 'Log in to access your live classes, tests, and courses.'}
            {mode === 'register' && 'Create your free student account in 30 seconds.'}
            {mode === 'forgot' && 'Enter your email or phone to receive a 6-digit OTP.'}
          </p>
        </div>

        {/* Quick Demo Persona Shortcuts */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block text-center">
            ⚡ Quick 1-Click Demo Login
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('student')}
              className="py-1.5 px-2 rounded-xl bg-gold-500/20 text-gold-600 dark:text-gold-400 hover:bg-gold-500/30 border border-gold-500/30 text-[11px] font-bold"
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('teacher')}
              className="py-1.5 px-2 rounded-xl bg-blue-600/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600/30 border border-blue-500/30 text-[11px] font-bold"
            >
              Teacher
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="py-1.5 px-2 rounded-xl bg-purple-600/20 text-purple-600 dark:text-purple-400 hover:bg-purple-600/30 border border-purple-500/30 text-[11px] font-bold"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'register' && (
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs sm:text-sm text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
              {mode === 'register' ? 'Email Address' : 'Email or Mobile Number'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="student@example.com or 9876543210"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs sm:text-sm text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Mobile Phone (WhatsApp)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs sm:text-sm text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Target Exam</label>
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs font-bold text-navy-950 dark:text-white"
                  >
                    <option value="JEE Main & Advanced 2025">JEE 2025/2026</option>
                    <option value="NEET-UG 2025">NEET-UG 2025</option>
                    <option value="CUET UG 2025">CUET 2025</option>
                    <option value="Class 12 Boards">Class 12 Boards</option>
                    <option value="Class 10 Foundation">Class 10 Foundation</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Current Class</label>
                  <select
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs font-bold text-navy-950 dark:text-white"
                  >
                    <option value="Class 12">Class 12</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Dropper / Repeater">Dropper</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-gold-600 dark:text-gold-400 hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs sm:text-sm text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          )}

          {forgotSent && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Password reset link sent to your registered contact!</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl gold-gradient-bg text-navy-950 font-black text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2"
          >
            <span>
              {mode === 'login' && 'Sign In to Dashboard'}
              {mode === 'register' && 'Create Account'}
              {mode === 'forgot' && 'Send Reset Code'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Bottom Switcher */}
        <div className="pt-2 text-center text-xs text-slate-500">
          {mode === 'login' && (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-gold-600 dark:text-gold-400 font-extrabold hover:underline"
              >
                Sign up free
              </button>
            </p>
          )}

          {mode === 'register' && (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-gold-600 dark:text-gold-400 font-extrabold hover:underline"
              >
                Log in here
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <p>
              Remembered your password?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-gold-600 dark:text-gold-400 font-extrabold hover:underline"
              >
                Back to Login
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
