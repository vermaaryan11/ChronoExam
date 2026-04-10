# Software Design Document
**Project: ChronoExam - Smart Exam Scheduling System**

---

## 1. Design Principles Applied

In the development of ChronoExam, robust software engineering principles were utilized to ensure the system is maintainable, scalable, and resilient.

### Abstraction
We used abstraction significantly throughout the backend to hide the complex logic of conflict detection and database querying. For instance, the `ScheduleEngine` service abstract away the complexity of checking 2-hour minimum gap constraints, time overlaps, and classroom capacities. The controllers in our API simply call `ScheduleEngine.validate(newSchedule)` without needing to understand the underlying algorithmic logic. In the frontend, React components provide a high degree of abstraction. Generic components like `DataTable` and `ModalForm` abstract away HTML layouts, allowing specific pages (like `StudentDashboard` and `AdminDashboard`) to focus solely on data fetching and rendering.

### Modularity
Modularity is core to both our frontend and backend architectures. The backend is modularized into `routes`, `controllers`, `models`, and `services`. This means changes to the route structure do not impact the business logic inside the controller. Meanwhile, the frontend separates the codebase by features (`pages`, `components`, `context`, `utils`), enabling different team members to work on completely independent modules—such as the student authentication flow versus the admin scheduling interface—without overlap.

### Cohesion
We ensured high cohesion by keeping related functionality tightly grouped. For example, our `User.js` Mongoose model is strictly responsible for user schema definitions, while `authController.js` handles login/registration actions and JWT issuance related to users. This avoids "God Objects" or completely disorganized scripts. A service file like `conflictDetector.js` has a single, cohesive responsibility: finding scheduling conflicts given a set of parameters.

### Low Coupling
We adhered to low coupling by relying on interfaces and standardized RESTful JSON payloads to bridge communication between completely decoupled modules. The React frontend is completely unaware of how the Express backend manages the database; it simply makes HTTP requests via Axios to static API endpoints. If we ever swapped out MongoDB for PostgreSQL, the frontend application would require zero code changes. Additionally, within the backend, we used dependency injection where appropriate so services depend on abstract data payloads instead of tightly tied database objects.

---

## 2. High-Level Architecture

**Overview of System Architecture**
ChronoExam is built using a **Client-Server Architecture**, specifically utilizing the MERN (MongoDB, Express, React, Node.js) stack along with Docker containerization.

*(Please insert your `docs/design/architecture.drawio` diagram here)*

### Why We Chose This Architectural Style:
1. **Separation of Concerns:** By splitting the application into a standalone React frontend and a Node.js backend API, the client UI is entirely uncoupled from server-side database querying.
2. **Scalability:** The client-server model allows us to easily scale the backend servers independently of the frontend application when concurrent users (e.g., thousands of students accessing their schedule simultaneously) increase.
3. **Cross-Platform Readiness:** Because the frontend purely consumes a REST API, building a mobile application in the future using React Native would just require tapping into the same API, reusing the backend logic intact.
4. **Stateless Authentication:** We chose JWT (JSON Web Tokens) rather than session-based auth to maintain statelessness in the client-server interaction. This drastically simplifies scaling the backend since any server instance can handle any authenticated request.

---

## 3. User Interface Design

**Focus on User Experience and Accessibility**

*(Please insert your 6 Figma screens here from the `docs/design` folder)*

Our UI process prioritized clear structure, preventing user errors, and delivering an inclusive experience:

- **Consistent Buttons and Layouts:** We used a standardized design system across the entire React application. For instance, "Primary Actions" (like "Generate Schedule" or "Save Changes") are consistently styled with a bold blue color (`bg-blue-600`), while critical actions (like "Delete") are uniformly mapped to a red variant (`bg-red-600`). This reduces cognitive load on the user.
- **Clear Feedback:** When an administrator attempts to schedule an exam resulting in a room conflict or a student violation of the 2-hour minimum gap, the UI immediately blocks the attempt and displays a clear, actionable toast notification overlay providing the exact reason for the failure (e.g., "Conflict: Room A204 is at capacity").
- **Dark-Themed Aesthetic:** We adopted a modern dark-themed aesthetic that works well with high-contrast elements, reducing eye strain for administrators using the system over long periods while presenting a sleek, modern visual language to students.
- **Mobile-Friendliness:** The React frontend was built with Tailwind CSS, utilizing responsive utility classes (like `md:flex-row`, `w-full`) to ensure that the student portal, in particular, looks flawless and remains fully navigable on small smartphone screens natively in the browser.

---

## 4. Design Decisions & Why

Here is a summary of the 5 most critical design decisions made during development:

1. **Separated Authentication Logic:** We completely isolated auth logic directly to a middleware filter on the API side.
   * **Why?** It ensures low coupling; features like creating schedule items don’t get bloated with token verification code, increasing security and modularity.
2. **Client-side Routing via React Router:** We chose Single Page Application (SPA) architecture for the frontend.
   * **Why?** It prevents full-page reloads when navigating between the Dashboard, Schedule Views, and Profiles, saving massive amounts of latency and improving perceived performance for the end-user.
3. **Rule-Based Conflict Detection over ML:** We opted for a deterministic rule-based engine instead of attempting Machine Learning (ML) predictions for exam schedules.
   * **Why?** Our requirements for "no student overlaps" and "2-hour gaps" are absolute zero-sum constraints, making deterministic algorithms far more accurate and simpler to validate than stochastic models.
4. **Docker Containerization for Dev/Prod Parity:** We encapsulated the database, frontend web server, and backend API into independent Docker definitions.
   * **Why?** To eliminate "it works on my machine" bugs. It standardizes the development environment for all developers on the team seamlessly.
5. **NoSQL Schema Design for Schedules:** We chose MongoDB over a strictly relational SQL structure layout.
   * **Why?** Storing scheduling data, room arrays, and nested subjects fits extremely well as embedded JSON documents, letting us read and update complete "Schedule Objects" in single queries without expensive multi-table joins.

---
**GitHub Repository Link for Review:**
[Insert your GitHub Repo Link here]
