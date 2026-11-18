# MISSION RANK ACADEMY
> **Your Mission. Your Rank. Your Future.**

Mission Rank Academy is a modern, professional, fully responsive educational web platform designed for students preparing for competitive examinations such as **JEE Main & Advanced, NEET-UG, CUET**, and **School Board Examinations (Classes 9, 10, 11, and 12)**.

---

## 🌟 Key Features

### 1. Website Design & Branding
- **Signature Color Palette**: Deep Navy Blue (`#0B192C` / `#1E3E62`), Crisp White, and Metallic Gold (`#F59E0B` / `#D4AF37`).
- **Fully Responsive**: Seamlessly adapts to mobile phones, tablets, laptops, and desktop screens with bottom mobile navigation.
- **Dark & Light Mode**: Instant one-click toggle with persistent local preference.
- **Micro-Interactions**: Floating rank badges, smooth accordion transitions, confetti celebration on enrollment, and live status pulses.

### 2. Homepage & Discovery
- **Hero Section**: Headline *"Your Mission. Your Rank. Your Future."*, quick course search, rank predictor badges, and CTA buttons (*Explore Courses*, *Join Free Trial*).
- **Featured Flagship Batches**: Filterable by Exam (JEE, NEET, CUET) and Class (9, 10, 11, 12) with syllabus previews.
- **Key Statistics**: 50,000+ Enrolled Students, 450+ Comprehensive Courses, 120+ Master Faculty, 98.4% Selection Rate.
- **Master Faculty**: Profiles of senior educators from IITs and AIIMS with experience and top AIR selections.
- **Achievements & Testimonials**: AIR 3, AIR 12, 99.94%tile student scorecards and verified reviews.
- **Interactive FAQ**: Expandable accordion answering common student and parent inquiries.
- **Rich Footer**: Helpline numbers, WhatsApp desk, social links, accreditation badges, and Kota campus address.

### 3. Student Authentication & Multi-Role Access
- **Complete Auth System**: Registration, Login, Logout, Forgot Password with OTP simulation.
- **Role-Based Dashboards**:
  - **Student**: Learning streak, enrolled courses, lecture player, downloaded notes, test reports, doubt clinic.
  - **Teacher**: Manage assigned batches, upload lectures, upload notes, schedule live streams, reply to student doubts.
  - **Administrator**: Executive KPIs, add/edit/delete courses, user directory, Razorpay transactions, broadcast notifications.
- **⚡ 1-Click Demo Persona Switcher**: In the navigation bar, quickly switch between Student (*Aarav*), Teacher (*Dr. Verma*), and Admin (*Anita Roy*).

### 4. Interactive Live Classes
- Real-time scheduled live sessions with countdown clocks and *"LIVE NOW"* indicators.
- **Interactive Classroom Studio**:
  - High-definition video player.
  - Real-time student chat room.
  - Live in-class polls with instant vote calculation.
  - Hand raise feature with teacher notification.
- Previous class recordings library with attached blackboard notes.

### 5. Recorded Classes & Video Player
- Chapter-wise video lecture library with subject filtering.
- Speed controls (`0.75x`, `1x`, `1.25x`, `1.5x`, `2x`).
- Video progress tracking with *"Mark as Completed"* updating real course progress in `localStorage`.
- In-player notes download and instant doubt submission.
- Access protection: Free preview lectures for all, premium lectures locked until enrollment.

### 6. Study Materials & Notes
- Categorized by Class (9, 10, 11, 12), Subject, and Material Type (Formula Sheets, Revision Notes, PYQs, Important Questions).
- **Interactive PDF Viewer**: Page navigation, zoom in/out, formula highlights, and instant file download.

### 7. Online Test System (NTA CBT Simulator)
- Full Computer Based Test interface matching official NTA JEE/NEET patterns.
- Timed examination countdown with auto-submit warning.
- Negative marking support (`+4` correct, `-1` incorrect).
- Color-coded question status palette (Answered, Not Answered, Marked for Review, Not Visited).
- **Detailed Instant Result Report**:
  - Total score, accuracy percentage, estimated percentile, and projected All India Rank.
  - Subject-wise accuracy breakdown (Physics vs Chemistry vs Maths/Biology).
  - Step-by-step solutions with explanations for all questions.
  - All-India dynamic leaderboard.

### 8. Indian Payment Gateway (Razorpay Simulator)
- Supports UPI (Google Pay, PhonePe, Paytm, BHIM, any UPI ID), Credit/Debit Cards, and Net Banking across 50+ Indian banks.
- Promo coupon discount codes:
  - `RANK100`: 100% Scholarship Discount
  - `MISSION50`: 50% Extra Discount
- Confetti celebration upon success and instant batch enrollment.
- Transaction history with status logs.

---

## 🛠️ Technology Stack
- **Frontend**: React 18, Vite 5, Tailwind CSS 3
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti, Tailwind CSS keyframes
- **Persistence**: `localStorage` backed mock database with real synchronization
