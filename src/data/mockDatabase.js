// Mock persistent database backed by localStorage
import { initialCourses } from './coursesData';
import { initialLiveClasses } from './liveClassesData';
import { initialNotes } from './notesData';
import { initialTests } from './testsData';

const STORAGE_KEYS = {
  USER: 'mra_current_user',
  ALL_USERS: 'mra_all_users',
  ENROLLED_COURSES: 'mra_enrolled_courses',
  COMPLETED_LECTURES: 'mra_completed_lectures',
  TEST_RESULTS: 'mra_test_results',
  DOWNLOADED_NOTES: 'mra_downloaded_notes',
  COURSES: 'mra_custom_courses',
  LIVE_CLASSES: 'mra_live_classes',
  NOTES: 'mra_notes_data',
  TESTS: 'mra_tests_data',
  PAYMENTS: 'mra_payments',
  NOTIFICATIONS: 'mra_notifications',
  STUDENT_DOUBTS: 'mra_student_doubts',
};

// Preset demo users
export const DEMO_USERS = {
  student: {
    id: 'user-student-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    phone: '+91 98765 43210',
    role: 'student',
    targetExam: 'JEE Main & Advanced 2025',
    classLevel: 'Class 12',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    streakDays: 14,
    hoursStudied: 86,
    testsTaken: 9,
    avgScore: '84.5%',
    bio: 'Aspiring IITian aiming for Top 50 AIR in JEE Advanced 2025. Diligent problem solver.'
  },
  teacher: {
    id: 'user-teacher-1',
    name: 'Dr. Rajesh Verma',
    email: 'rajesh.verma@missionrank.com',
    phone: '+91 98111 22334',
    role: 'teacher',
    subject: 'Physics',
    department: 'Senior HOD',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'B.Tech IIT Delhi, Ph.D. Applied Physics. 16+ years teaching JEE Advanced.'
  },
  admin: {
    id: 'user-admin-1',
    name: 'Anita Roy',
    email: 'director@missionrank.com',
    phone: '+91 99999 88888',
    role: 'admin',
    designation: 'Director of Academics & Operations',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    bio: 'Academic director supervising curriculum, faculty standards, and student outcomes across India.'
  }
};

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Live Class Alert: Physics Rotational Motion',
    message: 'Dr. Rajesh Verma is conducting a live advanced problem session on Rotational Dynamics now!',
    time: '5 mins ago',
    read: false,
    type: 'live'
  },
  {
    id: 'notif-2',
    title: 'New CBT Mock Test Available',
    message: 'All India JEE Main Mock Test 01 is now live with instant percentile analytics.',
    time: '2 hours ago',
    read: false,
    type: 'test'
  },
  {
    id: 'notif-3',
    title: 'Formula Compendium Uploaded',
    message: 'Download the updated 2025 Organic Chemistry Name Reactions Handbook.',
    time: '1 day ago',
    read: true,
    type: 'notes'
  }
];

const DEFAULT_PAYMENTS = [
  {
    id: 'TXN-984210',
    courseId: 'course-jee-pinnacle',
    courseTitle: 'JEE Ultimate Rank Booster (Main + Advanced 2025/2026)',
    amount: 4999,
    method: 'UPI (Google Pay)',
    date: '12 Nov 2026',
    status: 'Success',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma@gmail.com'
  },
  {
    id: 'TXN-984188',
    courseId: 'course-neet-achievers',
    courseTitle: 'NEET Target Medical Achievers 2025/2026 (700+ Mission)',
    amount: 4499,
    method: 'PhonePe UPI',
    date: '10 Nov 2026',
    status: 'Success',
    studentName: 'Siddhi Agrawal',
    studentEmail: 'siddhi.med@gmail.com'
  },
  {
    id: 'TXN-984102',
    courseId: 'course-cuet-complete',
    courseTitle: 'CUET 2025 All-in-One Selection Masterbatch',
    amount: 2999,
    method: 'HDFC NetBanking',
    date: '08 Nov 2026',
    status: 'Success',
    studentName: 'Aditya Nair',
    studentEmail: 'aditya.cuet@gmail.com'
  }
];

const DEFAULT_DOUBTS = [
  {
    id: 'd-1',
    studentName: 'Aarav Sharma',
    subject: 'Physics',
    question: 'In rolling without slipping on an inclined plane, why does static friction not dissipate thermal energy?',
    status: 'Answered',
    answer: 'Because the point of contact is instantaneously at rest relative to the incline surface. The work done by static friction is zero as displacement of point of application is zero.',
    answeredBy: 'Dr. Rajesh Verma',
    date: 'Today'
  },
  {
    id: 'd-2',
    studentName: 'Devansh Tiwari',
    subject: 'Chemistry',
    question: 'Why does NF3 have smaller dipole moment than NH3 although fluorine is more electronegative?',
    status: 'Answered',
    answer: 'In NH3, the N-H bond dipoles reinforce the lone pair dipole. In NF3, the N-F bond dipoles oppose the lone pair dipole moment, leading to cancellation.',
    answeredBy: 'Dr. Meenakshi Sundaram',
    date: 'Yesterday'
  },
  {
    id: 'd-3',
    studentName: 'Meera Iyer',
    subject: 'Mathematics',
    question: 'Can L’Hopital’s rule be applied if limits of f(x) and g(x) approach infinity at different rates?',
    status: 'Pending Review',
    answer: '',
    answeredBy: '',
    date: '2 hours ago'
  }
];

export const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error('Storage read error', e);
    return fallback;
  }
};

export const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error', e);
  }
};

export const initDatabase = () => {
  // Initialize default data if not present
  if (!localStorage.getItem(STORAGE_KEYS.COURSES)) {
    setStored(STORAGE_KEYS.COURSES, initialCourses);
  }
  if (!localStorage.getItem(STORAGE_KEYS.LIVE_CLASSES)) {
    setStored(STORAGE_KEYS.LIVE_CLASSES, initialLiveClasses);
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTES)) {
    setStored(STORAGE_KEYS.NOTES, initialNotes);
  }
  if (!localStorage.getItem(STORAGE_KEYS.TESTS)) {
    setStored(STORAGE_KEYS.TESTS, initialTests);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ENROLLED_COURSES)) {
    // Default enrolled for demo student
    setStored(STORAGE_KEYS.ENROLLED_COURSES, [
      {
        courseId: 'course-jee-pinnacle',
        enrolledAt: '2026-10-15',
        progress: 42,
        completedLectures: ['l1-1', 'l1-2', 'l2-1']
      }
    ]);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PAYMENTS)) {
    setStored(STORAGE_KEYS.PAYMENTS, DEFAULT_PAYMENTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    setStored(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.STUDENT_DOUBTS)) {
    setStored(STORAGE_KEYS.STUDENT_DOUBTS, DEFAULT_DOUBTS);
  }
};
