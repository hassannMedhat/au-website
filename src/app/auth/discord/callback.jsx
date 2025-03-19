import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DiscordCallback() {
  const router = useRouter();
  const { code, state, error } = router.query;

  useEffect(() => {
    if (error) {
      console.error("Discord Login Error:", error);
      return;
    }

    if (code) {
      // إرسال الكود للباك إند عشان يجيب التوكين
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/discord/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("authToken", data.token);
            router.push("/"); // روح للصفحة الرئيسية بعد تسجيل الدخول
          } else {
            console.error("Login failed:", data);
          }
        })
        .catch((err) => console.error("Error:", err));
    }
  }, [code, error]);

  return (
    <div className="flex h-screen justify-center items-center text-white bg-gray-900">
      <p>Processing Discord Login...</p>
    </div>
  );
}
