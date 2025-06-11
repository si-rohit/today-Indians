"use client";
import React, { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    username: "journalist_007",
    email: "newsadmin@example.com",
    phone: "+91 9876543210",
    gender: "Male",
    notifications: true,
    darkMode: false,
    autoSave: true,
    commentsEnabled: true,
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow mt-6">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      {/* Account Info */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Account Settings</h3>
        <div className="space-y-2">
          <p><strong>Username:</strong> {settings.username}</p>
          <p><strong>Email:</strong> {settings.email}</p>
          <p><strong>Phone:</strong> {settings.phone}</p>
          <p><strong>Gender:</strong> {settings.gender}</p>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Notification Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span>Receive Email Notifications</span>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => handleToggle("notifications")}
              className="w-5 h-5"
            />
          </label>
          <label className="flex items-center justify-between">
            <span>Allow Comments on Articles</span>
            <input
              type="checkbox"
              checked={settings.commentsEnabled}
              onChange={() => handleToggle("commentsEnabled")}
              className="w-5 h-5"
            />
          </label>
        </div>
      </div>

      {/* Site Preferences */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Site Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span>Enable Dark Mode</span>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleToggle("darkMode")}
              className="w-5 h-5"
            />
          </label>
          <label className="flex items-center justify-between">
            <span>Auto-Save Drafts</span>
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={() => handleToggle("autoSave")}
              className="w-5 h-5"
            />
          </label>
        </div>
      </div>

      <div className="text-right mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
