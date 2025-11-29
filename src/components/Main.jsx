// src/components/layout/Main.jsx
"use client";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 min-h-screen">

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Right side */}
      <div className="flex flex-col flex-1 lg:ml-64">

        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page content */}
        <main className="p-6 mt-20">
          <Outlet />
        </main>

        <footer className="text-center text-gray-500 text-sm py-4">
          © {new Date().getFullYear()} AVHome — All rights reserved.
        </footer>
      </div>

    </div>
  );
}
