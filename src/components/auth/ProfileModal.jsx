import React, { useState } from 'react';
import { X, User, Mail, Phone, Target, CheckCircle2, Award, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfileModal = () => {
  const { user, isProfileModalOpen, setIsProfileModalOpen, updateProfile } = useAuth();
  
  if (!isProfileModalOpen || !user) return null;

  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [targetExam, setTargetExam] = useState(user.targetExam || 'JEE Main & Advanced 2025');
  const [classLevel, setClassLevel] = useState(user.classLevel || 'Class 12');
  const [bio, setBio] = useState(user.bio || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      targetExam,
      classLevel,
      bio
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setIsProfileModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-navy-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-750 p-6 sm:p-8 space-y-6 my-auto text-slate-900 dark:text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-navy-800 pb-4">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-gold-500 shadow-md"
            />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">{user.name}</h3>
              <p className="text-xs text-gold-600 dark:text-gold-400 font-bold uppercase">{user.role} Profile</p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-navy-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white focus:outline-none focus:border-gold-500 font-semibold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Email Address</label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-400 font-semibold cursor-not-allowed"
            />
          </div>

          <div>
            <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white focus:outline-none focus:border-gold-500 font-semibold"
            />
          </div>

          {user.role === 'student' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Target Exam</label>
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-bold"
                >
                  <option value="JEE Main & Advanced 2025">JEE 2025/2026</option>
                  <option value="NEET-UG 2025">NEET-UG 2025</option>
                  <option value="CUET UG 2025">CUET 2025</option>
                  <option value="Class 12 Boards">Class 12 Boards</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Class Level</label>
                <select
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-bold"
                >
                  <option value="Class 12">Class 12</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Dropper">Dropper</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Academic Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white focus:outline-none focus:border-gold-500 resize-none font-semibold"
            />
          </div>

          {saved && (
            <p className="text-emerald-500 font-bold flex items-center gap-1.5 text-xs">
              <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-200 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl gold-gradient-bg text-navy-950 font-black hover:brightness-110 active:scale-95 shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
