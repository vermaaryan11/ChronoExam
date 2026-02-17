# 🎓 Smart Exam Scheduler System

## 📌 Project Overview
Smart Exam Scheduler is a web-based application designed to automatically generate conflict-free exam timetables for educational institutions.

The system optimizes exam scheduling by considering student enrollments, room capacities, faculty availability, and institutional constraints.

It reduces manual workload and ensures a fair, efficient, and stress-free exam scheduling process.

---

## ❗ Problem Statement
Manual exam scheduling often leads to:

- Student exam clashes  
- Inefficient room allocation  
- Faculty scheduling conflicts  
- Time-consuming manual adjustments  

This system solves these challenges through automated scheduling and conflict detection.

---

## 👥 Target Users

### 🎓 Students
- View personalized exam timetable  
- Download schedule as PDF  
- Receive updates and notifications  

### 🏫 Registrar / Admin
- Generate exam schedules  
- Resolve scheduling conflicts  
- Manage rooms and constraints  

### 👨‍🏫 Faculty / Invigilators
- View invigilation duties  
- Access room and time allocations  

---

## 🌟 Vision Statement
> To simplify exam scheduling by automating timetable generation and eliminating conflicts for a seamless academic experience.

---

## 🎯 Key Features
- Automated exam timetable generation  
- Conflict detection & resolution  
- Room allocation optimization  
- Personalized student schedules  
- PDF download & calendar sync  
- Admin dashboard for schedule control  

---

## 📊 Success Metrics
- Zero student exam clashes  
- Reduced scheduling time by 80%  
- Efficient room utilization  
- Fast schedule generation (< 5 seconds)  

---

## ⚠️ Assumptions & Constraints

### Assumptions
- Accurate course enrollment data is available  
- Room capacities and availability are defined  

### Constraints
- Requires internet & browser access  
- Scheduling accuracy depends on data quality  
- Limited scope due to academic timeline  

---

## 🧩 User Stories (Summary)
- Generate exam timetable automatically  
- Detect and flag scheduling conflicts  
- View personal exam schedule  
- Download timetable as PDF  
- Admin resolves conflicts manually  
- Secure login and role-based access  

---

## 🧠 MoSCoW Prioritization

### ✅ Must Have
- Automatic schedule generation  
- Conflict detection  
- Room allocation logic  
- Student timetable viewing  

### 👍 Should Have
- PDF download & calendar sync  
- Admin conflict resolution tools  

### ⭐ Could Have
- Email notifications  
- Mobile-friendly interface  

### ❌ Won’t Have
- Native mobile app  
- AI performance prediction  

---

## 🏗️ System Architecture

Frontend (React / HTML CSS)  
⬇  
Backend (Flask / Node.js)  
⬇  
Scheduling Algorithm Engine  
⬇  
Database (Students, Courses, Rooms)  
⬇  
Deployment (Docker / Local Server)  

---

## 🧮 Scheduling Workflow

1. Admin uploads course & enrollment data  
2. Define scheduling constraints  
3. System runs scheduling algorithm  
4. Detect overlaps & conflicts  
5. Generate draft timetable  
6. Admin reviews & confirms  
7. Schedule published & notifications sent  

---

## 🌿 Branching Strategy
This project follows GitHub Flow:

- `main` → stable production-ready code  
- `feature-scheduling` → scheduling algorithm  
- `feature-admin-dashboard` → admin features  
- `feature-student-view` → student timetable UI  

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/your-username/exam-scheduler.git

# Go to project folder
cd exam-scheduler

# Install dependencies
npm install
# OR
pip install -r requirements.txt

# Run project
npm start
# OR
python app.py
