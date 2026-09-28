import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Globe,
  Users,
  Code2,
  CheckCircle2,
  Edit,
  Clock,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { GithubIcon } from '../Icons';

export const ProjectDetailsModal = () => {
  const { activeModal, modalData, closeModal, openModal, role } = useApp();

  if (activeModal !== 'view_project_details' || !modalData) return null;

  const project = modalData;

  const statusBadge = {
    Active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Completed: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'In Development': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  }[project.status] || 'bg-slate-700 text-slate-300';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Cover Image */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden shrink-0">
          <img
            src={project.image}
            alt={project.title}
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

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-md">
              {project.category}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${statusBadge}`}
            >
              {project.status === 'Active' && (
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
              )}
              {project.status}
            </span>
          </div>

          {/* Title on bottom */}
          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-600 dark:text-slate-400">Project Progress</span>
              <span className="text-emerald-500 font-mono font-bold">{project.progress}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Problem Statement */}
          <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400 mb-1.5 flex items-center gap-1.5">
              <span>The Problem</span>
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-1.5">
              <span>Proposed Solution</span>
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Tech Stack */}
          {project.technologies && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>Technology Stack</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(project.technologies)
                  ? project.technologies
                  : project.technologies.split(',')
                ).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-mono"
                  >
                    {typeof tech === 'string' ? tech.trim() : tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Team Members */}
          {project.teamMembers && project.teamMembers.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Development Team ({project.teamMembers.length})</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.teamMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                  >
                    <img
                      src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={member.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {member.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {member.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white flex items-center gap-2 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}

            {project.demoUrl && project.demoUrl !== '#' && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            {(role === 'admin' || role === 'member') && (
              <button
                onClick={() => openModal('edit_project', project)}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Project</span>
              </button>
            )}

            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
