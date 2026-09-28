import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, FolderPlus } from 'lucide-react';

export const ProjectModal = () => {
  const { activeModal, modalData, closeModal, addProject, updateProject } = useApp();
  const isEdit = activeModal === 'edit_project';

  const [formData, setFormData] = useState({
    title: '',
    category: 'AI/ML',
    status: 'Active',
    progress: 75,
    problem: '',
    solution: '',
    technologies: 'React, Python, TailwindCSS',
    github: 'https://github.com/gitclub-charusat/',
    demoUrl: 'https://demo.gitclub.dev',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  });

  useEffect(() => {
    if (isEdit && modalData) {
      setFormData({
        title: modalData.title || '',
        category: modalData.category || 'AI/ML',
        status: modalData.status || 'Active',
        progress: modalData.progress || 50,
        problem: modalData.problem || '',
        solution: modalData.solution || '',
        technologies: Array.isArray(modalData.technologies)
          ? modalData.technologies.join(', ')
          : (modalData.technologies || ''),
        github: modalData.github || 'https://github.com/gitclub-charusat/',
        demoUrl: modalData.demoUrl || '',
        image: modalData.image || '',
      });
    } else {
      setFormData({
        title: '',
        category: 'AI/ML',
        status: 'Active',
        progress: 70,
        problem: '',
        solution: '',
        technologies: 'React, Python, TailwindCSS',
        github: 'https://github.com/gitclub-charusat/',
        demoUrl: 'https://demo.gitclub.dev',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      });
    }
  }, [isEdit, modalData]);

  if (activeModal !== 'add_project' && activeModal !== 'edit_project') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const payload = {
      ...formData,
      progress: Number(formData.progress) || 50,
      technologies: typeof formData.technologies === 'string'
        ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : formData.technologies,
    };

    if (isEdit && modalData) {
      updateProject(modalData.id, payload);
    } else {
      addProject(payload);
    }
  };

  const sampleImages = [
    { label: 'AI/ML', url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80' },
    { label: 'IoT/Green', url: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80' },
    { label: 'DevOps', url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80' },
    { label: 'Mobile', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <FolderPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {isEdit ? 'Edit Project' : 'Add New Project'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Git Club Open Source Showcase
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
          {/* Project Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AI Resume Analyzer"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Domain / Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="AI/ML">AI / Machine Learning</option>
                <option value="Web">Web Application</option>
                <option value="Mobile">Mobile Application</option>
                <option value="IoT">IoT / Embedded</option>
                <option value="Cloud/DevOps">Cloud & DevOps Tooling</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Development Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Active">Active Development</option>
                <option value="Completed">Completed & Deployed</option>
                <option value="In Development">In Planning / MVP</option>
              </select>
            </div>
          </div>

          {/* Progress Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-600 dark:text-slate-400">
                Completion Progress: <strong className="text-emerald-500">{formData.progress}%</strong>
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Problem Statement */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Problem Statement *
            </label>
            <textarea
              required
              rows={2}
              placeholder="What core challenge does this project solve for students or developers?"
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Solution Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Solution Architecture *
            </label>
            <textarea
              required
              rows={2}
              placeholder="Describe the technical solution, algorithms, and key capabilities..."
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Technology Stack (Comma separated) *
            </label>
            <input
              type="text"
              required
              placeholder="React, Flask, Python, PostgreSQL"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* GitHub & Live Demo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                GitHub Repository
              </label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Live Demo URL
              </label>
              <input
                type="url"
                placeholder="https://project.charusat.dev"
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Project Image & Presets */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Project Cover Image
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none mb-2"
            />
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] text-slate-400 shrink-0">Presets:</span>
              {sampleImages.map((img) => (
                <button
                  type="button"
                  key={img.label}
                  onClick={() => setFormData({ ...formData, image: img.url })}
                  className="px-2 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-500 border border-slate-200 dark:border-slate-700 shrink-0 cursor-pointer"
                >
                  {img.label}
                </button>
              ))}
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
              {isEdit ? 'Save Changes' : 'Publish Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
