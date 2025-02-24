"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative shadow-md"
    >
      {/* الخلفية GIF */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/au.gif')" }}
      ></div>

      {/* المحتوى فوق الـ GIF */}
      <div className="relative z-10 flex items-center p-4 text-white justify-end gap-4 pr-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-4"
        >
          <Link href="/" className="hover:text-gray-300 transition duration-300">
            Home
          </Link>
          <Link href="/creators" className="hover:text-gray-300 transition duration-300">
            Creators
          </Link>
          <Link href="/jobs" className="hover:text-gray-300 transition duration-300">
            Jobs
          </Link>
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="hover:text-blue-400 transition duration-300">
                Login
              </Link>
              <Link href="/register" className="hover:text-green-400 transition duration-300">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
}
