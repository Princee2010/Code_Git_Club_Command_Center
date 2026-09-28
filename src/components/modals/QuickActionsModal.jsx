import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, UserPlus, FolderPlus, Megaphone, Zap } from 'lucide-react';

export const QuickActionsModal = () => {
  const { activeModal, closeModal, openModal, role } = useApp();

  if (activeModal !== 'quick_action') return null;

  const actions = [
    {
      title: 'Create Event',
      desc: 'Schedule hackathon, workshop, or tech talk',
      icon: Calendar,
      color: 'from-emerald-500 to-teal-500',
      action: () => openModal('create_event'),
      roles: ['admin', 'event_lead'],
    },
    {
      title: 'Add Member',
      desc: 'Register a new developer or core team lead',
      icon: UserPlus,
      color: 'from-blue-500 to-indigo-500',
      action: () => openModal('add_member'),
      roles: ['admin'],
    },
    {
      title: 'Add Project',
      desc: 'Publish active student open-source project',
      icon: FolderPlus,
      color: 'from-purple-500 to-pink-500',
      action: () => openModal('add_project'),
      roles: ['admin', 'member'],
    },
    {
      title: 'Announcement',
      desc: 'Broadcast high-priority news to members',
      icon: Megaphone,
      color: 'from-amber-500 to-orange-500',
      action: () => openModal('create_announcement'),
      roles: ['admin', 'event_lead'],
    },
  ];

  const allowedActions = actions.filter((a) => a.roles.includes(role));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Zap className="w-4 h-4 fill-emerald-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Command Center Quick Actions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose an action to launch immediately
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
          {allowedActions.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-left transition-all group flex flex-col justify-between hover:scale-[1.02] cursor-pointer"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-slate-950 shadow-md mb-3`}
              >
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-emerald-500 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
