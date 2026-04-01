# 🎓 ChronoExam — Smart Exam Scheduling System

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Stack-MERN-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

---

## 📌 Project Name & Overview

**ChronoExam** is a full-stack web-based Exam Management System designed for universities. It automates the creation, management, and publishing of exam schedules while enforcing **conflict-free timetabling** — ensuring no student has two exams at the same time and maintaining a **minimum 2-hour gap** between consecutive exams for each student.

Built on the **MERN stack** (MongoDB, Express.js, React.js, Node.js), ChronoExam provides role-based portals for **Administrators** (exam controllers) and **Students**, enabling seamless scheduling workflows, real-time conflict detection, and transparent communication.

---

## ❗ Problem It Solves

Manual exam scheduling at universities is plagued by several critical issues:

| Problem | Impact |
|---------|--------|
| **Exam time clashes** | Students are scheduled for two exams at the same time |
| **Insufficient gap between exams** | Students face back-to-back exams with no break |
| **Room allocation conflicts** | Multiple exams assigned to the same room simultaneously |
| **Manual scheduling overhead** | Administrators spend days creating schedules manually |
| **Poor communication** | Students have no centralized place to view their schedules |
| **No conflict validation** | Errors are discovered only after schedules are published |

**ChronoExam** solves all of these by automating schedule generation with built-in constraint validation, ensuring:
- No two exams for the same student overlap in time
- Minimum **2-hour gap** between consecutive exams per student
- No room double-booking
- Instant conflict detection with clear resolution guidance

---

## 👥 Target Users (Personas)

### 🧑‍💼 Persona 1: Admin / Exam Controller — *"Dr. Meera Sharma"*

| Attribute | Details |
|-----------|---------|
| **Role** | University Exam Controller |
| **Age** | 42 |
| **Tech Comfort** | Moderate — uses Excel and email daily |
| **Goals** | Create conflict-free exam schedules quickly; manage rooms, subjects, and classes; handle student complaints |
| **Pain Points** | Spends 2+ weeks manually scheduling; frequently discovers conflicts after publishing; receives numerous student complaints |
| **Needs** | Automated scheduling with conflict detection; dashboard to manage all entities; complaint resolution system |

### 🎓 Persona 2: Student — *"Aryan Verma"*

| Attribute | Details |
|-----------|---------|
| **Role** | 3rd-year B.Tech Computer Science Student |
| **Age** | 21 |
| **Tech Comfort** | High — uses smartphone and laptop constantly |
| **Goals** | View personal exam timetable; ensure no scheduling conflicts; raise issues if conflicts exist |
| **Pain Points** | Has to manually check schedules across notice boards; worries about exam clashes; has no way to report issues digitally |
| **Needs** | Personalized exam timetable view; instant notifications of schedule changes; easy complaint filing system |

---

## 🌟 Vision Statement

> *"To transform university exam scheduling from a manual, error-prone process into an intelligent, automated, and conflict-free experience — ensuring every student gets a fair and stress-free exam timetable."*

---

## 🎯 Key Features / Goals

### Core Features
1. **Automated Exam Schedule Creation** — Admin creates schedules via an intuitive form with date, time, subject, and room selection
2. **Conflict Detection Engine** — Real-time detection of:
   - Same-time exam clashes for students
   - Violations of the 2-hour minimum gap rule
   - Room double-booking
3. **Student Timetable View** — Students see their personalized exam schedule with filtering and search
4. **Role-Based Access Control** — JWT-based authentication with Admin and Student roles
5. **Room & Hall Management** — CRUD operations for exam venues with capacity tracking
6. **Subject & Class Management** — Manage subjects, classes, and student enrollments
7. **Complaint System** — Students can raise scheduling-related complaints; admins can resolve them
8. **Schedule Publishing** — Draft → Review → Publish workflow for exam schedules

### Stretch Goals
9. **PDF Export** — Download exam timetable as PDF
10. **Email Notifications** — Automated alerts when schedules are published or updated
11. **Dashboard Analytics** — Visual stats on upcoming exams, room utilization, conflict rates
12. **Excel Import/Export** — Bulk upload of subjects, students, and schedules via Excel files

---

## 📊 Success Metrics

| Metric | Target |
|--------|--------|
| Scheduling conflicts detected pre-publish | **100%** (zero conflicts slip through) |
| Reduction in manual scheduling effort | **> 80%** compared to manual process |
| 2-hour gap enforcement accuracy | **100%** compliance |
| Schedule generation time | **< 10 seconds** for a full department |
| Student satisfaction score | **> 4.0 / 5.0** on usability survey |
| System uptime | **99.5%** during exam scheduling period |
| Average complaint resolution time | **< 24 hours** |

---

## ⚠️ Assumptions & Constraints

### Assumptions
- Accurate course enrollment data is available and up-to-date
- Room capacities and availability are pre-defined in the system
- Each student is enrolled in a known set of subjects
- The university operates on a semester-based exam schedule
- Admin users have basic web browsing skills
- Students have access to internet-connected devices

### Constraints
- **Technology Stack**: MERN (MongoDB, Express.js, React.js, Node.js) — fixed for this project
- **Single University Scope**: Designed for one university at a time (not multi-tenant)
- **Browser-Based Only**: No native mobile apps (responsive web design only)
- **No AI/ML**: Scheduling uses rule-based conflict detection, not machine learning
- **Academic Timeline**: Development constrained to one semester
- **Data Dependencies**: Schedule accuracy depends entirely on input data quality
- **Minimum Gap Rule**: Fixed at 2 hours — not configurable per department in v1

---

## 🧠 MoSCoW Prioritization

### ✅ Must Have (Critical for MVP)
| # | Feature |
|---|---------|
| 1 | User authentication (Admin & Student login with JWT) |
| 2 | Admin — Create, Read, Update, Delete exam schedules |
| 3 | Conflict detection: no overlapping exams for the same student |
| 4 | 2-hour minimum gap enforcement between consecutive student exams |
| 5 | Student — View personalized exam timetable |
| 6 | Room/Hall management (CRUD) |
| 7 | Subject & Class management (CRUD) |
| 8 | Admin Dashboard with quick stats |
| 9 | Role-based access control (Admin vs Student) |
| 10 | Room conflict detection (no double-booking) |

### 👍 Should Have (Important but not blocking)
| # | Feature |
|---|---------|
| 11 | Student complaint filing system |
| 12 | Admin complaint resolution interface |
| 13 | Schedule publishing workflow (draft → publish) |
| 14 | Student notifications on schedule changes |
| 15 | Search and filter exams by subject, date, room |
| 16 | Excel import for bulk student/subject data |

### ⭐ Could Have (Nice to have)
| # | Feature |
|---|---------|
| 17 | PDF export of exam timetable |
| 18 | Email notifications for schedule updates |
| 19 | Dashboard analytics and charts |
| 20 | Excel export of schedules |
| 21 | Calendar view (weekly/monthly) for exam schedules |
| 22 | Dark mode / theme toggle |

### ❌ Won't Have (Out of scope for v1)
| # | Feature |
|---|---------|
| 23 | Native mobile application (iOS/Android) |
| 24 | AI/ML-based schedule optimization |
| 25 | Multi-university/tenant support |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                         CHRONOEXAM ARCHITECTURE                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐    HTTP/REST    ┌─────────────────┐    Mongoose    │
│  │   FRONTEND  │ ◄────────────► │    BACKEND       │ ◄──────────►  │
│  │  React.js   │    (Axios)     │  Node.js/Express │               │
│  │  Port: 3000 │                │  Port: 8000      │   ┌────────┐  │
│  └─────────────┘                │                   │   │MongoDB │  │
│       │                         │  ┌─────────────┐  │   │  DB    │  │
│       │                         │  │ JWT Auth    │  │   │Port:   │  │
│       ▼                         │  │ Middleware  │  │   │27017   │  │
│  ┌─────────────┐                │  └─────────────┘  │   └────────┘  │
│  │   Screens   │                │  ┌─────────────┐  │               │
│  │ • Login     │                │  │ Scheduling  │  │               │
│  │ • Dashboard │                │  │ Engine +    │  │               │
│  │ • Schedule  │                │  │ Conflict    │  │               │
│  │ • Timetable │                │  │ Detection   │  │               │
│  └─────────────┘                │  └─────────────┘  │               │
│                                 └─────────────────┘                 │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │                    DOCKER CONTAINERS                          │    │
│  │  ┌──────────┐  ┌──────────────┐  ┌─────────────────────┐    │    │
│  │  │ Frontend │  │   Backend    │  │     MongoDB         │    │    │
│  │  │Container │  │  Container   │  │    Container        │    │    │
│  │  └──────────┘  └──────────────┘  └─────────────────────┘    │    │
│  └──────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
```

> 📐 **Detailed architecture diagram available**: See [`docs/architecture.drawio`](docs/architecture.drawio) — open in [Draw.io](https://app.diagrams.net/)

---

## 📁 Folder Structure

```
ChronoExam/
├── client/                     # React.js Frontend
│   ├── public/                 # Static assets (index.html, favicon)
│   ├── src/
│   │   ├── App.js              # Main React application
│   │   ├── index.js            # React entry point
│   │   ├── assets/             # Images, icons, styles
│   │   ├── constants/          # API URLs, config constants
│   │   ├── environment/        # Environment-specific configs
│   │   ├── screens/            # Page components
│   │   │   ├── admin/          # Admin screens (dashboard, schedules, rooms)
│   │   │   ├── auth/           # Login/Register screens
│   │   │   ├── student/        # Student screens (timetable, complaints)
│   │   │   └── shared/         # Shared UI components
│   │   └── store/              # Redux state management
│   ├── Dockerfile              # Frontend Docker config
│   └── package.json            # Frontend dependencies
│
├── server/                     # Node.js/Express Backend
│   ├── config/                 # Database & app configuration
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js             # User model (admin/student)
│   │   ├── Schedule.js         # Exam schedule model
│   │   ├── Subject.js          # Subject model
│   │   ├── Class.js            # Class/section model
│   │   ├── Room.js             # Exam room model
│   │   ├── Slot.js             # Time slot model
│   │   └── Complaint.js        # Student complaint model
│   ├── routes/                 # API routes
│   │   ├── api/                # REST endpoints
│   │   │   ├── schedule.js     # Schedule CRUD + conflict detection
│   │   │   ├── user.js         # User management
│   │   │   ├── subject.js      # Subject management
│   │   │   ├── class.js        # Class management
│   │   │   ├── complaint.js    # Complaint management
│   │   │   └── file.js         # File upload/download
│   │   └── auth.js             # Authentication routes
│   ├── utilities/              # Helper functions
│   ├── socket/                 # WebSocket for real-time updates
│   ├── seeder/                 # Database seeders
│   └── app-config.js           # Express middleware setup
│
├── docs/                       # Documentation
│   ├── architecture.drawio     # System architecture diagram
│   ├── wireframes/             # Wireframe mockups
│   └── user-stories.md         # 25 user stories with details
│
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── Dockerfile                  # Backend Docker config
├── docker-compose.yml          # Multi-container Docker setup
├── package.json                # Backend dependencies
└── app.js                      # Server entry point
```

---

## 🌿 Branching Strategy

This project follows **[GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)** — a lightweight, branch-based workflow.

### Branch Structure

```
main (stable, production-ready)
 │
 ├── feature/exam-scheduling      ← Scheduling algorithm & conflict detection
 ├── feature/admin-dashboard      ← Admin portal & management screens
 ├── feature/student-portal       ← Student timetable & complaint views
 ├── feature/docker-setup         ← Docker configuration & containerization
 └── bugfix/conflict-detection    ← Bug fixes
```

### Workflow Rules

1. **`main`** branch is always deployable and stable
2. **Create a feature branch** from `main` for every new feature: `feature/<name>`
3. **Commit often** with clear, descriptive messages
4. **Open a Pull Request** when the feature is ready for review
5. **Review and merge** into `main` after approval
6. **Delete the feature branch** after merging

### Branch Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<name>` | `feature/exam-scheduling` |
| Bug Fix | `bugfix/<name>` | `bugfix/conflict-detection` |
| Hotfix | `hotfix/<name>` | `hotfix/login-crash` |
| Docs | `docs/<name>` | `docs/api-documentation` |

---

## 🚀 Quick Start — Local Development

### Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | v14+ | [nodejs.org](https://nodejs.org/) |
| **npm** | v6+ | Comes with Node.js |
| **MongoDB** | v4.4+ | [mongodb.com](https://www.mongodb.com/try/download) |
| **Docker Desktop** | Latest | [docker.com](https://www.docker.com/products/docker-desktop/) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

---

### Option 1: Docker (Recommended) 🐳

The fastest way to get started — runs the entire stack in containers.

```bash
# 1. Clone the repository
git clone https://github.com/vermaaryan11/ChronoExam.git
cd ChronoExam

# 2. Copy environment variables
cp .env.example .env

# 3. Build and start all containers
docker-compose up --build

# 4. Access the application
#    Frontend:  http://localhost:3000
#    Backend:   http://localhost:8000
```

**To stop:**
```bash
docker-compose down
```

**To rebuild after code changes:**
```bash
docker-compose up --build
```

---

### Option 2: Manual Setup

```bash
# 1. Clone the repository
git clone https://github.com/vermaaryan11/ChronoExam.git
cd ChronoExam

# 2. Copy environment variables
cp .env.example .env
# Edit .env with your MongoDB connection string

# 3. Install backend dependencies
npm install

# 4. Install frontend dependencies
cd client
npm install --legacy-peer-deps
cd ..

# 5. Start MongoDB (must be running locally)
# On Windows: Start MongoDB service from Services panel
# On Mac/Linux: mongod --dbpath /data/db

# 6. Seed the database (optional — loads sample data)
npm run seed

# 7. Start the backend server
npm run server
# Backend runs at http://localhost:8000

# 8. In a new terminal, start the frontend
npm run client
# Frontend runs at http://localhost:3000
```

---

### Default Credentials (After Seeding)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@chronoexam.com | admin123 |
| Student | student@chronoexam.com | student123 |

---

## 🛠️ Local Development Tools

| Tool | Purpose | Version Used |
|------|---------|-------------|
| **VS Code** | Primary IDE / Code Editor | Latest |
| **Node.js** | JavaScript runtime for backend | v14+ |
| **npm** | Package manager | v6+ |
| **MongoDB Compass** | GUI for MongoDB database | Latest |
| **Docker Desktop** | Containerization platform | Latest |
| **Postman** | API testing and documentation | Latest |
| **Git** | Version control | Latest |
| **nodemon** | Auto-restart server on code changes | v1.19+ |
| **Chrome DevTools** | Frontend debugging and inspection | Built-in |
| **Draw.io** | Architecture & system diagrams | Web-based |
| **Figma** | UI/UX wireframing and prototyping | Free tier |

---

## 🧪 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/register` | User registration | No |
| GET | `/api/schedules` | Get all exam schedules | Yes |
| POST | `/api/schedules` | Create exam schedule | Admin |
| PUT | `/api/schedules/:id` | Update exam schedule | Admin |
| DELETE | `/api/schedules/:id` | Delete exam schedule | Admin |
| GET | `/api/subjects` | Get all subjects | Yes |
| POST | `/api/subjects` | Create subject | Admin |
| GET | `/api/classes` | Get all classes | Yes |
| GET | `/api/rooms` | Get all rooms | Yes |
| POST | `/api/complaints` | File a complaint | Student |
| GET | `/api/complaints` | Get complaints | Admin |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

- **Aryan Verma** — [GitHub](https://github.com/vermaaryan11)

---

<p align="center">
  Built with ❤️ using the MERN Stack
</p>
]]>
