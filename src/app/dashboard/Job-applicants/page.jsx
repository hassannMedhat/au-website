"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function JobApplicantsPage() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setError("Unauthorized. Please log in.");
      setLoading(false);
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/job-applications", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setApplicants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching applicants. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Job Applicants</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Real Name</th>
                <th className="border p-2">City</th>
                <th className="border p-2">Discord ID</th>
                <th className="border p-2">Job Requested</th>
                <th className="border p-2">Reason</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.id} className="border">
                  <td className="border p-2">{applicant.realName}</td>
                  <td className="border p-2">{applicant.cityName}</td>
                  <td className="border p-2">{applicant.discordId}</td>
                  <td className="border p-2">{applicant.jobRequested}</td>
                  <td className="border p-2">{applicant.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
