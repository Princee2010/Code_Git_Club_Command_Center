import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FolderGit2,
  Plus,
  Search,
  Globe,
  Users,
  Eye,
  Edit,
  Trash2,
  Code,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';

export const ProjectsPage = () => {
  const { projects, role, openModal, deleteProject } = useApp();
  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Active' | 'Completed' | 'In Development'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter((proj) => {
    const matchesTab = activeTab === 'All' || proj.status === activeTab;
    const matchesCategory = categoryFilter === 'All' || proj.category === categoryFilter;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.solution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (proj.technologies &&
        (Array.isArray(proj.technologies)
          ? proj.technologies.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
          : proj.technologies.toLowerCase().includes(searchTerm.toLowerCase())));

    return matchesTab && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Club Projects
            </h1>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              {projects.length} Total Projects
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Student-built open source tools, research prototypes, and web systems at CHARUSAT.
          </p>
        </div>

        {(role === 'admin' || role === 'member') && (
          <button
            onClick={() => openModal('add_project')}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Project</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto">
          {['All', 'Active', 'Completed', 'In Development'].map((tab) => (
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

        {/* Search & Domain Selector */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects, stack..."
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
            <option value="All">All Domains</option>
            <option value="AI/ML">AI / ML</option>
            <option value="Web">Web Apps</option>
            <option value="Mobile">Mobile Apps</option>
            <option value="IoT">IoT & Systems</option>
            <option value="Cloud/DevOps">Cloud / DevOps</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <FolderGit2 className="w-12 h-12 mx-auto mb-3 text-slate-400 opacity-40" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No projects found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or selecting a different status filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => {
            const techList = Array.isArray(proj.technologies)
              ? proj.technologies
              : typeof proj.technologies === 'string'
              ? proj.technologies.split(',').map((t) => t.trim())
              : [];

            const statusStyles = {
              Active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
              Completed: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
              'In Development': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
            }[proj.status] || 'bg-slate-800 text-slate-300';

            return (
              <div
                key={proj.id}
                onClick={() => openModal('view_project_details', proj)}
                className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
              >
                <div>
                  {/* Image Cover */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-md">
                        {proj.category}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${statusStyles}`}
                      >
                        {proj.status === 'Active' && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
                        )}
                        {proj.status}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-extrabold text-white text-base leading-snug line-clamp-1">
                        {proj.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-4">
                    {/* Problem / Solution teaser */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {proj.problem}
                    </p>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                        <span className="text-slate-500">Progress</span>
                        <span className="font-mono text-emerald-500 font-bold">{proj.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Technologies tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {techList.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {techList.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-400">
                          +{techList.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Team Members stack */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <span className="text-slate-400 text-[11px]">
                        Team: {proj.teamMembers?.length || 3} Members
                      </span>
                      <div className="flex -space-x-2">
                        {(proj.teamMembers || []).slice(0, 3).map((tm, idx) => (
                          <img
                            key={idx}
                            src={tm.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                            alt={tm.name}
                            className="w-6 h-6 rounded-full object-cover ring-2 ring-white dark:ring-slate-900"
                            title={tm.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal('view_project_details', proj);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      View
                    </button>

                    {(role === 'admin' || role === 'member') && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal('edit_project', proj);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                        title="GitHub Repo"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {proj.demoUrl && proj.demoUrl !== '#' && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
                        title="Live Demo"
                      >
                        <Globe className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
