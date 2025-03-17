"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DiscordCallback() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after successful login
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      جاري التحميل...
    </div>
  );
}