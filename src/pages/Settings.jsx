import React, { useState } from "react";
import { Save, User, Bell, Lock } from "lucide-react";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    username: "john_doe",
    password: "",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    // Implement save functionality
    alert("Settings saved!");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-teal-600">Settings</h1>

      {/* Profile Section */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <User /> Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={profile.username}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={profile.password}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <Bell /> Preferences
        </h2>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="notifications"
              checked={profile.notifications}
              onChange={handleChange}
              className="w-5 h-5 accent-teal-500"
            />
            Enable Notifications
          </label>

          <label className="flex items-center gap-2">
            Dark Mode
            <input
              type="checkbox"
              name="darkMode"
              checked={false} // implement dark mode logic
              onChange={() => {}}
              className="w-5 h-5 accent-teal-500"
            />
          </label>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
      >
        <Save size={18} /> Save Changes
      </button>
    </div>
  );
}
