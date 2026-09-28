import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Megaphone,
  Plus,
  Search,
  Filter,
  AlertCircle,
  Clock,
  User,
  Edit,
  Trash2,
  Tag,
  CheckCircle,
  Users,
} from 'lucide-react';

export const AnnouncementsPage = () => {
  const { announcements, role, openModal, deleteAnnouncement } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'General', 'Event', 'Competition', 'Workshop', 'Important', 'Recruitment'];

  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesCategory = selectedCategory === 'All' || ann.category === selectedCategory;
    const matchesSearch =
      ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.targetAudience.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const priorityStyles = {
    Urgent: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
    High: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    Normal: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Club Announcements
            </h1>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
              {announcements.length} Broadcasts
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official announcements, schedule changes, deadlines, and recruitment notifications.
          </p>
        </div>

        {(role === 'admin' || role === 'event_lead') && (
          <button
            onClick={() => openModal('create_announcement')}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Announcement</span>
          </button>
        )}
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search broadcasts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Announcements List */}
      {filteredAnnouncements.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <Megaphone className="w-12 h-12 mx-auto mb-3 text-slate-400 opacity-40" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No announcements found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try choosing another category or clearing your search.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col md:flex-row md:items-start justify-between gap-5 relative overflow-hidden"
            >
              <div className="flex-1 space-y-3">
                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      priorityStyles[ann.priority] || priorityStyles.Normal
                    }`}
                  >
                    {ann.priority} Priority
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {ann.category}
                  </span>

                  <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>Audience: {ann.targetAudience}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {ann.title}
                </h3>

                {/* Message */}
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {ann.message}
                </p>

                {/* Author and Date */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Posted by {ann.author}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ann.timestamp}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons for Admin & Event Lead */}
              {(role === 'admin' || role === 'event_lead') && (
                <div className="flex items-center gap-2 md:self-start shrink-0 pt-2 md:pt-0">
                  <button
                    onClick={() => openModal('edit_announcement', ann)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this announcement?')) {
                        deleteAnnouncement(ann.id);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
