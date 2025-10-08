"use client";
import React from "react";

const AdminLogin = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-[950px] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side - Admin Login Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-800">🔒 Admin Panel</h1>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Please enter your admin credentials below
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter admin email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter admin password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
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
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-lg transition"
            >
              Log in
            </button>
          </form>
        </div>

        {/* Right Side - Info Section (Dark Teal) */}
        <div className="w-1/2 bg-[#073642] text-white p-10 flex flex-col justify-center relative overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
          <p className="text-sm leading-relaxed mb-6">
            Securely log in to manage users, monitor analytics, configure system
            settings, and maintain full control over your platform.
          </p>

          {/* Decorative Squares */}
          <div className="absolute top-4 right-4 grid grid-cols-3 gap-2 opacity-10">
            <div className="w-4 h-4 bg-white"></div>
            <div className="w-4 h-4 bg-white"></div>
            <div className="w-4 h-4 bg-white"></div>
            <div className="w-4 h-4 bg-white"></div>
            <div className="w-4 h-4 bg-white"></div>
          </div>
          <div className="absolute top-96 right-96 grid grid-cols-3 gap-2 opacity-10">
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
