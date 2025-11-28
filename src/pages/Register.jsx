import React, { useState } from "react";
import Auth from "../pages/Auth";
import { User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // reset error on change
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = () => {
    const { name, email, password } = form;

    // Validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Registration successful
    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <Auth>
      <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">Register</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-10 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-10 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-10 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-linear-to-r from-teal-400 to-teal-600 text-white px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          Register
        </button>

        <div className="text-sm text-gray-500 text-center">
          Already have an account? <a href="/login" className="text-teal-600 hover:underline">Login</a>
        </div>
      </div>
    </Auth>
  );
}
