import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Download,
  Users,
  Award,
  GitPullRequest,
  Sparkles,
  PieChart as PieIcon,
  CheckCircle,
} from 'lucide-react';

export const AnalyticsPage = () => {
  const { analyticsData, metrics, addToast, theme } = useApp();
  const isDark = theme === 'dark';

  const handleExportReport = () => {
    addToast({
      type: 'success',
      title: 'Report Generated',
      message: 'Comprehensive Git Club Fall 2026 Analytics Report downloaded (PDF/CSV).',
    });
  };

  const statCards = [
    { title: 'Total Event Footfall', value: '725+', sub: 'Past 6 months', change: '+24%', icon: Users, color: 'text-emerald-500' },
    { title: 'Avg Event Feedback', value: '4.85 / 5', sub: 'From 400+ reviews', change: '+0.3', icon: Award, color: 'text-amber-500' },
    { title: 'Open PRs Merged', value: '142', sub: 'Across 18 repositories', change: '+18 this mo.', icon: GitPullRequest, color: 'text-blue-500' },
    { title: 'Member Retention', value: '92.4%', sub: 'Semester over semester', change: '+4.1%', icon: TrendingUp, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Club Analytics & Insights
            </h1>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              Live Metrics
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time visualization of participant attendance, membership trajectory, and project statuses.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-700 shadow-md flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics Report</span>
        </button>
      </div>

      {/* Top Stat Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {stat.title}
                </span>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                {stat.value}
              </div>
              <div className="flex items-center justify-between text-xs mt-2 text-slate-500 dark:text-slate-400">
                <span>{stat.sub}</span>
                <span className="text-emerald-500 font-bold">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 1: Event Participation + Member Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Event Participation Bar Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Event Participation (Recent Flagships)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total participants attending workshops & hackathons
                </p>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Attendance
              </span>
            </div>

            <div className="h-72 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.eventParticipation}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? '#334155' : '#e2e8f0'}
                    opacity={0.6}
                  />
                  <XAxis
                    type="number"
                    stroke={isDark ? '#94a3b8' : '#64748b'}
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="event"
                    type="category"
                    stroke={isDark ? '#94a3b8' : '#64748b'}
                    fontSize={11}
                    tickLine={false}
                    width={90}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#0f172a' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#e2e8f0',
                      borderRadius: '12px',
                      color: isDark ? '#f8fafc' : '#0f172a',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px',
                    }}
                    formatter={(val, name, item) => [
                      `${val} Attendees (Capacity: ${item.payload.capacity})`,
                      'Participation',
                    ]}
                  />
                  <Bar
                    dataKey="participants"
                    fill="#10b981"
                    radius={[0, 8, 8, 0]}
                    animationDuration={1000}
                  >
                    {analyticsData.eventParticipation.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 0
                            ? '#10b981'
                            : index === 1
                              ? '#3b82f6'
                              : index === 2
                                ? '#8b5cf6'
                                : '#f59e0b'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-between">
            <span>Peak event: Git Hackathon 2026 (150 participants)</span>
            <span className="text-emerald-500 font-semibold">94% Average Capacity</span>
          </div>
        </div>

        {/* 2. Member Growth Area Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Member Growth (Monthly Progression)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Cumulative club members & registered participants
                </p>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                +55% H2 Growth
              </span>
            </div>

            <div className="h-72 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analyticsData.monthlyGrowth}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? '#334155' : '#e2e8f0'}
                    opacity={0.6}
                  />
                  <XAxis
                    dataKey="month"
                    stroke={isDark ? '#94a3b8' : '#64748b'}
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke={isDark ? '#94a3b8' : '#64748b'}
                    fontSize={12}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#0f172a' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#e2e8f0',
                      borderRadius: '12px',
                      color: isDark ? '#f8fafc' : '#0f172a',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="participants"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorParticipants)"
                    name="Total Participants"
                  />
                  <Area
                    type="monotone"
                    dataKey="members"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorMembers)"
                    name="Club Members"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Members: 248
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Participants: 436
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Project Status Distribution + Branch Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 3. Project Status Pie/Donut Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Project Status Breakdown
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Distribution of 18 club open-source repositories
                </p>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                18 Projects
              </span>
            </div>

            <div className="h-64 w-full flex items-center justify-center mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.projectStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {analyticsData.projectStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#0f172a' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#e2e8f0',
                      borderRadius: '12px',
                      color: isDark ? '#f8fafc' : '#0f172a',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px',
                    }}
                    formatter={(val, name) => [`${val} Projects`, name]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(val) => (
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                        {val}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 text-center text-xs text-slate-500">
            <div>
              <strong className="text-emerald-500 block text-base font-mono">8</strong>
              <span>Active</span>
            </div>
            <div>
              <strong className="text-blue-500 block text-base font-mono">5</strong>
              <span>Completed</span>
            </div>
            <div>
              <strong className="text-amber-500 block text-base font-mono">5</strong>
              <span>In Dev</span>
            </div>
          </div>
        </div>

        {/* 4. Branch Distribution (CE 40%, CSE 35%, IT 25%) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Branch Distribution
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Member participation by CHARUSAT engineering department
                </p>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Engineering
              </span>
            </div>

            <div className="space-y-4 my-3">
              {analyticsData.branchDistribution.map((branch, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: branch.color }}
                      />
                      {branch.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono text-[11px]">
                        ({branch.count} students)
                      </span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        {branch.percentage}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${branch.percentage}%`,
                        backgroundColor: branch.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Primary Hub: CHARUSAT DEPSTAR Campus</span>
            <span className="text-emerald-500 font-bold">248 Enrolled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
