"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DiscordCallback() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      // إعادة التوجيه إلى API Route لتعيين الكوكيز
      window.location.href = `/api/set-token?token=${token}`;
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      جاري التحميل...
    </div>
  );
}
