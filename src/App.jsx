import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';

// Home
import { HeroSection } from './components/home/HeroSection';
import { StatsSection } from './components/home/StatsSection';
import { FeaturedCourses } from './components/home/FeaturedCourses';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { TeachersSection } from './components/home/TeachersSection';
import { AchievementsSection } from './components/home/AchievementsSection';
import { FaqSection } from './components/home/FaqSection';

// Views
import { CoursesView } from './components/courses/CoursesView';
import { LiveClassesView } from './components/live/LiveClassesView';
import { RecordedClassesView } from './components/courses/RecordedClassesView';
import { NotesView } from './components/notes/NotesView';
import { TestsView } from './components/tests/TestsView';

// Dashboards
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { TeacherDashboard } from './components/dashboard/TeacherDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';

// Modals
import { CourseDetailModal } from './components/courses/CourseDetailModal';
import { VideoLecturePlayer } from './components/player/VideoLecturePlayer';
import { LiveClassRoomModal } from './components/live/LiveClassRoomModal';
import { PdfViewerModal } from './components/notes/PdfViewerModal';
import { CbtTestModal } from './components/tests/CbtTestModal';
import { TestResultModal } from './components/tests/TestResultModal';
import { PaymentModal } from './components/payment/PaymentModal';
import { AuthModal } from './components/auth/AuthModal';
import { ProfileModal } from './components/auth/ProfileModal';
import { ContactModal } from './components/common/ContactModal';
import { AboutUsModal } from './components/common/AboutUsModal';

const AppContent = () => {
  const { currentView } = useApp();
  const { user, role, isAuthenticated, openAuthModal } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 lg:pb-0">
        
        {/* VIEW: HOME */}
        {currentView === 'home' && (
          <div className="space-y-4">
            <HeroSection />
            <StatsSection />
            <FeaturedCourses />
            <WhyChooseUs />
            <TeachersSection />
            <AchievementsSection />
            <FaqSection />
          </div>
        )}

        {/* VIEW: COURSES */}
        {currentView === 'courses' && <CoursesView />}

        {/* VIEW: LIVE CLASSES */}
        {currentView === 'live' && <LiveClassesView />}

        {/* VIEW: RECORDED CLASSES */}
        {currentView === 'recorded' && <RecordedClassesView />}

        {/* VIEW: NOTES & STUDY MATERIALS */}
        {currentView === 'notes' && <NotesView />}

        {/* VIEW: TESTS (CBT ENGINE) */}
        {currentView === 'tests' && <TestsView />}

        {/* VIEW: DASHBOARDS */}
        {currentView === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {role === 'admin' && <AdminDashboard />}
            {role === 'teacher' && <TeacherDashboard />}
            {role === 'student' && <StudentDashboard />}
            {!isAuthenticated && (
              <div className="text-center py-20 bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-navy-800 p-8 space-y-4">
                <h3 className="text-xl font-bold">Please log in to access your dashboard</h3>
                <p className="text-xs text-slate-500">Access your live classes, notes, and tests by signing in.</p>
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-6 py-3 rounded-xl gold-gradient-bg text-navy-950 font-bold text-sm"
                >
                  Log In Now
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Global Modals & Overlays */}
      <CourseDetailModal />
      <VideoLecturePlayer />
      <LiveClassRoomModal />
      <PdfViewerModal />
      <CbtTestModal />
      <TestResultModal />
      <PaymentModal />
      <AuthModal />
      <ProfileModal />
      <ContactModal />
      <AboutUsModal />

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Footer */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}
