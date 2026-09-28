import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Shield, Lock, CheckCircle2, User, Sparkles, ArrowRight, GitBranch } from 'lucide-react';

export const LoginModal = () => {
  const { activeModal, closeModal, role, switchRole, addToast } = useApp();
  const [selectedRole, setSelectedRole] = useState(role);

  if (activeModal !== 'login_modal') return null;

  const handleLogin = (r) => {
    switchRole(r || selectedRole);
    closeModal();
    addToast({
      type: 'success',
      title: 'Authenticated Successfully',
      message: `Signed in to Git Club Command Center as ${
        (r || selectedRole) === 'admin'
          ? 'Administrator'
          : (r || selectedRole) === 'event_lead'
          ? 'Event Coordinator'
          : 'Club Member'
      }.`,
    });
  };

  const roles = [
    {
      id: 'admin',
      title: 'Administrator',
      person: 'Princee Bhingradiya (Lead Admin)',
      badge: 'Full Command Access',
      color: 'border-emerald-500/50 bg-emerald-500/5 hover:border-emerald-500',
      tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      features: ['All 7 Modules Enabled', 'CRUD on Events, Members, Projects', 'Analytics & Settings Access'],
    },
    {
      id: 'event_lead',
      title: 'Event Lead',
      person: 'Tanvi Panchal (Coordinator)',
      badge: 'Events & Registration Lead',
      color: 'border-purple-500/50 bg-purple-500/5 hover:border-purple-500',
      tagColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      features: ['Create & Edit Events', 'Manage Attendee Registrations & CSV', 'Publish Announcements & Analytics'],
    },
    {
      id: 'member',
      title: 'Club Member',
      person: 'Rahul Patel (3rd Year Dev)',
      badge: 'Developer & Participant',
      color: 'border-blue-500/50 bg-blue-500/5 hover:border-blue-500',
      tagColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      features: ['Browse Events & 1-Click Register', 'Submit New Projects', 'View Announcements & Personal Profile'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6">
        {/* Close */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <GitBranch className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Git Club Access Portal
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select a simulated demo role to explore tailored features
            </p>
          </div>
        </div>

        {/* Role Cards */}
        <div className="space-y-3 mb-6">
          {roles.map((r) => {
            const isCurrent = selectedRole === r.id;
            return (
              <div
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  isCurrent
                    ? 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-950/20 shadow-lg'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={r.avatar}
                    alt={r.title}
                    className="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-500/30"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {r.title}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${r.tagColor}`}>
                        {r.badge}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {r.person}
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1.5">
                      <span>•</span>
                      <span>{r.features[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogin(r.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      isCurrent
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-500 hover:text-slate-950'
                    }`}
                  >
                    <span>Login</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Login Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs text-slate-400">
            Current active: <span className="font-bold uppercase text-emerald-500">{role}</span>
          </div>

          <button
            onClick={() => handleLogin()}
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <span>Proceed to Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
