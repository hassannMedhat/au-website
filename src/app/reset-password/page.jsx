"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ResetPasswordContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  useEffect(() => {
    const emailFromUrl = searchParams.get("email") || "";
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (password !== passwordConfirmation) {
      setError("Password and confirmation do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/reset-password", {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });
      setMessage(res.data.message || "Password reset successfully!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="max-w-md w-full bg-gray-950/95 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20 shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Error</h1>
        <div className="text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center mb-4">
          Invalid password reset link. Please request a new one from the forgot password page.
        </div>
        <button
          onClick={() => router.push("/forgot-password")}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg font-semibold text-white hover:from-blue-600 hover:to-cyan-700 transition-all duration-200"
        >
          Back to Forgot Password
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full bg-gray-950/95 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20 shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Reset Password</h1>
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
          className="w-full px-4 py-3 bg-gray-900/70 border border-blue-500/20 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 disabled:opacity-50"
          required
          disabled
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-gray-900/70 border border-blue-500/20 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="w-full px-4 py-3 bg-gray-900/70 border border-blue-500/20 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg font-semibold text-white hover:from-blue-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 p-4">
      <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}