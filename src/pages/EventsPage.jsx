import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  CheckCircle2,
} from 'lucide-react';

export const EventsPage = () => {
  const {
    events,
    registrations,
    currentUser,
    role,
    openModal,
    registerForEvent,
    unregisterFromEvent,
  } = useApp();

  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Upcoming' | 'Completed' | 'My Registrations'
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Filter logic
  const filteredEvents = events.filter((evt) => {
    // Search filter
    const matchesSearch =
      evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (evt.tags && evt.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));

    // Tab filter
    let matchesTab = true;
    if (activeTab === 'Upcoming') matchesTab = evt.status === 'Upcoming';
    if (activeTab === 'Completed') matchesTab = evt.status === 'Completed';
    if (activeTab === 'My Registrations') {
      matchesTab = registrations.some(
        (r) =>
          r.eventId === evt.id &&
          (r.email === currentUser.email || r.studentId === currentUser.studentId)
      );
    }

    // Category filter
    const matchesCategory =
      categoryFilter === 'All' || evt.category === categoryFilter || evt.type === categoryFilter;

    return matchesSearch && matchesTab && matchesCategory;
  });

  const isUserRegistered = (eventId) => {
    return registrations.some(
      (r) =>
        r.eventId === eventId &&
        (r.email === currentUser.email || r.studentId === currentUser.studentId)
    );
  };

  const handleRegisterToggle = (e, event) => {
    e.stopPropagation();
    if (isUserRegistered(event.id)) {
      unregisterFromEvent(event.id);
    } else {
      registerForEvent(event.id, {
        name: currentUser.name,
        email: currentUser.email,
        studentId: currentUser.studentId,
        branch: currentUser.department?.slice(0, 3) || 'CE',
        year: currentUser.year || '3rd Year',
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Club Events
            </h1>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              {events.length} Total Events
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Hackathons, technical workshops, bootcamps, and developer meetups at CHARUSAT.
          </p>
        </div>

        {(role === 'admin' || role === 'event_lead') && (
          <button
            onClick={() => openModal('create_event')}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create Event</span>
          </button>
        )}
      </div>

      {/* Search and Tabs Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto">
          {['All', 'Upcoming', 'Completed', 'My Registrations'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search input & Category dropdown */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search events, venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Categories</option>
            <option value="Hackathon">Hackathons</option>
            <option value="Workshop">Workshops</option>
            <option value="Tech Talk">Tech Talks</option>
            <option value="Bootcamp">Bootcamps</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-400 opacity-40" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No events found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or status tab filters to see other events.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => {
            const registered = isUserRegistered(evt.id);
            const fillPct = Math.min(
              100,
              Math.round(((evt.registeredCount || 0) / (evt.capacity || 100)) * 100)
            );

            return (
              <div
                key={evt.id}
                onClick={() => openModal('view_event_details', evt)}
                className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
              >
                <div>
                  {/* Banner Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={evt.banner}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-md">
                        {evt.type}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                          evt.status === 'Upcoming'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800/80 text-slate-300'
                        }`}
                      >
                        {evt.status}
                      </span>
                    </div>

                    {registered && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950 flex items-center gap-1 shadow-md">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Registered</span>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-extrabold text-white text-base leading-snug line-clamp-2">
                        {evt.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3.5">
                    {/* Meta info */}
                    <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{evt.formattedDate || evt.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="truncate">{evt.venue}</span>
                      </div>
                    </div>

                    {/* Registrations Progress */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{evt.registeredCount || 0} Registered</span>
                        </span>
                        <span className="font-mono text-emerald-500">{fillPct}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                          style={{ width: `${fillPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons Footer */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal('view_event_details', evt);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      View
                    </button>

                    {(role === 'admin' || role === 'event_lead') && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal('edit_event', evt);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal('view_registrations', evt);
                          }}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                          title="View attendee list"
                        >
                          <Users className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>

                  {evt.status === 'Upcoming' && (
                    <button
                      onClick={(e) => handleRegisterToggle(e, evt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        registered
                          ? 'bg-rose-500/10 text-rose-500 border border-rose-500/30 hover:bg-rose-500/20'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                      }`}
                    >
                      {registered ? 'Unregister' : 'Register'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
