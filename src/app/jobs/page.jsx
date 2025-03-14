"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Particles from "react-tsparticles";

const jobsList = [
  { id: 1, title: "Ministry of Health", logo: "/images/ambulance.png", soon: false },
  { id: 2, title: "Ministry of Interior", logo: "/images/police.png", soon: false },
  { id: 3, title: "Ministry of Industry", logo: "/images/moi.png", soon: false },
  { id: 4, title: "Car showroom", logo: "/images/cars.png", soon: false },
  { id: 5, title: "Republican Guard", logo: "/images/rg.png", soon: true },
  { id: 6, title: "MOJ", logo: "/images/moj.png", soon: true },
];

export default function JobsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [formData, setFormData] = useState({
    realName: "",
    cityName: "",
    discordId: "",
    nationalId: "",
    age: "",
    group: "",
    jobRequested: "",
    previousJob: "",
    currentJobField: "",
    reason: "",
    dailyHours: "",
  });
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const userData = res.data.user || res.data;
          setUser(userData);
          setFormData((prev) => ({ ...prev, realName: userData.name || "" }));
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, []);

  const handleApplyClick = (job) => {
    if (!Cookies.get("token")) {
      alert("You must be logged in to apply. Redirecting to login page...");
      router.push("/login");
      return;
    }
    if (job.soon) return;
    setCurrentJob(job);
    setFormData((prev) => ({ ...prev, jobRequested: job.title }));
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsLoading(true);

    const { realName, cityName, discordId, nationalId, reason, dailyHours } = formData;
    if (!realName || !cityName || !discordId || !nationalId || !reason || !dailyHours) {
      setFormError("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const token = Cookies.get("token");
      const payload = {
        real_name: realName,
        city_name: cityName,
        discord_id: discordId,
        national_id: nationalId,
        age: formData.age,
        group: formData.group,
        job_requested: formData.jobRequested,
        previous_job: formData.previousJob,
        current_job_field: formData.currentJobField,
        reason: reason,
        daily_hours: dailyHours,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/job-applications",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setShowSuccessAnimation(true);
        setTimeout(() => {
          setShowSuccessAnimation(false);
          setShowModal(false);
          setFormData({
            realName: "",
            cityName: "",
            discordId: "",
            nationalId: "",
            age: "",
            group: "",
            jobRequested: "",
            previousJob: "",
            currentJobField: "",
            reason: "",
            dailyHours: "",
          });
        }, 2500);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } catch (error) {
      setFormError(error.response?.data?.message || "Failed to submit application.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-indigo-900 text-white w-full p-0 m-0 relative">
      {/* خلفية الجزيئات */}
      <Particles
        id="tsparticles"
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: { repulse: { distance: 200, duration: 0.4 } },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.5 },
            move: { enable: true, speed: 2 },
            number: { density: { enable: true, value_area: 800 }, value: 80 },
            opacity: { value: 0.5 },
            size: { random: true, value: 5 },
          },
        }}
      />

      <h1 className="text-5xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">
        Welcome to Arab Universe - Job Opportunities
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto z-10">
        {jobsList.map((job) => (
          <div
            key={job.id}
            className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-xl shadow-xl p-6 flex flex-col items-center transition-all duration-300 hover:scale-110 hover:rotate-2 hover:shadow-2xl hover:bg-opacity-100 cursor-pointer"
            onClick={() => handleApplyClick(job)}
          >
            <div className="w-32 h-32 mb-4 relative">
              <Image
                src={job.logo}
                alt={`${job.title} Logo`}
                width={128}
                height={128}
                className="rounded-full shadow-md transition-transform duration-300 hover:scale-110"
              />
              {job.soon && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                  <span className="text-white text-sm font-bold">Coming Soon</span>
                </div>
              )}
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-blue-300">{job.title}</h2>
            {!job.soon && (
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg animate-pulse">
                Apply Now
              </button>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm z-50 p-4 overflow-y-auto">
          <div className="bg-gray-900 bg-opacity-90 rounded-xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all scale-100 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-blue-300">Apply for {currentJob?.title}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white text-3xl transition-colors">
                ×
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300">Your Real Name</label>
                <p className="mt-1 block w-full border border-gray-600 rounded-md p-3 bg-gray-800 text-white">
                  {user?.name || "Loading..."}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Your Name in the City</label>
                <input
                  type="text"
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-3 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Your Discord ID</label>
                <input
                  type="text"
                  name="discordId"
                  value={formData.discordId}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-3 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">National ID in the City</label>
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-3 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Reason for Applying</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-3 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Daily Hours Available</label>
                <input
                  type="number"
                  name="dailyHours"
                  value={formData.dailyHours}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md p-3 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              {formError && <p className="text-red-400">{formError}</p>}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg animate-pulse"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      )}

      {showSuccessAnimation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-green-600 bg-opacity-90 rounded-lg p-8 text-white text-center animate-fadeIn">
            <svg className="w-24 h-24 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path
                className="checkmark"
                d="M5 13l4 4L19 7"
                strokeDasharray="22"
                strokeDashoffset="22"
                style={{ animation: "draw 1s ease forwards" }}
              />
            </svg>
            <h2 className="text-2xl font-bold">Your request has been submitted successfully!</h2>
            <p className="mt-2">We will contact you as soon as possible.</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        .checkmark {
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}