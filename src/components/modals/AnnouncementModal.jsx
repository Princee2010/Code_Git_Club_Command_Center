import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Megaphone, AlertTriangle, Users } from 'lucide-react';

export const AnnouncementModal = () => {
  const { activeModal, modalData, closeModal, addAnnouncement, updateAnnouncement } = useApp();
  const isEdit = activeModal === 'edit_announcement';

  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    priority: 'Normal',
    targetAudience: 'All Members',
    message: '',
  });

  useEffect(() => {
    if (isEdit && modalData) {
      setFormData({
        title: modalData.title || '',
        category: modalData.category || 'General',
        priority: modalData.priority || 'Normal',
        targetAudience: modalData.targetAudience || 'All Members',
        message: modalData.message || '',
      });
    } else {
      setFormData({
        title: '',
        category: 'General',
        priority: 'Normal',
        targetAudience: 'All Members',
        message: '',
      });
    }
  }, [isEdit, modalData]);

  if (activeModal !== 'create_announcement' && activeModal !== 'edit_announcement') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.message.trim()) return;

    if (isEdit && modalData) {
      updateAnnouncement(modalData.id, formData);
    } else {
      addAnnouncement(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {isEdit ? 'Edit Announcement' : 'Publish Announcement'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Broadcast notification to Git Club channels
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Announcement Headline *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 🚨 Hackathon Registration Open"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="General">General</option>
                <option value="Event">Event</option>
                <option value="Competition">Competition</option>
                <option value="Workshop">Workshop</option>
                <option value="Important">Important Alert</option>
                <option value="Recruitment">Recruitment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Broadcast Priority *
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Normal">Normal</option>
                <option value="High">High Priority</option>
                <option value="Urgent">Urgent / Emergency</option>
              </select>
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Target Audience
            </label>
            <select
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="All Members">All Members</option>
              <option value="Core Team">Core Team Only</option>
              <option value="Developers">Developers</option>
              <option value="Designers">Designers</option>
              <option value="2nd & 3rd Year">2nd & 3rd Year</option>
              <option value="Workshop Attendees">Workshop Attendees</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Broadcast Message *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Write detailed announcements, guidelines, links, and dates..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              {isEdit ? 'Save Changes' : 'Publish Announcement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
