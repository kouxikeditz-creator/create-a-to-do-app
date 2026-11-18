import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { initialCourses } from '../data/coursesData';
import { initialLiveClasses, pastRecordings } from '../data/liveClassesData';
import { initialNotes } from '../data/notesData';
import { initialTests, leaderboardData } from '../data/testsData';
import { initDatabase, getStored, setStored } from '../data/mockDatabase';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Initialize mock DB on startup
  useEffect(() => {
    initDatabase();
  }, []);

  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('mra_theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('mra_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Active navigation view: 'home' | 'courses' | 'live' | 'recorded' | 'notes' | 'tests' | 'dashboard' | 'about' | 'contact'
  const [currentView, setCurrentView] = useState('home');

  // Courses state
  const [courses, setCourses] = useState(() => getStored('mra_custom_courses', initialCourses));
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseDetailOpen, setCourseDetailOpen] = useState(false);

  // Enrolled courses
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    return getStored('mra_enrolled_courses', [
      {
        courseId: 'course-jee-pinnacle',
        enrolledAt: '2026-10-15',
        progress: 42,
        completedLectures: ['l1-1', 'l1-2', 'l2-1']
      }
    ]);
  });

  useEffect(() => {
    setStored('mra_enrolled_courses', enrolledCourses);
  }, [enrolledCourses]);

  const isEnrolled = (courseId) => {
    return enrolledCourses.some(item => item.courseId === courseId);
  };

  // Video Lecture Player state
  const [activeLecturePlayer, setActiveLecturePlayer] = useState({
    isOpen: false,
    course: null,
    chapter: null,
    lecture: null,
  });

  // Live Classes state
  const [liveClasses, setLiveClasses] = useState(() => getStored('mra_live_classes', initialLiveClasses));
  const [activeLiveRoom, setActiveLiveRoom] = useState(null); // When student joins a live class

  // Study Notes state
  const [notes, setNotes] = useState(() => getStored('mra_notes_data', initialNotes));
  const [activePdfNote, setActivePdfNote] = useState(null); // When student views PDF note
  const [downloadedNoteIds, setDownloadedNoteIds] = useState(() => getStored('mra_downloaded_notes', ['note-1', 'note-2']));

  // Online CBT Tests state
  const [tests, setTests] = useState(() => getStored('mra_tests_data', initialTests));
  const [activeCbtTest, setActiveCbtTest] = useState(null); // When student takes exam
  const [testResults, setTestResults] = useState(() => getStored('mra_test_results', []));
  const [currentTestResult, setCurrentTestResult] = useState(null); // Showing scorecard

  // Payments / Checkout state
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    course: null
  });
  const [payments, setPayments] = useState(() => getStored('mra_payments', []));

  // Notifications
  const [notifications, setNotifications] = useState(() => getStored('mra_notifications', []));
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  // Student Doubts
  const [doubts, setDoubts] = useState(() => getStored('mra_student_doubts', []));

  // General Modals
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Search keyword across courses and materials
  const [searchQuery, setSearchQuery] = useState('');

  // Course actions
  const addCourse = (newCourse) => {
    const updated = [newCourse, ...courses];
    setCourses(updated);
    setStored('mra_custom_courses', updated);
  };

  const updateCourse = (id, updatedFields) => {
    const updated = courses.map(c => c.id === id ? { ...c, ...updatedFields } : c);
    setCourses(updated);
    setStored('mra_custom_courses', updated);
  };

  const deleteCourse = (id) => {
    const updated = courses.filter(c => c.id !== id);
    setCourses(updated);
    setStored('mra_custom_courses', updated);
  };

  // Enrollment & Payment
  const initiateEnrollment = (course) => {
    setPaymentModal({ isOpen: true, course });
  };

  const completeEnrollment = (course, paymentMethod = 'UPI (Razorpay)') => {
    const newTxn = {
      id: 'TXN-' + Math.floor(100000 + Math.random() * 900000),
      courseId: course.id,
      courseTitle: course.title,
      amount: course.price,
      method: paymentMethod,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Success'
    };

    const newEnrolled = {
      courseId: course.id,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      completedLectures: []
    };

    const updatedEnrolled = [...enrolledCourses.filter(e => e.courseId !== course.id), newEnrolled];
    setEnrolledCourses(updatedEnrolled);

    const updatedPayments = [newTxn, ...payments];
    setPayments(updatedPayments);
    setStored('mra_payments', updatedPayments);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    setPaymentModal({ isOpen: false, course: null });

    // Add confirmation notification
    addNotification({
      title: 'Course Enrolled Successfully!',
      message: `You now have full access to ${course.title}. Start learning today!`,
      type: 'course'
    });
  };

  // Mark lecture completed
  const markLectureComplete = (courseId, lectureId) => {
    setEnrolledCourses(prev => {
      return prev.map(item => {
        if (item.courseId === courseId) {
          const completed = item.completedLectures || [];
          if (!completed.includes(lectureId)) {
            const nextCompleted = [...completed, lectureId];
            const course = courses.find(c => c.id === courseId);
            const totalLectures = course ? course.chapters.reduce((acc, ch) => acc + ch.lectures.length, 0) : 10;
            const progress = Math.min(100, Math.round((nextCompleted.length / totalLectures) * 100));
            return {
              ...item,
              completedLectures: nextCompleted,
              progress
            };
          }
        }
        return item;
      });
    });
  };

  // Download note
  const downloadNote = (note) => {
    if (!downloadedNoteIds.includes(note.id)) {
      const updated = [...downloadedNoteIds, note.id];
      setDownloadedNoteIds(updated);
      setStored('mra_downloaded_notes', updated);
    }
  };

  // Save CBT test result
  const recordTestResult = (resultData) => {
    const updated = [resultData, ...testResults];
    setTestResults(updated);
    setStored('mra_test_results', updated);
    setCurrentTestResult(resultData);
    setActiveCbtTest(null);

    try {
      if (resultData.percentage >= 60) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.5 }
        });
      }
    } catch (e) {}
  };

  // Notifications
  const addNotification = (notif) => {
    const newNotif = {
      id: 'notif-' + Date.now(),
      title: notif.title,
      message: notif.message,
      time: 'Just now',
      read: false,
      type: notif.type || 'info'
    };
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    setStored('mra_notifications', updated);
  };

  const markAllNotificationsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setStored('mra_notifications', updated);
  };

  // Doubts
  const askDoubt = (doubtData) => {
    const newDoubt = {
      id: 'd-' + Date.now(),
      studentName: doubtData.studentName || 'Student',
      subject: doubtData.subject,
      question: doubtData.question,
      status: 'Pending Review',
      answer: '',
      answeredBy: '',
      date: 'Just now'
    };
    const updated = [newDoubt, ...doubts];
    setDoubts(updated);
    setStored('mra_student_doubts', updated);
  };

  const answerDoubt = (doubtId, answerText, teacherName) => {
    const updated = doubts.map(d => {
      if (d.id === doubtId) {
        return {
          ...d,
          answer: answerText,
          answeredBy: teacherName,
          status: 'Answered'
        };
      }
      return d;
    });
    setDoubts(updated);
    setStored('mra_student_doubts', updated);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currentView,
        setCurrentView,
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        selectedCourse,
        setSelectedCourse,
        courseDetailOpen,
        setCourseDetailOpen,
        enrolledCourses,
        isEnrolled,
        initiateEnrollment,
        completeEnrollment,
        markLectureComplete,
        activeLecturePlayer,
        setActiveLecturePlayer,
        liveClasses,
        setLiveClasses,
        pastRecordings,
        activeLiveRoom,
        setActiveLiveRoom,
        notes,
        setNotes,
        activePdfNote,
        setActivePdfNote,
        downloadedNoteIds,
        downloadNote,
        tests,
        setTests,
        activeCbtTest,
        setActiveCbtTest,
        testResults,
        recordTestResult,
        currentTestResult,
        setCurrentTestResult,
        paymentModal,
        setPaymentModal,
        payments,
        notifications,
        unreadNotifCount,
        addNotification,
        markAllNotificationsRead,
        doubts,
        askDoubt,
        answerDoubt,
        isContactOpen,
        setIsContactOpen,
        isAboutOpen,
        setIsAboutOpen,
        searchQuery,
        setSearchQuery,
        leaderboardData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
