# 🚀 Git Club Command Center

> A next-generation single-pane command center and management platform for university student developers, open-source projects, and technical summits at **CSPIT, CHARUSAT University**.

Built with **React**, **Vite**, **Tailwind CSS v4**, **Recharts**, **Lucide Icons**, and **LocalStorage persistence**.

---

## 🌟 Key Features & Modules

### 1. 🏠 Command Center Dashboard
- **Top Metrics KPI Cards**:
  - 👥 **248 Members** (+12 this mo.)
  - 📅 **12 Events** (3 upcoming)
  - 🚀 **18 Projects** (6 active)
  - 🎯 **436 Participants** (+18%)
- **Section A: Upcoming Flagship Event**: Spotlight card with countdown, venue, time, fill rate, and fast modal inspection.
- **Section D: Event Participation Chart**: Interactive BarChart rendering participant growth across months.
- **Section C: Project Summary**: Visual progress bars tracking Active, Completed, and Planning repositories.
- **Section B: Real-time Activity Feed**: Audit feed logging new members, PR merges, milestones, and broadcasts.
- **⚡ Quick Actions**: 1-click modal launchers for Create Event, Add Member, Add Project, and Publish Announcement.

### 2. 📅 Events Management Module
- Filter by tabs: `All`, `Upcoming`, `Completed`, `My Registrations`.
- Search events by name, tags, or venue.
- **Event Details Modal**: High-res banner, speaker bios, topics covered, and live capacity meter.
- **View Registrations Table Modal**: Search attendees by Student ID, Branch, or Year, with one-click **CSV Export**.
- **1-Click Registration / Cancellation** for club members with instant status sync.

### 3. 👥 Members Directory & Profiles
- 248 member database with domain filtering: `Core Team`, `Developers`, `Designers`, `AI/ML`, `Cloud/DevOps`.
- Detailed member cards with Year & Branch, role badges, skill chips, and GitHub/LinkedIn links.
- **Member Profile Modal**: Biography, contact details, attended events history, and authored projects.
- **Add / Edit Member**: Complete form with validation and quick avatar selector.

### 4. 🚀 Open-Source Projects Showcase
- 18 club repositories with status tabs: `All`, `Active`, `Completed`, `In Development`.
- Filter by technology domain: `AI/ML`, `Web`, `Mobile`, `IoT`, `Cloud/DevOps`.
- **Project Details Modal**: Problem statement, proposed solution architecture, tech stack pills, team member stack, and live demo / GitHub links.
- **Add / Edit Project**: Full progress slider, problem/solution editor, and preset covers.

### 5. 📢 Announcements & Broadcasts
- Priority badges: `Urgent`, `High`, `Normal`.
- Categorized channels: `General`, `Event`, `Competition`, `Workshop`, `Important`, `Recruitment`.
- Target audience filters: All Members, Core Team, Developers, etc.
- Admin & Event Lead edit and delete controls.

### 6. 📊 Analytics & Data Visualizations (Recharts)
- **Event Participation**: Horizontal bar chart comparing attendance across flagships.
- **Member Growth**: Area chart with gradient fills tracking H2 membership expansion.
- **Project Status**: Donut chart breaking down active vs. completed deliverables.
- **Branch Distribution**: Department breakdowns (CE: 40%, CSE: 35%, IT: 25%).
- **Export Analytics Report**: Quick download action for club annual reporting.

### 7. 🔐 Simulated 3-Tier Role System
- **Administrator (Lead Admin - Princee Bhingradiya)**:
  - Unrestricted access to all 7 modules, settings, and full CRUD permissions.
- **Event Lead (Tanvi Panchal)**:
  - Specialized dashboard for events, attendee registrations, CSV exports, announcements, and analytics.
- **Club Member (Rahul Patel)**:
  - Streamlined portal for browsing events, 1-click event reservations, submitting new projects, and viewing personal profile.
- **Interactive Role Switcher**: Quick-switch role at any time from the top navigation bar or the authentication portal.

### 8. ⚙️ Settings & Theme Customization
- **Theme Switcher**: Instant toggle between Dark Mode (Cyber Emerald) and Light Mode.
- **Notification Toggles**: Granular settings for event reminders, member alerts, project updates, and audio chimes.
- **Account Credentials**: Change password simulator.
- **Reset Demo Data**: Factory reset button that instantly restores the original seed dataset.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Modern component-driven UI architecture |
| **Vite 8** | Lightning-fast build and HMR tooling |
| **Tailwind CSS v4** | Modern responsive design with glassmorphism |
| **Lucide Icons** | Clean consistent iconography |
| **Recharts** | Interactive charts (Bar, Area, Pie/Donut) |
| **React Router v7** | Client-side routing and role protection |
| **LocalStorage** | Persistent CRUD state across page reloads |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 💻 Deployment to Vercel

```bash
# Using Vercel CLI
npx vercel
```
Or connect your GitHub repository directly to Vercel; Vite settings will be detected automatically.
