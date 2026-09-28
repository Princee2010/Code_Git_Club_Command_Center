import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Users,
  Calendar,
  FolderGit2,
  Target,
  ArrowUpRight,
  Plus,
  Clock,
  MapPin,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  CalendarPlus,
  UserPlus,
  FolderPlus,
  Megaphone,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';

export const Dashboard = () => {
  const {
    currentUser,
    role,
    metrics,
    events,
    projects,
    activities,
    analyticsData,
    openModal,
  } = useApp();

  const navigate = useNavigate();

  // Find the top upcoming event
  const nextEvent =
    events.find((e) => e.status === 'Upcoming') || events[0];

  // Project status distribution
  const activeProjectsCount = projects.filter((p) => p.status === 'Active').length;
  const completedProjectsCount = projects.filter((p) => p.status === 'Completed').length;
  const inDevProjectsCount = projects.filter((p) => p.status === 'In Development').length;
  const totalProjects = projects.length || 1;

  // Chart data for Event Participation
  const chartData = [
    { month: 'Aug', participants: 90, eventName: 'AI Workshop' },
    { month: 'Sep', participants: 120, eventName: 'Web Workshop' },
    { month: 'Oct', participants: 150, eventName: 'Hackathon 2026' },
  ];

  const kpis = [
    {
      title: 'Members',
      value: metrics.membersCount,
      change: metrics.membersGrowth,
      icon: Users,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      link: '/members',
    },
    {
      title: 'Events',
      value: metrics.eventsCount,
      change: `${metrics.eventsUpcomingCount} upcoming`,
      icon: Calendar,
      color: 'from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30',
      iconBg: 'bg-purple-500/20 text-purple-400',
      link: '/events',
    },
    {
      title: 'Projects',
      value: metrics.projectsCount,
      change: `${metrics.projectsActiveCount} active`,
      icon: FolderGit2,
      color: 'from-blue-500/20 to-cyan-500/10 text-blue-400 border-blue-500/30',
      iconBg: 'bg-blue-500/20 text-blue-400',
      link: '/projects',
    },
    {
      title: 'Participants',
      value: metrics.participantsCount,
      change: metrics.participantsGrowth,
      icon: Target,
      color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
      iconBg: 'bg-amber-500/20 text-amber-400',
      link: '/analytics',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CHARUSAT Git Club Operations Live</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, {currentUser.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Command center overview for club metrics, flagship events, student projects, and real-time activity feeds.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal('login_modal')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Role: <strong className="uppercase text-emerald-400">{role}</strong></span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>
        </div>

        {/* Ambient background glows */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              onClick={() => navigate(kpi.link)}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-200 group cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {kpi.title}
                </span>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${kpi.iconBg}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {kpi.value}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  <span>{kpi.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions Row */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Quick Actions
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Instant shortcut launchers
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => openModal('create_event')}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/40 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all text-center group cursor-pointer"
          >
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-400">
              Create Event
            </span>
          </button>

          <button
            onClick={() => openModal('add_member')}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/40 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all text-center group cursor-pointer"
          >
            <div className="w-10 h-10 mx-auto rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <UserPlus className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-400">
              Add Member
            </span>
          </button>

          <button
            onClick={() => openModal('add_project')}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/40 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all text-center group cursor-pointer"
          >
            <div className="w-10 h-10 mx-auto rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <FolderPlus className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-400">
              Add Project
            </span>
          </button>

          <button
            onClick={() => openModal('create_announcement')}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/40 hover:bg-amber-500/10 hover:border-amber-500/40 transition-all text-center group cursor-pointer"
          >
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Megaphone className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-400">
              Announcement
            </span>
          </button>
        </div>
      </div>

      {/* Main Grid: Upcoming Event + Participation Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Section A: Upcoming Events Hero Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="h-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Next Flagship Event
                </span>
                <span className="text-xs text-slate-400">Section A</span>
              </div>

              {nextEvent ? (
                <div>
                  <div className="relative rounded-2xl overflow-hidden mb-4 h-44 group">
                    <img
                      src={nextEvent.banner}
                      alt={nextEvent.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-slate-950">
                      {nextEvent.type}
                    </span>
                    <span className="absolute bottom-3 left-3 text-xs font-mono font-bold text-white bg-slate-900/80 px-2 py-1 rounded-md backdrop-blur-sm">
                      {nextEvent.registeredCount} / {nextEvent.capacity} Registered
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    {nextEvent.title}
                  </h3>

                  <div className="space-y-2 mt-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      <span>{nextEvent.formattedDate || nextEvent.date} • {nextEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span>{nextEvent.venue}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400 text-sm">
                  No upcoming events scheduled.
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => openModal('view_event_details', nextEvent)}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <span>View Event Details</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Section D: Event Participation Chart (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="h-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Event Participation
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Monthly attendee distribution (Aug - Oct)
                  </p>
                </div>
                <button
                  onClick={() => navigate('/analytics')}
                  className="text-xs font-semibold text-emerald-500 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Full Analytics</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Chart container */}
              <div className="h-64 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis
                      dataKey="month"
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      domain={[0, 180]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#f8fafc',
                        fontSize: '12px',
                      }}
                      formatter={(value, name, item) => [
                        `${value} Participants`,
                        item.payload.eventName,
                      ]}
                    />
                    <Bar
                      dataKey="participants"
                      radius={[8, 8, 0, 0]}
                      animationDuration={1200}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 2 ? '#10b981' : index === 1 ? '#3b82f6' : '#8b5cf6'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-purple-500" /> Aug: 90
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-blue-500" /> Sep: 120
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-500" /> Oct: 150
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Project Summary + Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Section C: Project Summary (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Project Summary
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Live status breakdown across 18 projects
                  </p>
                </div>
                <button
                  onClick={() => navigate('/projects')}
                  className="text-xs font-semibold text-emerald-500 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>All Projects</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress bars matching the brief requirement */}
              <div className="space-y-5 my-6">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      Active Projects
                    </span>
                    <span className="font-mono font-bold text-emerald-500">{activeProjectsCount}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${(activeProjectsCount / totalProjects) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      Completed Projects
                    </span>
                    <span className="font-mono font-bold text-blue-500">{completedProjectsCount}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${(completedProjectsCount / totalProjects) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      Planning / MVP
                    </span>
                    <span className="font-mono font-bold text-amber-500">{inDevProjectsCount}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-500 transition-all duration-500"
                      style={{ width: `${(inDevProjectsCount / totalProjects) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Total Active Repositories: {totalProjects}</span>
              <button
                onClick={() => openModal('add_project')}
                className="text-xs font-bold text-emerald-500 hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Submit New</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section B: Recent Activity Feed (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Recent Activity Feed
                  </h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20">
                  Real-time
                </span>
              </div>

              {/* Feed items matching requirements */}
              <div className="space-y-3.5">
                {activities.slice(0, 4).map((act) => {
                  const colorMap = {
                    emerald: 'bg-emerald-500',
                    blue: 'bg-blue-500',
                    purple: 'bg-purple-500',
                    amber: 'bg-amber-500',
                    cyan: 'bg-cyan-500',
                  };
                  const bulletColor = colorMap[act.color] || 'bg-emerald-500';

                  return (
                    <div
                      key={act.id}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-3 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-colors"
                    >
                      <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${bulletColor}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {act.text}
                        </div>
                        {act.detail && (
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {act.detail}
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {act.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Showing last 4 club audit actions</span>
              <button
                onClick={() => navigate('/announcements')}
                className="text-xs font-semibold text-emerald-500 hover:underline cursor-pointer"
              >
                View Announcements →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
