# ChronoExam — 25 User Stories (Detailed)

> All user stories follow the format: **As a [role], I want [feature], so that [benefit].**
> Each story includes acceptance criteria and MoSCoW priority.

---

## 🔐 Authentication & Authorization

### US-01: Admin Login
**As an** Admin, **I want to** log in with my email and password, **so that** I can access the admin dashboard securely.

**Acceptance Criteria:**
- Admin can enter email and password on the login page
- System validates credentials against the database
- On success, a JWT token is issued and stored
- On failure, an appropriate error message is shown
- Session persists until logout or token expiry

**Priority:** Must Have | **Labels:** `authentication`, `admin`

---

### US-02: Student Login
**As a** Student, **I want to** log in with my university credentials, **so that** I can view my personalized exam schedule.

**Acceptance Criteria:**
- Student can enter email and password on the login page
- System validates credentials and identifies the user as a student
- On success, redirects to the student dashboard
- Role-based routing ensures students cannot access admin pages

**Priority:** Must Have | **Labels:** `authentication`, `student`

---

## 📅 Admin — Schedule Management

### US-03: Create Exam Schedule
**As an** Admin, **I want to** create a new exam schedule by selecting a date, time slot, subject, and room, **so that** exams are organized properly.

**Acceptance Criteria:**
- Form includes: date picker, time slot selector, subject dropdown, room dropdown
- All fields are required
- On submit, the schedule is saved to the database
- A success confirmation is shown

**Priority:** Must Have | **Labels:** `schedule`, `admin`, `core`

---

### US-04: View All Exam Schedules
**As an** Admin, **I want to** view a list of all exam schedules, **so that** I can review and manage them.

**Acceptance Criteria:**
- Schedules are displayed in a table with columns: Date, Time, Subject, Room, Class
- Table supports pagination
- Schedules are sorted by date (upcoming first)

**Priority:** Must Have | **Labels:** `schedule`, `admin`

---

### US-05: Edit Exam Schedule
**As an** Admin, **I want to** edit an existing exam schedule, **so that** I can make corrections or adjustments.

**Acceptance Criteria:**
- Admin can click "Edit" on any schedule entry
- Pre-populated form opens with current values
- Changes are validated before saving
- Conflict detection runs on the updated schedule

**Priority:** Must Have | **Labels:** `schedule`, `admin`

---

### US-06: Delete Exam Schedule
**As an** Admin, **I want to** delete an exam schedule, **so that** I can remove cancelled or incorrect exams.

**Acceptance Criteria:**
- Admin can click "Delete" on any schedule entry
- A confirmation dialog appears before deletion
- On confirm, the schedule is removed from the database
- The schedule list refreshes automatically

**Priority:** Must Have | **Labels:** `schedule`, `admin`

---

### US-07: Publish Exam Schedule
**As an** Admin, **I want to** publish exam schedules, **so that** students can view their finalized timetable.

**Acceptance Criteria:**
- Admin can toggle a schedule's status between "Draft" and "Published"
- Only published schedules are visible to students
- A confirmation is shown before publishing

**Priority:** Should Have | **Labels:** `schedule`, `admin`, `workflow`

---

## ⚠️ Conflict Detection & Gap Enforcement

### US-08: Detect Overlapping Exams
**As an** Admin, **I want** the system to automatically detect when a student has two exams scheduled at the same time, **so that** no conflicts occur.

**Acceptance Criteria:**
- When creating or editing a schedule, the system checks all enrolled students
- If any student has another exam at the same date and time, a warning is displayed
- The conflicting exams are listed with student names
- Admin cannot save until conflicts are resolved

**Priority:** Must Have | **Labels:** `conflict-detection`, `core`, `critical`

---

### US-09: Enforce 2-Hour Gap Between Exams
**As an** Admin, **I want** the system to ensure a minimum 2-hour gap between consecutive exams for each student, **so that** students have adequate preparation and travel time.

**Acceptance Criteria:**
- System checks if any student has exams within a 2-hour window on the same day
- If a violation is found, the system warns the admin with details
- The conflicting exams and affected students are listed
- Students can have multiple exams per day as long as the 2-hour gap is maintained

**Priority:** Must Have | **Labels:** `conflict-detection`, `gap-rule`, `core`, `critical`

---

### US-10: View Conflict Report
**As an** Admin, **I want to** view a summary report of all scheduling conflicts, **so that** I can resolve them efficiently.

**Acceptance Criteria:**
- A dedicated "Conflicts" section shows all detected issues
- Each conflict shows: type (overlap/gap violation), affected students, involved exams
- Conflicts can be filtered by type and date

**Priority:** Should Have | **Labels:** `conflict-detection`, `reporting`

---

## 🏫 Admin — Room & Hall Management

### US-11: Add Exam Room
**As an** Admin, **I want to** add exam rooms/halls to the system, **so that** they can be assigned to exam schedules.

**Acceptance Criteria:**
- Form includes: room name, building, capacity, floor
- Room name must be unique
- Room is saved and appears in the room list and schedule dropdowns

**Priority:** Must Have | **Labels:** `room-management`, `admin`

---

### US-12: Edit/Delete Exam Room
**As an** Admin, **I want to** edit or delete exam rooms, **so that** room information stays up-to-date.

**Acceptance Criteria:**
- Admin can edit room details (name, capacity, etc.)
- Admin can delete rooms not currently assigned to any schedule
- If a room is in use, deletion is blocked with a warning

**Priority:** Must Have | **Labels:** `room-management`, `admin`

---

### US-13: Prevent Room Double-Booking
**As an** Admin, **I want** the system to prevent assigning two exams to the same room at the same time, **so that** there are no venue conflicts.

**Acceptance Criteria:**
- When scheduling an exam, the system checks if the selected room is already booked
- If a conflict exists, the system highlights the issue and suggests available rooms
- Double-booked schedules cannot be saved

**Priority:** Must Have | **Labels:** `conflict-detection`, `room-management`, `core`

---

## 📚 Admin — Subject & Class Management

### US-14: Manage Subjects
**As an** Admin, **I want to** add, edit, and delete subjects, **so that** they can be linked to exam schedules.

**Acceptance Criteria:**
- CRUD operations for subjects (name, code, department)
- Subject codes must be unique
- Subjects in use cannot be deleted

**Priority:** Must Have | **Labels:** `subject-management`, `admin`

---

### US-15: Manage Classes/Sections
**As an** Admin, **I want to** manage classes and sections, **so that** student groups are properly organized.

**Acceptance Criteria:**
- CRUD operations for classes (name, department, semester, students)
- Students can be assigned to classes
- Classes are used for conflict checking during scheduling

**Priority:** Must Have | **Labels:** `class-management`, `admin`

---

### US-16: Assign Students to Subjects
**As an** Admin, **I want to** assign students to subjects/classes, **so that** the conflict detection engine knows which exams each student is enrolled in.

**Acceptance Criteria:**
- Admin can bulk-assign students to subjects via the UI or Excel upload
- Student-subject relationships are stored in the database
- These relationships are used by the conflict detection engine

**Priority:** Must Have | **Labels:** `enrollment`, `admin`, `core`

---

## 🎓 Student — View Schedule & Notifications

### US-17: View Personal Exam Timetable
**As a** Student, **I want to** view my personalized exam timetable, **so that** I know when and where my exams are.

**Acceptance Criteria:**
- Student sees only their enrolled exams (not all exams)
- Timetable shows: date, time, subject name, room, building
- Exams are sorted chronologically
- Current/upcoming exams are highlighted

**Priority:** Must Have | **Labels:** `student-portal`, `timetable`

---

### US-18: Search and Filter Exams
**As a** Student, **I want to** search and filter my exam schedule by subject or date, **so that** I can quickly find specific exam information.

**Acceptance Criteria:**
- Search bar allows searching by subject name or code
- Date filter allows filtering by specific date or date range
- Results update in real-time as filters are applied

**Priority:** Should Have | **Labels:** `student-portal`, `search`

---

### US-19: Receive Schedule Update Notifications
**As a** Student, **I want to** be notified when my exam schedule is updated, **so that** I always have the latest information.

**Acceptance Criteria:**
- When an admin modifies a published schedule, affected students see a notification
- Notifications appear in the student dashboard
- Email notification is sent (optional, if email is configured)

**Priority:** Should Have | **Labels:** `notifications`, `student-portal`

---

## 📝 Student — Complaints & Issues

### US-20: File a Scheduling Complaint
**As a** Student, **I want to** file a complaint about my exam schedule, **so that** the admin can review and resolve the issue.

**Acceptance Criteria:**
- Student can submit a complaint with: subject, description, priority
- Complaint is saved and visible to admins
- Student receives a complaint reference number
- Complaint status is trackable (Open → In Progress → Resolved)

**Priority:** Should Have | **Labels:** `complaints`, `student-portal`

---

### US-21: Admin Resolves Complaints
**As an** Admin, **I want to** view and resolve student complaints, **so that** scheduling issues are addressed promptly.

**Acceptance Criteria:**
- Admin sees a list of all complaints with status filters
- Admin can update complaint status and add resolution notes
- Student is notified when their complaint status changes

**Priority:** Should Have | **Labels:** `complaints`, `admin`

---

## 📊 Dashboard & Analytics

### US-22: Admin Dashboard Overview
**As an** Admin, **I want to** see a dashboard with quick statistics, **so that** I have an overview of the exam scheduling status.

**Acceptance Criteria:**
- Dashboard shows: total exams scheduled, upcoming exams count, rooms utilized, active conflicts count, pending complaints
- Quick action buttons for common tasks (create schedule, view conflicts)
- Dashboard updates in real-time

**Priority:** Should Have | **Labels:** `dashboard`, `admin`

---

## 📄 Reports & Export

### US-23: Export Schedule as PDF
**As a** Student, **I want to** download my exam timetable as a PDF, **so that** I have an offline copy for reference.

**Acceptance Criteria:**
- "Download PDF" button is available on the timetable page
- PDF includes student name, all exam details, and university header
- PDF is formatted for A4 printing

**Priority:** Could Have | **Labels:** `export`, `student-portal`

---

### US-24: Import Data via Excel
**As an** Admin, **I want to** bulk import student, subject, and schedule data from Excel files, **so that** I don't have to enter data manually.

**Acceptance Criteria:**
- Admin can upload .xlsx or .csv files
- System validates the data format before importing
- Errors are reported with row numbers and descriptions
- Successfully imported records are saved to the database

**Priority:** Could Have | **Labels:** `import`, `admin`, `bulk-operations`

---

## ⚡ Non-Functional Requirements

### US-25: System Performance & Responsiveness
**As a** User, **I want** the system to load pages within 3 seconds and handle scheduling for 500+ students, **so that** the experience is smooth and reliable.

**Acceptance Criteria:**
- Page load time < 3 seconds on standard broadband
- Schedule generation completes within 10 seconds for up to 500 students
- System handles 50 concurrent users without degradation
- API responses return within 500ms for standard queries
- Responsive design works on desktop and tablet browsers

**Priority:** Must Have | **Labels:** `performance`, `non-functional`, `quality`
