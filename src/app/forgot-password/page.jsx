"use client";
import { useState } from "react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/forgot-password", { email });
      setMessage(res.data.message || "Reset link sent successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send reset link. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 p-4">
      <div className="max-w-md w-full bg-gray-950/95 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20 shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Forgot Password</h1>
        {message && (
          <div className="text-green-400 bg-green-500/10 border border-green-500/20 p-3 rounded-lg text-center mb-4">
            {message}
          </div>
        )}
        {error && (
          <div className="text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/70 border border-blue-500/20 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg font-semibold text-white hover:from-blue-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}