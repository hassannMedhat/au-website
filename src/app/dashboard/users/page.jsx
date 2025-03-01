"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// خريطة ثابتة تربط role_id مع اسم الرول
const roleMapping = {
  1: "Owner",
  2: "User",
  3: "Ambulance",
  4: "Police",
  5: "MOI",
  6: "Cars",
  7: "RG",
  8: "MOJ",
};

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [roleMappings, setRoleMappings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");

  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const usersRes = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersRes.data || []);

        const rolesRes = await axios.get("http://127.0.0.1:8000/api/role_user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRoleMappings(rolesRes.data || []);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const getUserRoles = (userId) => {
    const mappings = roleMappings.filter((mapping) => mapping.user_id === userId);
    return mappings.map((mapping) => roleMapping[mapping.role_id]) || [];
  };

  const toggleRole = async (userId, roleId) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/toggle-role",
        { user_id: userId, role_id: roleId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const rolesRes = await axios.get("http://127.0.0.1:8000/api/role_user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoleMappings(rolesRes.data || []);
    } catch (err) {
      setError("Failed to update role.");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      search === "" ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const userRoles = getUserRoles(user.id);
    const matchesRole = filterRole === "" || userRoles.includes(filterRole);

    return matchesSearch && matchesRole;
  });

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-red-600 text-center shadow-lg shadow-red-500">
        ⚠️ Users Management - Danger Zone ⚠️
      </h1>

      <div className="mb-4 flex flex-wrap justify-center gap-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 text-black rounded bg-gray-200 focus:outline-none"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 text-black rounded bg-gray-200 focus:outline-none"
        >
          <option value="">All Roles</option>
          {Object.values(roleMapping).map((roleName, index) => (
            <option key={index} value={roleName}>
              {roleName}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border border-red-700 shadow-lg shadow-red-500">
        <thead className="bg-red-800 text-white">
          <tr>
            <th className="border border-red-600 p-3">ID</th>
            <th className="border border-red-600 p-3">Name</th>
            <th className="border border-red-600 p-3">Email</th>
            <th className="border border-red-600 p-3">Roles</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const userRoles = getUserRoles(user.id);
              return (
                <tr
                  key={user.id}
                  className="bg-gray-800 border border-red-700 hover:bg-red-900 transition duration-300"
                >
                  <td className="border border-red-600 p-3">{user.id}</td>
                  <td className="border border-red-600 p-3">{user.name}</td>
                  <td className="border border-red-600 p-3">{user.email}</td>
                  <td className="border border-red-600 p-3">
                    {Object.entries(roleMapping).map(([roleId, roleName]) => {
                      const hasRole = userRoles.includes(roleName);
                      return (
                        <button
                          key={`${user.id}-${roleId}`}
                          onClick={() => toggleRole(user.id, roleId)}
                          className={`px-3 py-1 mx-1 rounded transition text-white font-bold ${
                            hasRole
                              ? "bg-red-500 hover:bg-red-700"
                              : "bg-black hover:bg-gray-700"
                          }`}
                        >
                          {roleName}
                        </button>
                      );
                    })}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-400">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
