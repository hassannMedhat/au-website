"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("token")) {
      router.push("/");
    }
  }, [router]);

  const handleDiscordLogin = () => {
    window.location.href = "http://127.0.0.1:8000/auth/discord";
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      Cookies.set("token", token, { expires: 7, secure: true });
      router.push("/");
    }
  }, [router]);

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

        <button
          type="button"
          onClick={handleDiscordLogin}
          className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-500 transition-all duration-200"
        >
          Login with Discord
        </button>
      </div>
    </div>
  );
}
