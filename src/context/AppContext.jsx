import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USER,
  INITIAL_EVENTS,
  INITIAL_MEMBERS,
  INITIAL_PROJECTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_ACTIVITIES,
  INITIAL_NOTIFICATIONS,
  INITIAL_REGISTRATIONS,
  ANALYTICS_DATA,
} from '../data/initialData';

const AppContext = createContext();

const ROLE_PROFILES = {
  admin: {
    ...INITIAL_USER,
    role: 'admin',
    title: 'Lead Administrator & Full Stack Dev',
  },
  event_lead: {
    id: 'usr_event_lead',
    name: 'Tanvi Panchal',
    email: 'tanvi.p@charusat.edu.in',
    role: 'event_lead',
    title: 'Event Coordinator & Logistics Lead',
    department: 'Computer Engineering (CE)',
    year: '2nd Year',
    college: 'DEPSTAR - CHARUSAT University',
    studentId: '23CE105',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bio: 'Lead coordinator for Git Club summits, hackathons, and technical bootcamps at CHARUSAT Innovation Lab.',
    github: 'https://github.com/tanvipanchal',
    linkedin: 'https://linkedin.com/in/tanvi-panchal',
    joinedDate: 'January 2025',
    eventsAttended: 11,
    projectsLed: 2,
  },
  member: {
    id: 'usr_member',
    name: 'Rahul Patel',
    email: 'rahul.patel@charusat.edu.in',
    role: 'member',
    title: 'Club Member & Full Stack Contributor',
    department: 'Computer Engineering (CE)',
    year: '3rd Year',
    college: 'DEPSTAR - CHARUSAT University',
    studentId: '22CE015',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Club developer passionate about high-performance web systems and open-source contributions.',
    github: 'https://github.com/rahul-codes',
    linkedin: 'https://linkedin.com/in/rahulpatel-ce',
    joinedDate: 'August 2024',
    eventsAttended: 9,
    projectsLed: 1,
  },
};

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('gitclub_theme');
    return saved || 'dark';
  });

  // Current Role & User profile
  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem('gitclub_role');
    return saved || 'admin';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gitclub_user');
    return saved ? JSON.parse(saved) : ROLE_PROFILES.admin;
  });

  // Core collections with localStorage persistence
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('gitclub_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem('gitclub_registrations');
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('gitclub_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('gitclub_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('gitclub_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('gitclub_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('gitclub_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('gitclub_settings');
    return saved
      ? JSON.parse(saved)
      : {
        eventNotifications: true,
        memberNotifications: true,
        projectUpdates: true,
        soundAlerts: false,
        twoFactorAuth: false,
      };
  });

  // Modal system
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  // Toast notification system
  const [toasts, setToasts] = useState([]);

  // Sync theme with HTML class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('gitclub_theme', theme);
  }, [theme]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('gitclub_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('gitclub_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('gitclub_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('gitclub_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('gitclub_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('gitclub_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('gitclub_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('gitclub_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('gitclub_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('gitclub_settings', JSON.stringify(settings));
  }, [settings]);

  // Toast dispatch
  const addToast = (toast) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, ...toast }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper to add activity
  const addActivity = ({ type, color = 'emerald', text, detail }) => {
    const newAct = {
      id: 'act_' + Date.now(),
      type,
      color,
      text,
      detail: detail || '',
      time: 'Just now',
      timestamp: Date.now(),
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Switch role and update user profile
  const switchRole = (newRole) => {
    setRole(newRole);
    const profile = ROLE_PROFILES[newRole] || ROLE_PROFILES.admin;
    setCurrentUser(profile);
    addToast({
      type: 'info',
      title: 'Role Switched',
      message: `Switched view to ${newRole === 'admin' ? 'Lead Admin' : newRole === 'event_lead' ? 'Event Coordinator' : 'Club Member'}.`,
    });
  };

  const updateUserProfile = (updatedProfile) => {
    setCurrentUser((prev) => ({ ...prev, ...updatedProfile }));
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile information has been saved.',
    });
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Modal open / close
  const openModal = (modalName, data = null) => {
    setActiveModal(modalName);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  // --- EVENTS CRUD & REGISTRATION ---
  const addEvent = (eventData) => {
    const newId = 'evt_' + Date.now();
    const newEvent = {
      id: newId,
      registeredCount: 0,
      status: 'Upcoming',
      banner:
        eventData.banner ||
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      ...eventData,
    };
    setEvents((prev) => [newEvent, ...prev]);
    addActivity({
      type: 'event',
      color: 'purple',
      text: `Event created: "${newEvent.title}"`,
      detail: `Scheduled for ${newEvent.formattedDate || newEvent.date} at ${newEvent.venue}`,
    });
    addToast({
      type: 'success',
      title: 'Event Created',
      message: `"${newEvent.title}" has been successfully published.`,
    });
    closeModal();
    return newEvent;
  };

  const updateEvent = (id, updatedFields) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updatedFields } : e))
    );
    addToast({
      type: 'success',
      title: 'Event Updated',
      message: 'Event changes have been saved.',
    });
    closeModal();
  };

  const deleteEvent = (id) => {
    const evt = events.find((e) => e.id === id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    addToast({
      type: 'info',
      title: 'Event Removed',
      message: evt ? `"${evt.title}" has been removed.` : 'Event deleted.',
    });
    closeModal();
  };

  const registerForEvent = (eventId, studentDetails) => {
    const currentEvt = events.find((e) => e.id === eventId);
    if (!currentEvt) return false;

    // Check if already registered
    const already = registrations.some(
      (r) => r.eventId === eventId && (r.email === studentDetails.email || r.studentId === studentDetails.studentId)
    );
    if (already) {
      addToast({
        type: 'error',
        title: 'Already Registered',
        message: 'You or this student ID are already registered for this event.',
      });
      return false;
    }

    const newReg = {
      id: 'reg_' + Date.now(),
      eventId,
      name: studentDetails.name || currentUser.name,
      email: studentDetails.email || currentUser.email,
      studentId: studentDetails.studentId || currentUser.studentId || '24DIT006',
      branch: studentDetails.branch || currentUser.department?.slice(0, 3) || 'CE',
      year: studentDetails.year || currentUser.year || '3rd Year',
      registeredAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Confirmed',
    };

    setRegistrations((prev) => [newReg, ...prev]);
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, registeredCount: (e.registeredCount || 0) + 1 }
          : e
      )
    );

    addActivity({
      type: 'event',
      color: 'emerald',
      text: `${newReg.name} registered for "${currentEvt.title}"`,
      detail: `Total registrations now at ${currentEvt.registeredCount + 1}`,
    });

    addToast({
      type: 'success',
      title: 'Registration Confirmed!',
      message: `You are confirmed for ${currentEvt.title}. Check your inbox for passes.`,
    });

    return true;
  };

  const unregisterFromEvent = (eventId, email) => {
    const userEmail = email || currentUser.email;
    setRegistrations((prev) =>
      prev.filter((r) => !(r.eventId === eventId && r.email === userEmail))
    );
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, registeredCount: Math.max(0, (e.registeredCount || 1) - 1) }
          : e
      )
    );
    addToast({
      type: 'info',
      title: 'Registration Cancelled',
      message: 'Your registration has been cancelled.',
    });
  };

  // --- MEMBERS CRUD ---
  const addMember = (memberData) => {
    const newMember = {
      id: 'mem_' + Date.now(),
      eventsParticipated: 0,
      projectsCount: 0,
      status: 'Active',
      avatar:
        memberData.avatar ||
        `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=400&q=80`,
      ...memberData,
    };
    setMembers((prev) => [newMember, ...prev]);
    addActivity({
      type: 'member',
      color: 'emerald',
      text: `New member added: ${newMember.name}`,
      detail: `${newMember.role} (${newMember.branch}) joined the Git Club directory.`,
    });
    addToast({
      type: 'success',
      title: 'Member Added',
      message: `${newMember.name} has been welcomed to Git Club.`,
    });
    closeModal();
    return newMember;
  };

  const updateMember = (id, updatedFields) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updatedFields } : m))
    );
    addToast({
      type: 'success',
      title: 'Member Profile Updated',
      message: 'Changes saved successfully.',
    });
    closeModal();
  };

  const deleteMember = (id) => {
    const m = members.find((item) => item.id === id);
    setMembers((prev) => prev.filter((item) => item.id !== id));
    addToast({
      type: 'info',
      title: 'Member Removed',
      message: m ? `${m.name} was removed from club roster.` : 'Member removed.',
    });
    closeModal();
  };

  // --- PROJECTS CRUD ---
  const addProject = (projectData) => {
    const newProj = {
      id: 'proj_' + Date.now(),
      stars: 1,
      forks: 0,
      lastUpdated: 'Just now',
      image:
        projectData.image ||
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      teamMembers: projectData.teamMembers || [
        { name: currentUser.name, role: currentUser.title, avatar: currentUser.avatar },
      ],
      ...projectData,
    };
    setProjects((prev) => [newProj, ...prev]);
    addActivity({
      type: 'project',
      color: 'blue',
      text: `New project published: "${newProj.title}"`,
      detail: `Category: ${newProj.category} • Progress: ${newProj.progress}%`,
    });
    addToast({
      type: 'success',
      title: 'Project Published',
      message: `"${newProj.title}" is now showcased in club projects.`,
    });
    closeModal();
    return newProj;
  };

  const updateProject = (id, updatedFields) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields, lastUpdated: 'Just now' } : p))
    );
    addToast({
      type: 'success',
      title: 'Project Updated',
      message: 'Project details and status updated.',
    });
    closeModal();
  };

  const deleteProject = (id) => {
    const p = projects.find((item) => item.id === id);
    setProjects((prev) => prev.filter((item) => item.id !== id));
    addToast({
      type: 'info',
      title: 'Project Deleted',
      message: p ? `"${p.title}" deleted.` : 'Project deleted.',
    });
    closeModal();
  };

  // --- ANNOUNCEMENTS CRUD ---
  const addAnnouncement = (annData) => {
    const newAnn = {
      id: 'ann_' + Date.now(),
      author: `${currentUser.name} (${currentUser.role === 'admin' ? 'Admin' : 'Event Lead'})`,
      timestamp: 'Just now',
      date: new Date().toISOString().split('T')[0],
      ...annData,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    addActivity({
      type: 'announcement',
      color: 'amber',
      text: `Announcement: "${newAnn.title}"`,
      detail: `Priority: ${newAnn.priority} • Audience: ${newAnn.targetAudience}`,
    });
    addToast({
      type: 'success',
      title: 'Announcement Broadcasted',
      message: `"${newAnn.title}" is live for members.`,
    });
    closeModal();
    return newAnn;
  };

  const updateAnnouncement = (id, updatedFields) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updatedFields } : a))
    );
    addToast({
      type: 'success',
      title: 'Announcement Updated',
      message: 'Announcement has been updated.',
    });
    closeModal();
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    addToast({
      type: 'info',
      title: 'Announcement Deleted',
      message: 'The announcement has been deleted.',
    });
  };

  // --- NOTIFICATIONS ---
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast({
      type: 'info',
      title: 'Notifications Cleared',
      message: 'All notifications marked as read.',
    });
  };

  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // --- SETTINGS & FACTORY RESET ---
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'System preferences have been saved.',
    });
  };

  const resetData = () => {
    localStorage.removeItem('gitclub_events');
    localStorage.removeItem('gitclub_members');
    localStorage.removeItem('gitclub_projects');
    localStorage.removeItem('gitclub_announcements');
    localStorage.removeItem('gitclub_activities');
    localStorage.removeItem('gitclub_notifications');
    localStorage.removeItem('gitclub_registrations');
    localStorage.removeItem('gitclub_settings');
    localStorage.removeItem('gitclub_user');
    localStorage.removeItem('gitclub_role');

    setEvents(INITIAL_EVENTS);
    setMembers(INITIAL_MEMBERS);
    setProjects(INITIAL_PROJECTS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setActivities(INITIAL_ACTIVITIES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setRegistrations(INITIAL_REGISTRATIONS);
    setCurrentUser(ROLE_PROFILES.admin);
    setRole('admin');
    setSettings({
      eventNotifications: true,
      memberNotifications: true,
      projectUpdates: true,
      soundAlerts: false,
      twoFactorAuth: false,
    });

    addToast({
      type: 'info',
      title: 'Demo Data Restored',
      message: 'Command Center reset to factory demo state.',
    });
  };

  // Computed metrics for dashboard
  const metrics = {
    membersCount: 240 + members.length, // realistic total count
    membersGrowth: '+12 this mo.',
    eventsCount: events.length,
    eventsUpcomingCount: events.filter((e) => e.status === 'Upcoming').length,
    projectsCount: projects.length,
    projectsActiveCount: projects.filter((p) => p.status === 'Active').length,
    participantsCount: 300 + registrations.length * 14,
    participantsGrowth: '+18%',
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        role,
        switchRole,
        currentUser,
        updateUserProfile,
        events,
        registrations,
        addEvent,
        updateEvent,
        deleteEvent,
        registerForEvent,
        unregisterFromEvent,
        members,
        addMember,
        updateMember,
        deleteMember,
        projects,
        addProject,
        updateProject,
        deleteProject,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        activities,
        addActivity,
        notifications,
        unreadNotificationsCount,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotification,
        settings,
        updateSettings,
        resetData,
        metrics,
        analyticsData: ANALYTICS_DATA,
        activeModal,
        modalData,
        openModal,
        closeModal,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
