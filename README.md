**AuraFit** is a complete fitness tracking and trainer booking platform designed to connect users with expert trainers, manage classes, book sessions, and engage in a supportive fitness community.

---

## 🌐 Live Site

🔗 [https://fiteness-b11a12.web.app] 

---

## 🚀 Features

### 👤 Authentication & Roles
- Firebase email/password and Google login
- JWT-based secure authentication
- Role-based access: **Admin**, **Trainer**, **Member**
- Conditional Navbar/Footer rendering based on role

### 🏠 Home Page
- Hero Banner with CTA to Classes
- Featured site highlights with icons
- About section describing AuraFit
- Top 6 most booked featured classes
- Dynamic reviews carousel
- Latest 6 forum posts
- Newsletter subscription form (no login required)
- Trainer spotlight/team section

### 💪 Trainer System
- Public trainer listing & details page
- Apply to be a trainer (with multi-day select)
- Trainers can manage their time slots
- Users can book trainer slots and choose packages
- Stripe payment integration for booking
- Review trainers after sessions

### 📚 Classes Page
- Full class listing with pagination (6 per page)
- Filter trainers per class
- Search classes by name (backend)

### 🗳️ Forum Page
- Post voting (upvote/downvote)
- Admin/Trainer badges for posts
- Pagination (6 per page)

### 📊 Admin Dashboard
- View all newsletter subscribers
- Manage all trainers & applications (approve/reject with feedback modal)
- Add new classes
- Financial dashboard with recent transactions and chart (subscribers vs paid members)

### 🧑‍🏫 Trainer Dashboard
- Add/Delete class slots
- View booked slots with member details
- Add forum posts

### 👨‍🎓 Member Dashboard
- Track trainer application status (pending/rejected)
- View booked trainers
- Leave reviews
- Edit profile

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, DaisyUI, React Router
- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Authentication**: Firebase (Email/Google)
- **State Management**: React Query
- **Forms**: React Hook Form
- **Payments**: Stripe
- **Charts**: Recharts
- **Other Tools**: Axios, SweetAlert2, React Select
