"use client";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import { AuthProvider } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const hideNavFooter = ["/login", "/register", "/forgot-password", "/reset-password"].includes(pathname);
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <Head>
        <title>Arab Universe</title>
        <link rel="shortcut icon" href="/images/au.png" type="image/png" />
      </Head>
      <body
        className={
          isDashboard
            ? "bg-gray-900 text-white min-h-screen flex w-full p-0 m-0"
            : hideNavFooter
            ? "bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white min-h-screen flex items-center justify-center w-full p-0 m-0"
            : "bg-gray-100 text-gray-900 w-full p-0 m-0"
        }
      >
        <AuthProvider>
          {!hideNavFooter && !isDashboard && <Navbar />}
          {isDashboard && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          )}
          {isDashboard && (
            <div
              className={`fixed inset-y-0 left-0 w-64 bg-gray-800 shadow-lg p-4 flex flex-col space-y-4 transform transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } md:translate-x-0 md:relative`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src="/images/aured.png"
                  alt="Arab Universe Logo"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h2 className="text-2xl font-bold tracking-wider bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                  Arab Universe
                </h2>
              </div>
              <nav className="flex flex-col space-y-2">
                <a
                  href="/"
                  className="group flex items-center space-x-3 text-lg font-medium text-gray-300 transition duration-300"
                >
                  <svg
                    className="w-6 h-6 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span className="group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent">
                    Home
                  </span>
                </a>
                <a
                  href="/dashboard"
                  className="text-lg font-medium text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  Dashboard
                </a>
                <a
                  href="/dashboard/users"
                  className="text-lg font-medium text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  Users
                </a>
                <a
                  href="/dashboard/Job-applicants"
                  className="text-lg font-medium text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  Job Applicants
                </a>
                <a
                  href="/dashboard/logs"
                  className="text-lg font-medium text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  Logs
                </a>
              </nav>
            </div>
          )}
          <main
            className={
              isDashboard
                ? "flex-1 p-4 overflow-y-auto w-full"
                : hideNavFooter
                ? "min-h-screen flex items-center justify-center w-full"
                : "w-full p-0"
            }
          >
            {children}
          </main>
          {!hideNavFooter && !isDashboard && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}