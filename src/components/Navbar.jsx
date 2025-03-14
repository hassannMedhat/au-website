"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

export default function Navbar() {
  const [token, setToken] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    // فحص الكوكيز مباشرة من document.cookie ومن js-cookie
    console.log("document.cookie in Navbar:", document.cookie);
    const cookieToken = Cookies.get("token");
    console.log("js-cookie token:", cookieToken);
    setToken(cookieToken);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative shadow-md"
    >
      {/* خلفية GIF */}
      <div
        className="absolute inset-0 bg-cover bg-center h-20"
        style={{ backgroundImage: "url('/images/auLine.gif')" }}
      ></div>

      {/* روابط التنقل */}
      <div className="relative z-10 flex items-center justify-end gap-6 pr-10 h-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-6 text-base font-medium text-white relative"
        >
          <div className="relative">
            <Link href="/" className="hover:text-gray-300 transition duration-300">
              Home
            </Link>
            {pathname === "/" && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 bottom-[-4px] w-full h-1 bg-blue-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            )}
          </div>
          <div className="relative">
            <Link href="/rules" className="hover:text-gray-300 transition duration-300">
              Rules
            </Link>
            {pathname === "/rules" && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 bottom-[-4px] w-full h-1 bg-blue-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            )}
          </div>
          <div className="relative">
            <Link href="/creators" className="hover:text-gray-300 transition duration-300">
              Creators
            </Link>
            {pathname === "/creators" && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 bottom-[-4px] w-full h-1 bg-blue-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            )}
          </div>
          <div className="relative">
            <Link href="/jobs" className="hover:text-gray-300 transition duration-300">
              Jobs
            </Link>
            {pathname === "/jobs" && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 bottom-[-4px] w-full h-1 bg-blue-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            )}
          </div>
          {/* عرض رابط "Login" فقط إذا لم يكن التوكن موجود */}
          {!token && (
            <div className="relative">
              <Link href="/login" className="hover:text-gray-300 transition duration-300">
                Login
              </Link>
              {pathname === "/login" && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 bottom-[-4px] w-full h-1 bg-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
}
