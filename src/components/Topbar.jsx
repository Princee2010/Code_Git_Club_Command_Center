import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Sun,
  Moon,
  Shield,
  Search,
  ChevronDown,
  Menu,
  CheckCircle,
  User,
  Settings,
  LogOut,
  PlusCircle,
  Sparkles,
} from 'lucide-react';

export const Topbar = ({ setIsMobileOpen }) => {
  const {
    theme,
    toggleTheme,
    role,
    switchRole,
    currentUser,
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    openModal,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifRef = useRef(null);
  const roleRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target)) {
        setShowRoleSelector(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roleLabel = {
    admin: { label: 'Admin', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' },
    event_lead: { label: 'Event Lead', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30' },
    member: { label: 'Member', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30' },
  }[role] || { label: 'Admin', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' };

  return (
    <header className="sticky top-0 z-30 w-full h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-colors">
      {/* Left: Mobile hamburger & Global Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center relative w-64 md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search commands, events, members..."
            className="w-full pl-9 pr-8 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls: Role Switcher, Light/Dark Theme, Notifications, Profile */}
      <div className="flex items-center gap-2.5">
        {/* Quick Action Button for Admin & Event Lead */}
        {(role === 'admin' || role === 'event_lead') && (
          <button
            onClick={() => openModal('quick_action')}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Quick Action</span>
          </button>
        )}

        {/* Role Switcher Pill */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setShowRoleSelector(!showRoleSelector)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${roleLabel.color} hover:opacity-90 transition-all cursor-pointer`}
            title="Change active simulation role"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="capitalize">{roleLabel.label}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {showRoleSelector && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1 text-[11px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800">
                Simulate Role
              </div>
              <button
                onClick={() => {
                  switchRole('admin');
                  setShowRoleSelector(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer ${
                  role === 'admin' ? 'text-emerald-500 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-semibold">Administrator</span>
                  <span className="text-[10px] text-slate-400">Full system & CRUD access</span>
                </div>
                {role === 'admin' && <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
              </button>

              <button
                onClick={() => {
                  switchRole('event_lead');
                  setShowRoleSelector(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer ${
                  role === 'event_lead' ? 'text-purple-500 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-semibold">Event Lead</span>
                  <span className="text-[10px] text-slate-400">Events & attendee manager</span>
                </div>
                {role === 'event_lead' && <CheckCircle className="w-3.5 h-3.5 text-purple-500" />}
              </button>

              <button
                onClick={() => {
                  switchRole('member');
                  setShowRoleSelector(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer ${
                  role === 'member' ? 'text-blue-500 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-semibold">Club Member</span>
                  <span className="text-[10px] text-slate-400">View & register for events</span>
                </div>
                {role === 'member' && <CheckCircle className="w-3.5 h-3.5 text-blue-500" />}
              </button>
            </div>
          )}
        </div>

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-800"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600" />
          )}
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-800"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-sm">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Notifications</span>
                  {unreadNotificationsCount > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-bold border border-rose-500/20">
                      {unreadNotificationsCount} new
                    </span>
                  )}
                </div>
                {unreadNotificationsCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-emerald-500 hover:text-emerald-400 font-medium cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No notifications at the moment.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors flex items-start gap-3 ${
                        !notif.read ? 'bg-emerald-50/50 dark:bg-emerald-950/10' : ''
                      }`}
                    >
                      <div
                        className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                          !notif.read ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {notif.title}
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug mt-0.5 line-clamp-2">
                          {notif.message}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 font-mono">{notif.time}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
            />
            <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <div className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  {currentUser.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {currentUser.email}
                </div>
                <div className="mt-1 inline-block text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  ID: {currentUser.studentId}
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/profile');
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Admin Profile</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Settings & Theme</span>
                </button>

                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    openModal('login_modal');
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2.5 cursor-pointer font-medium"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Switch Role / Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
