"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleDiscordLogin = () => {
    window.location.href = "http://localhost:8000/auth/discord";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 p-4 sm:p-6 lg:p-8">
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 p-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 z-20"
      >
        <FiArrowLeft className="w-6 h-6" />
      </button>

      <div className="relative z-10 w-full max-w-3xl rounded-2xl p-8 border border-blue-500/20 shadow-2xl backdrop-blur-sm bg-gray-900/50">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-5">
            <Image
              src="/images/au.png"
              alt="Arab Universe Logo"
              layout="fill"
              className="object-contain animate-pulse"
              loading="lazy"
            />
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 tracking-wide animate-gradient">
            ARAB UNIVERSE
          </h1>
          <p className="text-gray-300 font-medium text-lg mt-2 animate-fade-in">
            WELCOME BACK
          </p>
        </div>

        <button
          type="button"
          onClick={handleDiscordLogin}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold text-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-2xl"
        >
          Login with Discord
        </button>
      </div>
    </div>
  );
}
