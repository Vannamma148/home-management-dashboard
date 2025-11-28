import React, { useState } from "react";
import Auth from "../pages/Auth";
import { User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Fake user for demonstration (replace with real backend)
const demoUser = { email: "home@dashboard.com", password: "123456" };

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    const { email, password } = form;

    // Validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Fake authentication check
    if (email === demoUser.email && password === demoUser.password) {
      localStorage.setItem("loggedIn", "true"); // mark user as logged in
      navigate("/"); // redirect to dashboard
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <Auth>
      <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">Login</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
          onClick={handleLogin}
          className="w-full bg-linear-to-r from-teal-400 to-teal-600 text-white px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          Login
        </button>

        <div className="flex justify-between text-sm text-gray-500">
          <a href="/register" className="hover:text-teal-600 transition-colors">Register</a>
          <a href="/forgot" className="hover:text-teal-600 transition-colors">Forgot Password?</a>
        </div>
      </div>
    </Auth>
  );
}
