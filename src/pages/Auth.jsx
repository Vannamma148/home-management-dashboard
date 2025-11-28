// src/components/Auth.jsx
import React from "react";

export default function Auth({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Left welcome panel */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-tr from-teal-400 to-teal-600 items-center justify-center text-white p-12">
        <div className="space-y-6 text-center">
          <h1 className="text-5xl font-bold">Welcome to HomeDash</h1>
          <p className="text-lg opacity-90">
            Manage your tasks, expenses, shopping, family events, and calendar with ease.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
