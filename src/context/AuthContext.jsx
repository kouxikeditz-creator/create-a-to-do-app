import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS, getStored, setStored } from '../data/mockDatabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // By default, start with the demo student for seamless experience, but allow switching/logout
  const [user, setUser] = useState(() => {
    return getStored('mra_current_user', DEMO_USERS.student);
  });

  const [authModalState, setAuthModalState] = useState({
    isOpen: false,
    view: 'login', // 'login' | 'register' | 'forgot'
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setStored('mra_current_user', user);
    } else {
      localStorage.removeItem('mra_current_user');
    }
  }, [user]);

  const login = (emailOrPhone, password) => {
    // Check against demo accounts or accept valid input
    const normalized = emailOrPhone.toLowerCase().trim();
    if (normalized.includes('admin') || normalized === 'director@missionrank.com') {
      setUser(DEMO_USERS.admin);
      setAuthModalState({ isOpen: false, view: 'login' });
      return { success: true, role: 'admin' };
    }
    if (normalized.includes('teacher') || normalized.includes('verma') || normalized === 'rajesh.verma@missionrank.com') {
      setUser(DEMO_USERS.teacher);
      setAuthModalState({ isOpen: false, view: 'login' });
      return { success: true, role: 'teacher' };
    }
    
    // Default student login
    const studentUser = {
      ...DEMO_USERS.student,
      email: normalized.includes('@') ? normalized : 'student@missionrank.com',
      phone: normalized.startsWith('+') || /^\d+$/.test(normalized) ? normalized : '+91 98765 43210',
    };
    setUser(studentUser);
    setAuthModalState({ isOpen: false, view: 'login' });
    return { success: true, role: 'student' };
  };

  const register = (userData) => {
    const newUser = {
      id: 'user-' + Date.now(),
      name: userData.name || 'New Student',
      email: userData.email,
      phone: userData.phone || '+91 98765 00000',
      role: 'student',
      targetExam: userData.targetExam || 'JEE Main & Advanced 2025',
      classLevel: userData.classLevel || 'Class 12',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      streakDays: 1,
      hoursStudied: 0,
      testsTaken: 0,
      avgScore: '0%',
      bio: 'Enthusiastic learner at Mission Rank Academy.'
    };
    setUser(newUser);
    setAuthModalState({ isOpen: false, view: 'login' });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role) => {
    if (role === 'admin') setUser(DEMO_USERS.admin);
    else if (role === 'teacher') setUser(DEMO_USERS.teacher);
    else setUser(DEMO_USERS.student);
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => {
      const updated = { ...prev, ...updatedFields };
      setStored('mra_current_user', updated);
      return updated;
    });
  };

  const openAuthModal = (view = 'login') => {
    setAuthModalState({ isOpen: true, view });
  };

  const closeAuthModal = () => {
    setAuthModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || 'guest',
        login,
        register,
        logout,
        switchRole,
        updateProfile,
        authModalState,
        openAuthModal,
        closeAuthModal,
        isProfileModalOpen,
        setIsProfileModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
