import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar } from 'lucide-react';

export const EventModal = () => {
  const { activeModal, modalData, closeModal, addEvent, updateEvent } = useApp();
  const isEdit = activeModal === 'edit_event';

  const [formData, setFormData] = useState({
    title: '',
    type: 'Workshop',
    category: 'Workshop',
    date: '2026-10-15',
    time: '10:00 AM - 01:00 PM',
    venue: 'CHARUSAT Innovation Lab, Block 4',
    description: '',
    capacity: 100,
    registrationDeadline: '2026-10-14',
    banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    tags: 'React, Git, WebDev',
    speakers: 'Princee Bhingradiya, Guest Speaker',
  });

  useEffect(() => {
    if (isEdit && modalData) {
      setFormData({
        title: modalData.title || '',
        type: modalData.type || 'Workshop',
        category: modalData.category || 'Workshop',
        date: modalData.date || '2026-10-15',
        time: modalData.time || '10:00 AM - 01:00 PM',
        venue: modalData.venue || '',
        description: modalData.description || '',
        capacity: modalData.capacity || 100,
        registrationDeadline: modalData.registrationDeadline || '',
        banner: modalData.banner || '',
        tags: Array.isArray(modalData.tags) ? modalData.tags.join(', ') : (modalData.tags || ''),
        speakers: Array.isArray(modalData.speakers) ? modalData.speakers.join(', ') : (modalData.speakers || ''),
      });
    } else {
      setFormData({
        title: '',
        type: 'Workshop',
        category: 'Workshop',
        date: '2026-10-15',
        time: '10:00 AM - 01:00 PM',
        venue: 'CHARUSAT Innovation Lab, Block 4',
        description: '',
        capacity: 100,
        registrationDeadline: '2026-10-14',
        banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
        tags: 'React, Git, WebDev',
        speakers: 'Princee Bhingradiya',
      });
    }
  }, [isEdit, modalData]);

  if (activeModal !== 'create_event' && activeModal !== 'edit_event') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const eventPayload = {
      ...formData,
      capacity: Number(formData.capacity) || 100,
      tags: typeof formData.tags === 'string'
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : formData.tags,
      speakers: typeof formData.speakers === 'string'
        ? formData.speakers.split(',').map((s) => s.trim()).filter(Boolean)
        : formData.speakers,
      formattedDate: new Date(formData.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    if (isEdit && modalData) {
      updateEvent(modalData.id, eventPayload);
    } else {
      addEvent(eventPayload);
    }
  };

  const sampleBanners = [
    { label: 'Hackathon', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80' },
    { label: 'Coding / Web', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80' },
    { label: 'AI & Data', url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80' },
    { label: 'Cloud & Tech', url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {isEdit ? 'Edit Event Details' : 'Create New Event'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Command center event publisher for Git Club
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Event Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Event Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Git Hackathon 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Type & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Event Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Hands-on Workshop</option>
                <option value="Tech Talk">Tech Talk / Seminar</option>
                <option value="Bootcamp">Bootcamp</option>
                <option value="Design Sprint">Design Sprint</option>
                <option value="Meetup">Open Source Meetup</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Competition">Competition / Hackathon</option>
                <option value="Workshop">Workshop</option>
                <option value="Tech Talk">Tech Talk</option>
                <option value="General">General Event</option>
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Time Window *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 10:00 AM - 05:00 PM"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Venue & Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Venue *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. CHARUSAT Innovation Lab, Block 4"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Maximum Capacity (Seats)
              </label>
              <input
                type="number"
                min="10"
                max="1000"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Description *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe event curriculum, prerequisites, challenge format, awards..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Banner Preset Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Banner Image URL
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={formData.banner}
              onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none mb-2"
            />
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] text-slate-400 shrink-0">Presets:</span>
              {sampleBanners.map((b) => (
                <button
                  type="button"
                  key={b.label}
                  onClick={() => setFormData({ ...formData, banner: b.url })}
                  className="px-2 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-500 border border-slate-200 dark:border-slate-700 shrink-0"
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags & Speakers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="React, Next.js, Git"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Speakers / Leads
              </label>
              <input
                type="text"
                placeholder="Speaker 1, Lead 2"
                value={formData.speakers}
                onChange={(e) => setFormData({ ...formData, speakers: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
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
              {isEdit ? 'Save Changes' : 'Publish Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
