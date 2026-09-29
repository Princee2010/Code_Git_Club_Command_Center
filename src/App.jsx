import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { ToastContainer } from './components/ToastContainer';

// Pages
import { Dashboard } from './pages/Dashboard';
import { EventsPage } from './pages/EventsPage';
import { MembersPage } from './pages/MembersPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';

// Modals
import { EventModal } from './components/modals/EventModal';
import { EventDetailsModal } from './components/modals/EventDetailsModal';
import { RegistrationsModal } from './components/modals/RegistrationsModal';
import { MemberModal } from './components/modals/MemberModal';
import { MemberProfileModal } from './components/modals/MemberProfileModal';
import { ProjectModal } from './components/modals/ProjectModal';
import { ProjectDetailsModal } from './components/modals/ProjectDetailsModal';
import { AnnouncementModal } from './components/modals/AnnouncementModal';
import { QuickActionsModal } from './components/modals/QuickActionsModal';
import { LoginModal } from './components/modals/LoginModal';

import { GitBranch } from 'lucide-react';

const AppContent = () => {
  const { role } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <Topbar setIsMobileOpen={setIsMobileOpen} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/events" element={<EventsPage />} />
            <Route
              path="/members"
              element={role === 'admin' ? <MembersPage /> : <Navigate to="/" replace />}
            />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route
              path="/analytics"
              element={
                role === 'admin' || role === 'event_lead' ? (
                  <AnalyticsPage />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/settings"
              element={role === 'admin' ? <SettingsPage /> : <Navigate to="/" replace />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md py-6 mt-12 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <GitBranch className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">
                Git Club Command Center
              </span>
              <span>• CSPIT, CHARUSAT University</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Command Center Live
                </span>
              </span>
              <span>•</span>
              <span className="font-mono">v2.4.0 (Production)</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Modals Manager */}
      <EventModal />
      <EventDetailsModal />
      <RegistrationsModal />
      <MemberModal />
      <MemberProfileModal />
      <ProjectModal />
      <ProjectDetailsModal />
      <AnnouncementModal />
      <QuickActionsModal />
      <LoginModal />

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}
