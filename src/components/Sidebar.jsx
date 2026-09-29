import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  GitBranch,
  Calendar,
  Users,
  FolderGit2,
  Megaphone,
  BarChart3,
  Settings,
  User,
  PlusCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen, collapsed, setCollapsed }) => {
  const { role, currentUser, openModal } = useApp();
  const navigate = useNavigate();

  // Navigation items with role permissions
  const navGroups = [
    {
      label: 'Main Operations',
      items: [
        { name: 'Dashboard', path: '/', icon: GitBranch, roles: ['admin', 'event_lead', 'member'] },
        { name: 'Events', path: '/events', icon: Calendar, roles: ['admin', 'event_lead', 'member'] },
        { name: 'Members', path: '/members', icon: Users, roles: ['admin'] },
        { name: 'Projects', path: '/projects', icon: FolderGit2, roles: ['admin', 'member'] },
        { name: 'Announcements', path: '/announcements', icon: Megaphone, roles: ['admin', 'event_lead', 'member'] },
      ],
    },
    {
      label: 'Insights & System',
      items: [
        { name: 'Analytics', path: '/analytics', icon: BarChart3, roles: ['admin', 'event_lead'] },
        { name: 'Admin Profile', path: '/profile', icon: User, roles: ['admin', 'event_lead', 'member'] },
        { name: 'Settings', path: '/settings', icon: Settings, roles: ['admin'] },
      ],
    },
  ];

  const roleTag = {
    admin: { label: 'Admin', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
    event_lead: { label: 'Event Lead', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' },
    member: { label: 'Member', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  }[role] || { label: 'Admin', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800/80 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header / Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800/80 shrink-0">
          <Link
            to="/"
            onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
            className="flex items-center gap-3 overflow-hidden group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0 group-hover:scale-105 transition-transform">
              <GitBranch className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>

            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-wider text-slate-900 dark:text-white font-mono truncate">
                    GIT CLUB
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                    CSPIT
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase truncate">
                  Command Center
                </span>
              </div>
            )}
          </Link>

          {/* Collapse Button (Desktop Only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Action Button in Sidebar */}
        {(role === 'admin' || role === 'event_lead') && (
          <div className="p-3 pb-1">
            <button
              onClick={() => {
                if (setIsMobileOpen) setIsMobileOpen(false);
                openModal('quick_action');
              }}
              className={`w-full py-2.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                collapsed ? 'px-0' : 'px-4 text-xs'
              }`}
              title="Launch Quick Actions"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5] shrink-0" />
              {!collapsed && <span>Quick Actions</span>}
            </button>
          </div>
        )}

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-6">
          {navGroups.map((group, gIdx) => {
            const visibleItems = group.items.filter((item) => item.roles.includes(role));
            if (!visibleItems.length) return null;

            return (
              <div key={gIdx} className="space-y-1">
                {!collapsed && (
                  <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    {group.label}
                  </div>
                )}

                {visibleItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      } ${collapsed ? 'justify-center px-0' : ''}`
                    }
                    title={collapsed ? item.name : undefined}
                  >
                    <item.icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                    {!collapsed && <span className="truncate">{item.name}</span>}
                  </NavLink>
                ))}
              </div>
            );
          })}
        </div>

        {/* Bottom User Profile Section */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 shrink-0 bg-slate-50/50 dark:bg-slate-900/40">
          <div
            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors ${
              collapsed ? 'justify-center p-1' : ''
            }`}
          >
            <div
              onClick={() => {
                if (setIsMobileOpen) setIsMobileOpen(false);
                navigate('/profile');
              }}
              className="relative cursor-pointer shrink-0"
              title="View profile"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-xl object-cover ring-2 ring-emerald-500/30"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950" />
            </div>

            {!collapsed && (
              <div
                onClick={() => {
                  if (setIsMobileOpen) setIsMobileOpen(false);
                  navigate('/profile');
                }}
                className="flex-1 min-w-0 cursor-pointer text-left"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {currentUser.name}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold border uppercase ${roleTag.color}`}>
                    {roleTag.label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono truncate">
                    {currentUser.studentId}
                  </span>
                </div>
              </div>
            )}

            {!collapsed && (
              <button
                onClick={() => openModal('login_modal')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer shrink-0"
                title="Switch Role or Account"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
