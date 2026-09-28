import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  Share2,
  CheckCircle2,
  Edit,
  UserCheck,
  Tag,
  ArrowRight,
} from 'lucide-react';

export const EventDetailsModal = () => {
  const {
    activeModal,
    modalData,
    closeModal,
    openModal,
    role,
    currentUser,
    registrations,
    registerForEvent,
    unregisterFromEvent,
    addToast,
  } = useApp();

  if (activeModal !== 'view_event_details' || !modalData) return null;

  const event = modalData;
  const isRegistered = registrations.some(
    (r) => r.eventId === event.id && (r.email === currentUser.email || r.studentId === currentUser.studentId)
  );

  const capacityPct = Math.min(
    100,
    Math.round(((event.registeredCount || 0) / (event.capacity || 100)) * 100)
  );

  const handleRegisterToggle = () => {
    if (isRegistered) {
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

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      type: 'info',
      title: 'Link Copied',
      message: `Event link for "${event.title}" copied to clipboard!`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Banner with Close & Badges */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden shrink-0">
          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors backdrop-blur-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Status pills */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-md">
              {event.type}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                event.status === 'Upcoming'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-700/80 text-slate-300'
              }`}
            >
              {event.status}
            </span>
          </div>

          {/* Title on banner bottom */}
          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {event.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                {event.formattedDate || event.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {event.time}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {event.venue}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Registrations
              </span>
              <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                <Users className="w-4 h-4 text-emerald-500" />
                <span>{event.registeredCount || 0}</span>
                <span className="text-xs text-slate-400 font-normal">/ {event.capacity}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Fill Rate
              </span>
              <div className="text-lg font-bold text-emerald-500 mt-0.5">
                {capacityPct}%
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Deadline
              </span>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                {event.registrationDeadline || '24 hrs before'}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Certification
              </span>
              <div className="text-sm font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>Verified</span>
              </div>
            </div>
          </div>

          {/* Capacity Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-600 dark:text-slate-400">
                Seat Reservation Status
              </span>
              <span className="text-emerald-500">
                {(event.capacity || 100) - (event.registeredCount || 0)} seats remaining
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${capacityPct}%` }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              About This Event
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Speakers / Leads */}
          {event.speakers && event.speakers.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Speakers & Mentors
              </h4>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(event.speakers) ? event.speakers : [event.speakers]).map(
                  (spk, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-2"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{spk}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Topics Covered
              </h4>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(event.tags) ? event.tags : [event.tags]).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Share event link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Admin / Event Lead controls: View Registrations & Edit */}
            {(role === 'admin' || role === 'event_lead') && (
              <>
                <button
                  onClick={() => openModal('view_registrations', event)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold border border-emerald-500/40 text-emerald-500 hover:bg-emerald-500/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>View Registrations ({event.registeredCount || 0})</span>
                </button>

                <button
                  onClick={() => openModal('edit_event', event)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Event</span>
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {event.status === 'Upcoming' ? (
              <button
                onClick={handleRegisterToggle}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer ${
                  isRegistered
                    ? 'bg-rose-500/10 text-rose-500 border border-rose-500/30 hover:bg-rose-500/20 shadow-rose-500/10'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 active:scale-95'
                }`}
              >
                {isRegistered ? (
                  <>
                    <X className="w-4 h-4" />
                    <span>Cancel Registration</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Register for Event</span>
                  </>
                )}
              </button>
            ) : (
              <span className="px-4 py-2 text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-xl">
                Event Concluded
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
