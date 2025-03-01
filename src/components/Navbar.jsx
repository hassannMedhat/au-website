"use client";
import Link from "next/link";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative shadow-md"
    >
      {/* GIF */}
      <div
        className="absolute inset-0 bg-cover bg-center h-20"
        style={{ backgroundImage: "url('/images/auLine.gif')" }}
      ></div>

      {/* links */}
      <div className="relative z-10 flex items-center justify-end gap-6 pr-10 h-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-6 text-base font-medium text-white relative"
        >
          {[
            { name: "Home", path: "/" },
            { name: "Rules", path: "/rules" },
            { name: "Creators", path: "/creators" },
            { name: "Jobs", path: "/jobs" },
            !isLoggedIn && { name: "Login", path: "/login" },
            !isLoggedIn && { name: "Register", path: "/register" },
          ]
            .filter(Boolean)
            .map(({ name, path }) => (
              <div key={path} className="relative">
                <Link href={path} className="hover:text-gray-300 transition duration-300">
                  {name}
                </Link>
                {pathname === path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-[-4px] w-full h-1 bg-blue-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                )}
              </div>
            ))}
        </motion.div>
      </div>
    </motion.nav>
  );
}
