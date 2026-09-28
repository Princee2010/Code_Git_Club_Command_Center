import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Search,
  UserPlus,
  GraduationCap,
  Calendar,
  FolderGit2,
  Eye,
  Edit,
  Trash2,
  Code,
} from 'lucide-react';

export const MembersPage = () => {
  const { members, role, openModal, deleteMember } = useApp();
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const domains = ['All', 'Core Team', 'Developers', 'Designers', 'AI/ML', 'Cloud/DevOps'];

  const filteredMembers = members.filter((member) => {
    const matchesDomain = selectedDomain === 'All' || member.domain === selectedDomain;
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.skills &&
        (Array.isArray(member.skills)
          ? member.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
          : member.skills.toLowerCase().includes(searchTerm.toLowerCase())));

    return matchesDomain && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Club Members
            </h1>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              248 Total Members
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Student developer network, core coordinators, and contributors across CHARUSAT.
          </p>
        </div>

        {role === 'admin' && (
          <button
            onClick={() => openModal('add_member')}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
          >
            <UserPlus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Member</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Domain Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedDomain === dom
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search members, skills, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Members Grid */}
      {filteredMembers.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <Users className="w-12 h-12 mx-auto mb-3 text-slate-400 opacity-40" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No members found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or selecting another domain category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => {
            const skillsList = Array.isArray(member.skills)
              ? member.skills
              : typeof member.skills === 'string'
              ? member.skills.split(',').map((s) => s.trim())
              : [];

            return (
              <div
                key={member.id}
                onClick={() => openModal('view_member_profile', member)}
                className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 relative"
              >
                <div>
                  {/* Photo & Domain Tag */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/30 group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {member.domain}
                    </span>
                  </div>

                  {/* Name and Department */}
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug group-hover:text-emerald-500 transition-colors">
                    {member.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{member.year} • {member.branch}</span>
                  </div>

                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {member.role}
                  </p>

                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    {skillsList.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                    {skillsList.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-400">
                        +{skillsList.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats Mini Row */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-purple-400" />
                      <span>{member.eventsParticipated || 8} Events</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <FolderGit2 className="w-3 h-3 text-emerald-400" />
                      <span>{member.projectsCount || 3} Projects</span>
                    </span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal('view_member_profile', member);
                    }}
                    className="w-full py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Profile</span>
                  </button>

                  {role === 'admin' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal('edit_member', member);
                      }}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Edit Member"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
