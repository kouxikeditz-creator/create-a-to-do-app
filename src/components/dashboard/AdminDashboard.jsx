import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  IndianRupee, 
  Plus, 
  Trash2, 
  Edit3, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Trophy, 
  Search,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const { 
    courses, 
    addCourse, 
    deleteCourse, 
    payments, 
    notifications, 
    addNotification, 
    tests, 
    notes,
    liveClasses 
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'courses' | 'payments' | 'broadcast' | 'users'
  
  // Add course modal state
  const [newCourseOpen, setNewCourseOpen] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCategory, setCourseCategory] = useState('JEE');
  const [courseClass, setCourseClass] = useState('Class 12');
  const [coursePrice, setCoursePrice] = useState('3999');
  const [courseInstructor, setCourseInstructor] = useState('Dr. Rajesh Verma');
  const [courseDesc, setCourseDesc] = useState('');

  // Broadcast notification state
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Mock Students / Users list
  const [usersList, setUsersList] = useState([
    { id: 'u1', name: 'Aarav Sharma', email: 'aarav.sharma@gmail.com', role: 'student', exam: 'JEE 2025', status: 'Active' },
    { id: 'u2', name: 'Siddhi Agrawal', email: 'siddhi.med@gmail.com', role: 'student', exam: 'NEET 2025', status: 'Active' },
    { id: 'u3', name: 'Dr. Rajesh Verma', email: 'rajesh.verma@missionrank.com', role: 'teacher', exam: 'Senior HOD', status: 'Active' },
    { id: 'u4', name: 'Devansh Tiwari', email: 'devansh.t@gmail.com', role: 'student', exam: 'JEE 2026', status: 'Active' },
    { id: 'u5', name: 'Aditya Nair', email: 'aditya.cuet@gmail.com', role: 'student', exam: 'CUET 2025', status: 'Active' },
  ]);

  // Total calculated revenue from all payments
  const totalRevenue = payments.reduce((acc, p) => acc + (p.amount || 0), 18450000);

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!courseTitle.trim()) return;

    const newC = {
      id: 'course-' + Date.now(),
      title: courseTitle,
      category: courseCategory,
      targetExam: `${courseCategory} 2025/2026`,
      classLevel: courseClass,
      badge: 'New Batch',
      rating: 4.95,
      reviewsCount: 1,
      studentsEnrolled: 1,
      price: parseInt(coursePrice) || 3999,
      originalPrice: (parseInt(coursePrice) || 3999) * 3,
      discountPercent: 67,
      language: 'Hinglish',
      duration: '8 Months',
      lecturesCount: 120,
      notesCount: 65,
      testsCount: 20,
      instructorName: courseInstructor,
      instructorRole: 'Master Educator',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
      description: courseDesc || 'Newly launched comprehensive batch for competitive and school examination excellence.',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      features: [
        'Live interactive classes with instant recording backup',
        'Chapter DPPs & Kota formula sheets',
        '20 NTA Full Mock Tests'
      ],
      chapters: [
        {
          id: 'ch-new-1',
          title: 'Module 1: Conceptual Foundations & High-Yield Derivations',
          lectures: [
            { id: 'lec-new-1', title: '01. Course Orientation & Strategy Overview', duration: '45 min', isFree: true, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
          ]
        }
      ]
    };

    addCourse(newC);
    setNewCourseOpen(false);
    setCourseTitle('');
    setCourseDesc('');
    addNotification({
      title: `Admin Launched New Batch: ${newC.title}`,
      message: `Enrolments now open for ${newC.title}`,
      type: 'course'
    });
  };

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle.trim()) return;

    addNotification({
      title: broadcastTitle,
      message: broadcastMsg,
      type: 'info'
    });

    setBroadcastTitle('');
    setBroadcastMsg('');
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  const handleToggleUserStatus = (id) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        return {
          ...u,
          status: u.status === 'Active' ? 'Suspended' : 'Active'
        };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Admin Executive Header */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border border-gold-500/40 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-purple-600/30 text-purple-300 border border-purple-500/40">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Master Administrator Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Mission Rank Executive Panel
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Signed in as {user?.name} (Director) • Full platform oversight & content management.
          </p>
        </div>

        <button
          onClick={() => setNewCourseOpen(true)}
          className="px-5 py-3 rounded-2xl gold-gradient-bg text-navy-950 font-black text-xs sm:text-sm hover:brightness-110 active:scale-95 shadow-lg shadow-gold-500/20 flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course Batch</span>
        </button>
      </div>

      {/* 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Gross Revenue</span>
          <h3 className="text-2xl font-black text-navy-950 dark:text-white">
            ₹{(totalRevenue / 100000).toFixed(1)} Lakhs
          </h3>
          <span className="text-[11px] text-emerald-500 font-bold block mt-1">+18.4% MoM Growth</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Total Enrolled Students</span>
          <h3 className="text-2xl font-black text-navy-950 dark:text-white">
            52,480
          </h3>
          <span className="text-[11px] text-blue-500 font-bold block mt-1">94% Active Engagement</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Active Batches</span>
          <h3 className="text-2xl font-black text-navy-950 dark:text-white">
            {courses.length} Live
          </h3>
          <span className="text-[11px] text-gold-500 font-bold block mt-1">All Target Exams</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Platform Uptime</span>
          <h3 className="text-2xl font-black text-emerald-500">
            99.98%
          </h3>
          <span className="text-[11px] text-slate-400 font-bold block mt-1">AWS & Cloudflare CDN</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-navy-800 pb-3 overflow-x-auto">
        {[
          { id: 'overview', label: 'Platform Management', icon: BarChart3 },
          { id: 'courses', label: `Manage Courses (${courses.length})`, icon: BookOpen },
          { id: 'payments', label: `Payments & Orders (${payments.length})`, icon: IndianRupee },
          { id: 'users', label: 'User Directory', icon: Users },
          { id: 'broadcast', label: 'Broadcast Notification', icon: Send }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'gold-gradient-bg text-navy-950 shadow-md shadow-gold-500/20'
                : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Quick Content Status */}
          <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 space-y-4">
            <h3 className="font-bold text-base text-navy-950 dark:text-white">
              Academic Assets Overview
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 flex items-center justify-between">
                <span>Total Video Lectures Hosted</span>
                <strong className="text-navy-950 dark:text-white font-black">1,480 Lectures</strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 flex items-center justify-between">
                <span>PDF Study Materials & PYQs</span>
                <strong className="text-navy-950 dark:text-white font-black">{notes.length} Documents</strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 flex items-center justify-between">
                <span>Full-Length CBT Mock Tests</span>
                <strong className="text-navy-950 dark:text-white font-black">{tests.length} Standard Tests</strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 flex items-center justify-between">
                <span>Live Stream Schedules Active</span>
                <strong className="text-navy-950 dark:text-white font-black">{liveClasses.length} Scheduled</strong>
              </div>
            </div>
          </div>

          {/* Recent Enrolments Log */}
          <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 space-y-4">
            <h3 className="font-bold text-base text-navy-950 dark:text-white">
              Recent Transactions (Razorpay)
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-navy-800 text-xs">
              {payments.slice(0, 4).map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-navy-950 dark:text-white">{p.studentName || 'Student'}</h4>
                    <p className="text-[11px] text-slate-500">{p.courseTitle}</p>
                    <span className="text-[10px] text-slate-400">{p.method} • {p.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-sm text-navy-950 dark:text-white">₹{p.amount}</span>
                    <span className="block text-[10px] text-emerald-500 font-bold uppercase">{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MANAGE COURSES CRUD */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-lg text-navy-950 dark:text-white">
              Platform Course Catalog
            </h3>
            <button
              onClick={() => setNewCourseOpen(true)}
              className="px-4 py-2 rounded-xl gold-gradient-bg text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-navy-800 overflow-hidden bg-white dark:bg-navy-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 dark:bg-navy-950 font-bold text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-navy-800">
                  <tr>
                    <th className="p-4">Course Batch</th>
                    <th className="p-4">Exam / Level</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Instructor</th>
                    <th className="p-4">Enrolled</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
                  {courses.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-navy-850 transition-colors">
                      <td className="p-4 font-bold text-navy-950 dark:text-white max-w-xs truncate">
                        {c.title}
                      </td>
                      <td className="p-4 text-slate-500 dark:text-slate-400">
                        {c.category} • {c.classLevel}
                      </td>
                      <td className="p-4 font-extrabold text-navy-950 dark:text-white">
                        ₹{c.price.toLocaleString('en-IN')}
                      </td>
                      <td className="p-4 text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                        {c.instructorName}
                      </td>
                      <td className="p-4 font-bold text-gold-500">
                        {c.studentsEnrolled?.toLocaleString() || 0}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => deleteCourse(c.id)}
                          title="Delete course"
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PAYMENTS LOG */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-lg text-navy-950 dark:text-white">
              Razorpay Settlement & Transactions
            </h3>
            <span className="text-xs text-slate-400">Total: {payments.length} Transactions</span>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-navy-800 overflow-hidden bg-white dark:bg-navy-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 dark:bg-navy-950 font-bold text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-navy-800">
                  <tr>
                    <th className="p-4">Transaction ID</th>
                    <th className="p-4">Student</th>
                    <th className="p-4">Course</th>
                    <th className="p-4">Method</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-navy-850">
                      <td className="p-4 font-mono font-bold text-navy-950 dark:text-white">{p.id}</td>
                      <td className="p-4">{p.studentName || 'Student'}</td>
                      <td className="p-4 text-slate-500 dark:text-slate-400 max-w-xs truncate">{p.courseTitle}</td>
                      <td className="p-4 text-slate-500">{p.method}</td>
                      <td className="p-4 text-slate-500">{p.date}</td>
                      <td className="p-4 font-black text-navy-950 dark:text-white">₹{p.amount}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-500 uppercase">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: USER DIRECTORY */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-lg text-navy-950 dark:text-white">
              Student & Faculty Accounts
            </h3>
            <span className="text-xs text-slate-400">Total: {usersList.length} Verified Users</span>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-navy-800 overflow-hidden bg-white dark:bg-navy-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 dark:bg-navy-950 font-bold text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-navy-800">
                  <tr>
                    <th className="p-4">User Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Target Exam</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-navy-850">
                      <td className="p-4 font-bold text-navy-950 dark:text-white">{u.name}</td>
                      <td className="p-4 text-slate-500">{u.email}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gold-500/20 text-gold-500">
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">{u.exam}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          u.status === 'Active' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleToggleUserStatus(u.id)}
                          className="text-xs font-bold text-gold-600 dark:text-gold-400 hover:underline"
                        >
                          {u.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BROADCAST NOTIFICATIONS */}
      {activeTab === 'broadcast' && (
        <div className="max-w-2xl bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-navy-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-black text-navy-950 dark:text-white">
              Broadcast System-Wide Announcement
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Push alerts instantly to all student dashboards, notifications bells, and mobile devices.
            </p>
          </div>

          <form onSubmit={handleBroadcast} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Announcement Headline
              </label>
              <input
                type="text"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="e.g. SAT Scholarship Results Declared & Free Revision Marathon This Sunday"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-semibold focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Detailed Notification Message
              </label>
              <textarea
                rows={4}
                required
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
                placeholder="Type message to broadcast to all 50,000+ enrolled students..."
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-semibold focus:outline-none focus:border-gold-500 resize-none"
              />
            </div>

            {broadcastSent && (
              <p className="text-emerald-500 font-bold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4" /> Broadcast sent successfully to all student portals!
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl gold-gradient-bg text-navy-950 font-black text-sm hover:brightness-110 active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Broadcast to All Students</span>
            </button>
          </form>
        </div>
      )}

      {/* CREATE NEW COURSE MODAL */}
      {newCourseOpen && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 dark:border-navy-750 space-y-4 my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-800">
              <h3 className="font-black text-lg text-navy-950 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-gold-500" />
                Launch New Course Batch
              </h3>
              <button
                onClick={() => setNewCourseOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="e.g. JEE Main 2026 2-Year Dropper Conqueror"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Exam Category</label>
                  <select
                    value={courseCategory}
                    onChange={(e) => setCourseCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-bold"
                  >
                    <option value="JEE">JEE Main & Advanced</option>
                    <option value="NEET">NEET-UG Medical</option>
                    <option value="CUET">CUET 2025</option>
                    <option value="Class 12">Class 12 Boards</option>
                    <option value="Class 11">Class 11 Foundation</option>
                    <option value="Class 10">Class 10 Board</option>
                    <option value="Class 9">Class 9 Ignite</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Target Class</label>
                  <select
                    value={courseClass}
                    onChange={(e) => setCourseClass(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-bold"
                  >
                    <option value="Class 12 & Droppers">Class 12 & Droppers</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 9">Class 9</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Fee (INR ₹)</label>
                  <input
                    type="number"
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Assigned Faculty</label>
                  <input
                    type="text"
                    value={courseInstructor}
                    onChange={(e) => setCourseInstructor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Batch Description</label>
                <textarea
                  rows={3}
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  placeholder="Course pedagogy, topics covered, and outcomes..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-950 dark:text-white font-semibold resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setNewCourseOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl gold-gradient-bg text-navy-950 font-black hover:brightness-110 active:scale-95 shadow-md"
                >
                  Save & Publish Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
