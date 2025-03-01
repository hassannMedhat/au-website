"use client";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (Cookies.get("token")) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", { name, email, password });
      Cookies.set("token", res.data.token, { expires: 7, secure: true, sameSite: "Strict" });
      setIsLoggedIn(true);
      router.push("/");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 p-4 sm:p-6 lg:p-8">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[url('/images/particle-bg.png')] opacity-10"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 p-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 z-20"
      >
        <FiArrowLeft className="w-6 h-6" />
      </button>

      <div className="relative z-10 w-full max-w-md bg-gray-950/95 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20 shadow-xl">
        <div className="flex flex-col items-center mb-5">
          <div className="mb-4">
            <Image
              src="/images/au.png"
              alt="Arab Universe Logo"
              width={120}
              height={120}
              className="object-contain"
              loading="lazy"
              onError={() => console.log("Error loading logo")}
            />
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 tracking-wide">
            ARAB UNIVERSE
          </h1>
          <p className="text-gray-300 font-medium text-sm mt-1">
            CREATE YOUR ACCOUNT
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center font-medium animate-fade-in">
              ⚠️ {error}
            </div>
          )}

          <div className="relative">
            <label htmlFor="name" className="text-sm text-gray-400 mb-1 block">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/70 border border-blue-500/20 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 hover:border-blue-500/40"
              required
              autoComplete="name"
            />
          </div>

          <div className="relative">
            <label htmlFor="email" className="text-sm text-gray-400 mb-1 block">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/70 border border-blue-500/20 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 hover:border-blue-500/40"
              required
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="text-sm text-gray-400 mb-1 block">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/70 border border-blue-500/20 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 hover:border-blue-500/40"
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg font-semibold text-white hover:from-blue-400 hover:to-cyan-500 transition-all duration-200 hover:shadow-md active:scale-98 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            <span className="relative">
              {loading ? "Registering..." : "Register"}
            </span>
          </button>
        </form>

        <div className="mt-5 text-center space-y-2">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200">
              Login
            </Link>
          </p>
          <hr className="border-gray-600 mx-2" />
          <p className="text-xs text-gray-500 mt-2">© 2025 Arab Universe.</p>
        </div>
      </div>
    </div>
  );
}