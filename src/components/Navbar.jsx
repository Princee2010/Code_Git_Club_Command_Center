import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  GitBranch,
  Bell,
  Sun,
  Moon,
  Shield,
  Calendar,
  Users,
  FolderGit2,
  Megaphone,
  BarChart3,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  CheckCircle,
  PlusCircle,
} from 'lucide-react';

export const Navbar = () => {
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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);
  const roleRef = useRef(null);
  const navigate = useNavigate();

  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target)) {
        setShowRoleSelector(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Role permissions for nav items
  const navItems = [
    { name: 'Dashboard', path: '/', icon: GitBranch, roles: ['admin', 'event_lead', 'member'] },
    { name: 'Events', path: '/events', icon: Calendar, roles: ['admin', 'event_lead', 'member'] },
    { name: 'Members', path: '/members', icon: Users, roles: ['admin'] },
    { name: 'Projects', path: '/projects', icon: FolderGit2, roles: ['admin', 'member'] },
    { name: 'Announcements', path: '/announcements', icon: Megaphone, roles: ['admin', 'event_lead', 'member'] },
    { name: 'Analytics', path: '/analytics', icon: BarChart3, roles: ['admin', 'event_lead'] },
    { name: 'Settings', path: '/settings', icon: Settings, roles: ['admin'] },
  ];

  const filteredNav = navItems.filter((item) => item.roles.includes(role));

  const roleLabel = {
    admin: { label: 'Admin', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
    event_lead: { label: 'Event Lead', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
    member: { label: 'Member', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  }[role] || { label: 'Admin', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <GitBranch className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-wider text-slate-900 dark:text-white font-mono">
                    GIT CLUB
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                    CHARUSAT
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                  Command Center
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 ml-4">
              {filteredNav.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 opacity-75" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Action Button for Admin & Event Lead */}
            {(role === 'admin' || role === 'event_lead') && (
              <button
                onClick={() => openModal('quick_action')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
                title="Open Quick Actions"
              >
                <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Quick Actions</span>
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
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[11px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800">
                    Switch Active Role
                  </div>
                  <button
                    onClick={() => {
                      switchRole('admin');
                      setShowRoleSelector(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
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
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                      role === 'event_lead' ? 'text-purple-500 font-bold' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold">Event Lead</span>
                      <span className="text-[10px] text-slate-400">Events & announcements</span>
                    </div>
                    {role === 'event_lead' && <CheckCircle className="w-3.5 h-3.5 text-purple-500" />}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('member');
                      setShowRoleSelector(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                      role === 'member' ? 'text-blue-500 font-bold' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold">Club Member</span>
                      <span className="text-[10px] text-slate-400">View events, register, submit</span>
                    </div>
                    {role === 'member' && <CheckCircle className="w-3.5 h-3.5 text-blue-500" />}
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Notifications Popover */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-3 z-50">
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

            {/* Profile Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer focus:outline-none"
              >
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950" />
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                    {roleLabel.label}
                  </span>
                </div>
                <ChevronDown className="hidden md:block w-3.5 h-3.5 text-slate-400" />
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
                      <span>Switch Account / Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-2">
          {filteredNav.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </NavLink>
          ))}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('quick_action');
              }}
              className="flex-1 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Quick Actions
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
