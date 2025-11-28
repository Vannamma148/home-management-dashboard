// src/pages/auth/Forgot.jsx
import React, { useState } from "react";
import AuthLayout from "../pages/Auth";
import { Mail, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    alert("Password reset link sent!");
    navigate("/login");
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">Forgot Password</h2>
      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-10 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-teal-400 to-teal-600 text-white px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          <Send size={18} /> Send Reset Link
        </button>
        <div className="text-sm text-gray-500 text-center">
          Remembered your password? <a href="/login" className="text-teal-600 hover:underline">Login</a>
        </div>
      </div>
    </AuthLayout>
  );
}
