"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const currentUser = res.data.user;
        console.log("Profile data:", currentUser);
        setUser(currentUser);

        // التحقق من الصلاحيات بناءً على الأدوار الجديدة
        const allowedRoles = ["owner", "ambulance", "police", "moi", "cars", "rg", "MOJ"];
        const userRoles = currentUser.roles.map(role => role.name.toLowerCase());

        if (!userRoles.some(role => allowedRoles.includes(role))) {
          router.push("/unauthorized");
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        router.push("/unauthorized");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar Toggle Button for Mobile */}
      

      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700">
          <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
            Welcome, {user.name}!
          </h1>
          <p className="text-lg text-gray-300 mb-4">
            This is your control hub for{" "}
            <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent font-semibold">
              Arab Universe
            </span>
            .
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                User Stats
              </h3>
              <p className="text-gray-300">Manage all citizens of Arab Universe.</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                City Status
              </h3>
              <p className="text-gray-300">Monitor the pulse of the city.</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                Quick Actions
              </h3>
              <p className="text-gray-300">Access tools and commands.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
