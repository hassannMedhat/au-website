"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DiscordCallback() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      Cookies.set("token", token, { expires: 7, secure: true, sameSite: "Strict" });
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [router]);

  return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
}