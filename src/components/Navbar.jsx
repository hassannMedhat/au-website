"use client";
import Cookies from "js-cookie";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, useAnimation } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userName, setUserName] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(pathname);

  // تحسين معالجة الباراميترات والكوكيز
  useEffect(() => {
    const token = searchParams.get("token");
    const user = searchParams.get("user");
    const hasAuthParams = token || user;

    if (hasAuthParams) {
      const newParams = new URLSearchParams(searchParams);

      if (token) {
        Cookies.set("auth_token", token, { expires: 7 });
        newParams.delete("token");
      }

      if (user) {
        const decodedUser = decodeURIComponent(user);
        Cookies.set("user_name", decodedUser, { expires: 7 });
        setUserName(decodedUser);
        newParams.delete("user");
      }

      router.replace(`${pathname}?${newParams.toString()}`);
    } else {
      const savedUserName = Cookies.get("user_name");
      if (savedUserName) setUserName(savedUserName);
    }
  }, [searchParams, pathname, router]);

  // تحسين أداء toggle function
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // إغلاق السايدبار
  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  // تحديث الرابط النشط عند تغيير المسار
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative shadow-md"
    >
      <div
        className="absolute inset-0 bg-cover bg-center h-20"
        style={{ backgroundImage: "url('/images/auLine2.gif')" }}
      ></div>
      <div className="relative z-10 flex items-center justify-between h-20 px-4 sm:px-10">
        {/* الاسم على اليسار */}
        <div className="flex items-center">
          {userName && (
            <div className="text-white text-lg font-medium">{userName}</div>
          )}
        </div>

        {/* الجزء الأيمن (الروابط + زر القائمة) */}
        <div className="flex items-center gap-4">
          {/* زر القائمة للجوال */}
          <button
            onClick={toggleSidebar}
            className="sm:hidden text-white focus:outline-none"
          >
            <img src="/images/menu.png" alt="Menu" className="w-8 h-8" />
          </button>

          {/* روابط سطح المكتب على اليمين */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden sm:flex items-center gap-6 text-base font-medium text-white relative"
          >
            {[
              { href: "/", label: "Home" },
              { href: "/rules", label: "Rules" },
              { href: "/creators", label: "Creators" },
              { href: "/jobs", label: "Jobs" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative hover:text-gray-300 transition duration-300"
                onClick={() => setActiveLink(link.href)}
              >
                {link.label}
                {activeLink === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-0.5 bg-white bottom-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}

            {/* Login يظهر فقط عندما لا يوجد مستخدم */}
            {!userName && (
              <Link
                href="/login"
                className="relative hover:text-gray-300 transition duration-300"
                onClick={() => setActiveLink("/login")}
              >
                Login
                {activeLink === "/login" && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-0.5 bg-white bottom-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      {/* السايدبار للجوال */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 sm:hidden">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-64 h-full bg-white shadow-lg flex flex-col"
          >
            {/* زر إغلاق السايدبار (سهم) */}
            <button
              onClick={closeSidebar}
              className="self-end p-4 hover:bg-gray-100 transition duration-300"
              style={{ color: "#035ea3" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>

            {/* محتوى السايدبار */}
            <div className="p-4 bg-gray-100">
              <h2 className="text-lg font-medium text-gray-800">
                Welcome, {userName || "Guest"}
              </h2>
            </div>

            <div className="flex flex-col p-4">
              {[
                { href: "/", label: "Home" },
                { href: "/rules", label: "Rules" },
                { href: "/creators", label: "Creators" },
                { href: "/jobs", label: "Jobs" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300"
                  onClick={closeSidebar}
                >
                  {link.label}
                </Link>
              ))}

              {!userName && (
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300"
                  onClick={closeSidebar}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </motion.nav>
  );
}
