"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaTrash } from "react-icons/fa";

export default function JobApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [userRoles, setUserRoles] = useState([]);
  const applicantsPerPage = 5;

  // تعيين الرولات مع الوظائف المرتبطة بها
  const roleJobMapping = {
    "Police": "Ministry of Interior",
    "Cars": "Car showroom",
    "MOI": "Ministry of Industry",
    "Ambulance": "Ministry of Health",
    "RG": "Republican Guard",
    "MOJ": "MOJ",
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setError("Unauthorized access. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:8000/api/job-applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(res.data)) {
          setApplicants(res.data);
        } else {
          setError("Unexpected API response format.");
        }

        const userRes = await axios.get("http://127.0.0.1:8000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserRoles(userRes.data.user.roles.map((role) => role.name));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load applicants.");
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const applicant = applicants.find((app) => app.id === id);
    const isOwner = userRoles.includes("Owner");
    const maxChanges = isOwner ? 3 : 1;

    if (applicant.status_change_count >= maxChanges) {
      alert(`You have reached the maximum number of status changes (${maxChanges}).`);
      return;
    }

    const confirmMessage =
      isOwner && applicant.status_change_count === 1
        ? "This is your second change. You have one change left. Confirm?"
        : `Are you sure you want to change the status to ${newStatus}? This action cannot be undone.`;

    if (window.confirm(confirmMessage)) {
      try {
        const token = Cookies.get("token");
        const res = await axios.put(
          `http://127.0.0.1:8000/api/job-applications/${id}/status`,
          { status: newStatus },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setApplicants(
          applicants.map((app) =>
            app.id === id
              ? { ...app, status: newStatus, status_change_count: res.data.status_change_count }
              : app
          )
        );
      } catch (err) {
        alert("Failed to update status: " + (err.response?.data?.message || "Unknown error"));
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        const token = Cookies.get("token");
        await axios.delete(`http://127.0.0.1:8000/api/job-applications/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplicants(applicants.filter((app) => app.id !== id));
      } catch (err) {
        alert("Failed to delete application.");
      }
    }
  };

  const totalPages = useMemo(() => Math.ceil(applicants.length / applicantsPerPage), [applicants]);

  const displayedApplicants = useMemo(() => {
    let filteredApplicants = [...applicants].sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    );

    const isOwner = userRoles.includes("Owner");

    if (!isOwner) {
      // فلترة التقديمات بناءً على الرولات مع التعيين
      filteredApplicants = filteredApplicants.filter((app) =>
        userRoles.some((role) => roleJobMapping[role] === app.job_requested)
      );
    }

    const startIndex = (currentPage - 1) * applicantsPerPage;
    return filteredApplicants.slice(startIndex, startIndex + applicantsPerPage);
  }, [applicants, currentPage, userRoles]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">
        Job Applicants - FiveM
      </h1>

      {loading ? (
        <p className="text-gray-400 text-center">Loading applicants...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : applicants.length === 0 ? (
        <p className="text-gray-400 text-center">No applicants found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedApplicants.map((applicant) => (
            <div
              key={applicant.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg hover:scale-105 transition-transform duration-200 relative"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-blue-400">
                  {applicant.real_name || "Unknown"}
                </h2>
                {userRoles.includes("Owner") && (
                  <button
                    onClick={() => handleDelete(applicant.id)}
                    className="text-red-400 hover:text-red-500 transition-colors"
                  >
                    <FaTrash size={20} />
                  </button>
                )}
              </div>
              <p><strong>Applied At:</strong> {new Date(applicant.created_at).toLocaleString()}</p>
              <p><strong>City Name:</strong> {applicant.city_name || "N/A"}</p>
              <p><strong>Discord ID:</strong> {applicant.discord_id || "N/A"}</p>
              <p><strong>National ID:</strong> {applicant.national_id || "N/A"}</p>
              <p><strong>Age:</strong> {applicant.age || "N/A"}</p>
              <p><strong>Group:</strong> {applicant.group || "N/A"}</p>
              <p><strong>Job Requested:</strong> {applicant.job_requested || "N/A"}</p>
              <p><strong>Previous Job:</strong> {applicant.previous_job || "N/A"}</p>
              <p><strong>Current Job:</strong> {applicant.current_job_field || "N/A"}</p>
              <p><strong>Reason:</strong> {applicant.reason || "N/A"}</p>
              <p><strong>Daily Hours:</strong> {applicant.daily_hours || "N/A"}</p>
              <p><strong>Status:</strong> {applicant.status || "Pending"}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleStatusChange(applicant.id, "Accepted")}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  disabled={applicant.status !== "Pending"}
                >
                  قبول
                </button>
                <button
                  onClick={() => handleStatusChange(applicant.id, "Rejected")}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  disabled={applicant.status !== "Pending"}
                >
                  رفض
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-600 text-white px-4 py-2 rounded-l disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-700">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-blue-600 text-white px-4 py-2 rounded-r disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}