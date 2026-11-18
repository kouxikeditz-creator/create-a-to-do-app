import React from 'react';
import { Home, BookOpen, Video, FileText, LayoutDashboard, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const MobileNav = () => {
  const { currentView, setCurrentView } = useApp();
  const { isAuthenticated, openAuthModal } = useAuth();

  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'live', label: 'Live', icon: Video, badge: 'LIVE' },
    { id: 'notes', label: 'Notes', icon: FileText },
    { 
      id: 'dashboard', 
      label: isAuthenticated ? 'Dashboard' : 'Login', 
      icon: isAuthenticated ? LayoutDashboard : UserCheck,
      action: () => {
        if (isAuthenticated) setCurrentView('dashboard');
        else openAuthModal('login');
      }
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-navy-950/95 backdrop-blur-md border-t border-slate-200 dark:border-navy-800 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.action) item.action();
                else setCurrentView(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-gold-500 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white'
              }`}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {item.badge && (
                  <span className="absolute -top-1 -right-2.5 w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                )}
              </div>
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
