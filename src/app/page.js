"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Hardcoded admin credentials
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      // Login successful - navigate to your existing dashboard
      router.push("/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row w-full max-w-[950px] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side - Admin Login Form */}
        <div className="w-full sm:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
              🔒 Admin Panel
            </h1>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
            Please enter your admin credentials below
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-800">{error}</p>
            </div>
          )}

          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs sm:text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter admin email"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter admin password"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-gray-600 gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 text-teal-600" />
                Remember me
              </label>
              <a href="#" className="text-teal-700 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-lg transition text-sm sm:text-base"
            >
              Log in
            </button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Demo: admin@example.com / admin123
            </p>
          </div>
        </div>

        {/* Right Side - Info Section (Dark Teal) */}
        <div className="w-full sm:w-1/2 bg-[#073642] text-white p-6 sm:p-10 flex flex-col justify-center relative overflow-hidden">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
            Admin Dashboard
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
            Securely log in to manage users, monitor analytics, configure system
            settings, and maintain full control over your platform.
          </p>

          {/* Decorative Squares */}
          <div className="absolute top-4 right-4 grid grid-cols-3 gap-2 opacity-10">
            <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white"></div>
            <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white"></div>
            <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white"></div>
            <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white"></div>
            <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white"></div>
          </div>
          <div className="absolute bottom-4 right-4 grid grid-cols-3 gap-2 opacity-10  sm:grid">
            <div className="w-4 h-4 bg-white"></div>
            <div className="w-4 h-4 bg-white"></div>
            <div className="w-4 h-4 bg-white"></div>
            <div className="w-4 h-4 bg-white"></div>
            <div className="w-4 h-4 bg-white"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;