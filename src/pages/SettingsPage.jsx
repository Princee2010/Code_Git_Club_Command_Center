import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings as SettingsIcon,
  Sun,
  Moon,
  Bell,
  Lock,
  RotateCcw,
  Check,
  Shield,
  Save,
  Palette,
  Volume2,
} from 'lucide-react';

export const SettingsPage = () => {
  const { theme, toggleTheme, settings, updateSettings, resetData, addToast } = useApp();

  const [localSettings, setLocalSettings] = useState({ ...settings });
  const [passwordState, setPasswordState] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleToggle = (key) => {
    setLocalSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    updateSettings(localSettings);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!passwordState.currentPassword || !passwordState.newPassword) {
      addToast({
        type: 'error',
        title: 'Missing Fields',
        message: 'Please fill in your current and new password.',
      });
      return;
    }
    if (passwordState.newPassword !== passwordState.confirmPassword) {
      addToast({
        type: 'error',
        title: 'Password Mismatch',
        message: 'New password and confirmation do not match.',
      });
      return;
    }

    setPasswordState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    addToast({
      type: 'success',
      title: 'Password Updated',
      message: 'Your administrator password has been updated successfully.',
    });
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all data back to original seed defaults? Any newly added items will be refreshed.'
      )
    ) {
      resetData();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Command Center Settings
          </h1>
          <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Preferences
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize UI appearance, notification frequencies, and access credentials.
        </p>
      </div>

      {/* 1. Appearance Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Palette className="w-5 h-5 text-emerald-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Appearance & Theme
          </h2>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Choose between sleek high-contrast dark mode or clean high-legibility light mode.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Light Theme Card */}
          <div
            onClick={() => {
              if (theme === 'dark') toggleTheme();
            }}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
              theme === 'light'
                ? 'border-emerald-500 bg-emerald-500/5 shadow-md'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Light Mode</h4>
                <p className="text-xs text-slate-500">Daylight crisp readability</p>
              </div>
            </div>
            {theme === 'light' && (
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
            )}
          </div>

          {/* Dark Theme Card */}
          <div
            onClick={() => {
              if (theme === 'light') toggleTheme();
            }}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
              theme === 'dark'
                ? 'border-emerald-500 bg-emerald-500/10 shadow-md'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 text-indigo-400 flex items-center justify-center">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Dark Mode</h4>
                <p className="text-xs text-slate-500">Cyber emerald terminal aesthetic</p>
              </div>
            </div>
            {theme === 'dark' && (
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Notifications Section */}
      <form
        onSubmit={handleSavePreferences}
        className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
      >
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Bell className="w-5 h-5 text-indigo-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Notification Preferences
          </h2>
        </div>

        <div className="space-y-4">
          <label className="flex items-start justify-between cursor-pointer p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
            <div className="pr-4">
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Event Notifications
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Receive alerts when new hackathons or workshops are scheduled or registrations surge.
              </span>
            </div>
            <input
              type="checkbox"
              checked={localSettings.eventNotifications}
              onChange={() => handleToggle('eventNotifications')}
              className="mt-1 w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 cursor-pointer"
            />
          </label>

          <label className="flex items-start justify-between cursor-pointer p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
            <div className="pr-4">
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Member Notifications
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Alerts when new students register or complete club onboarding.
              </span>
            </div>
            <input
              type="checkbox"
              checked={localSettings.memberNotifications}
              onChange={() => handleToggle('memberNotifications')}
              className="mt-1 w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 cursor-pointer"
            />
          </label>

          <label className="flex items-start justify-between cursor-pointer p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
            <div className="pr-4">
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Project Updates
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Receive activity pings when club repositories have milestone releases or status changes.
              </span>
            </div>
            <input
              type="checkbox"
              checked={localSettings.projectUpdates}
              onChange={() => handleToggle('projectUpdates')}
              className="mt-1 w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 cursor-pointer"
            />
          </label>

          <label className="flex items-start justify-between cursor-pointer p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
            <div className="pr-4">
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Sound Alerts
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Play subtle notification chime when new items arrive in Command Center.
              </span>
            </div>
            <input
              type="checkbox"
              checked={localSettings.soundAlerts}
              onChange={() => handleToggle('soundAlerts')}
              className="mt-1 w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 cursor-pointer"
            />
          </label>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>

      {/* 3. Account & Security Section */}
      <form
        onSubmit={handlePasswordChange}
        className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
      >
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Lock className="w-5 h-5 text-rose-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Account & Password
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordState.currentPassword}
              onChange={(e) =>
                setPasswordState({ ...passwordState, currentPassword: e.target.value })
              }
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordState.newPassword}
              onChange={(e) =>
                setPasswordState({ ...passwordState, newPassword: e.target.value })
              }
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordState.confirmPassword}
              onChange={(e) =>
                setPasswordState({ ...passwordState, confirmPassword: e.target.value })
              }
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-700 transition-colors cursor-pointer"
          >
            Update Password
          </button>
        </div>
      </form>

      {/* 4. Danger Zone: Reset Factory Defaults */}
      <div className="p-6 rounded-3xl bg-rose-500/5 border border-rose-500/20 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-rose-500 flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg">
            Restore all events, members, projects, and notifications back to the initial CHARUSAT Git Club seed dataset.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-400 text-white shadow-md shadow-rose-500/20 transition-all cursor-pointer whitespace-nowrap active:scale-95"
        >
          Reset All Data
        </button>
      </div>
    </div>
  );
};
