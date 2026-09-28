import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Mail,
  GraduationCap,
  Calendar,
  FolderGit2,
  Edit,
  Code,
  CheckCircle,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons';

export const MemberProfileModal = () => {
  const { activeModal, modalData, closeModal, openModal, role, projects, events } = useApp();

  if (activeModal !== 'view_member_profile' || !modalData) return null;

  const member = modalData;

  // Find projects this member might be related to
  const memberProjects = projects.filter((p) =>
    p.teamMembers?.some((tm) => tm.name?.toLowerCase().includes(member.name.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Banner with Avatar */}
        <div className="relative h-32 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 shrink-0">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors backdrop-blur-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6 pt-0 relative flex-1 overflow-y-auto">
          {/* Avatar & Header row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-14 mb-4 gap-4">
            <div className="relative">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-xl"
              />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
            </div>

            <div className="flex items-center gap-2">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-slate-900 dark:hover:bg-slate-800 transition-colors"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {role === 'admin' && (
                <button
                  onClick={() => openModal('edit_member', member)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Member</span>
                </button>
              )}
            </div>
          </div>

          {/* Member Name & Title */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {member.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                {member.domain}
              </span>
            </div>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {member.role}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                {member.year} • {member.branch} (CHARUSAT)
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {member.email}
              </span>
              <span className="font-mono text-emerald-500 font-bold">
                ID: {member.studentId}
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-3 my-5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Events Participated
              </span>
              <div className="text-xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4 text-purple-500" />
                <span>{member.eventsParticipated || 8}</span>
              </div>
            </div>

            <div className="text-center border-l border-slate-200 dark:border-slate-700/60">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Active Projects
              </span>
              <div className="text-xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1.5 mt-0.5">
                <FolderGit2 className="w-4 h-4 text-emerald-500" />
                <span>{member.projectsCount || 4}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {member.bio && (
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Biography & Experience
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/20 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                {member.bio}
              </p>
            </div>
          )}

          {/* Skills */}
          {member.skills && (
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Technical Skills & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(member.skills) ? member.skills : member.skills.split(',')).map(
                  (sk, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
                    >
                      <Code className="w-3 h-3 text-emerald-500" />
                      {typeof sk === 'string' ? sk.trim() : sk}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

          {/* Linked Projects */}
          {memberProjects.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Club Projects Contributed
              </h4>
              <div className="space-y-2">
                {memberProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => openModal('view_project_details', p)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {p.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {p.category} • Progress: {p.progress}%
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
