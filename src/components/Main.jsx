// src/components/layout/Main.jsx
"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navabar from "../components/Navbar";

export default function Main({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-50">
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Right section */}
      <div className="flex flex-col flex-1 min-h-screen lg:ml-64">
        
        <Navabar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6 mt-20">
          {children}
        </main>
        <footer className="text-center text-gray-500 text-sm py-4 ">
  © {new Date().getFullYear()} AVHome — All rights reserved.
</footer>

      </div>
      
    </div>
  );
}