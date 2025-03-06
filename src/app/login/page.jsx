"use client";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";

export default function LoginPage() {
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
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login",
        { email, password},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!res.data || !res.data.token || !res.data.user) {
        throw new Error("Invalid response from server");
      }

      setIsLoggedIn(true);
      Cookies.set("token", res.data.token, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/");
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.error || "Authentication failed!");
    }
  };

  const handleDiscordLogin = () => {
    window.location.href = "http://127.0.0.1:8000/api/auth/discord";
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/api/auth/google";
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 p-4 sm:p-6 lg:p-8">
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 p-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 z-20"
      >
        <FiArrowLeft className="w-6 h-6" />
      </button>

      <div className="relative z-10 w-full max-w-3xl rounded-2xl p-8 border border-blue-500/20 shadow-xl">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/images/au.png"
            alt="Arab Universe Logo"
            width={140}
            height={140}
            className="object-contain mb-5"
            loading="lazy"
          />
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 tracking-wide">
            ARAB UNIVERSE
          </h1>
          <p className="text-gray-300 font-medium text-base mt-2">
            WELCOME BACK
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center font-medium">
              ⚠️ {error}
            </div>
          )}

          <div className="relative">
            <label htmlFor="email" className="text-sm text-gray-400 mb-2 block">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-gray-900 border border-blue-500/20 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 hover:border-blue-500/40 text-base"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="text-sm text-gray-400 mb-2 block">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-900 border border-blue-500/20 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 hover:border-blue-500/40 text-base"
              required
            />
          </div>

          

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg font-semibold text-lg text-white hover:from-blue-400 hover:to-cyan-500 transition-all duration-200 hover:shadow-md active:scale-98 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={handleDiscordLogin}
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-500 transition-all duration-200"
          >
            Login with Discord
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-4 px-6 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-500 transition-all duration-200"
          >
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
}