"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";

const jobsList = [
  { id: 1, title: "Ambulance", logo: "/images/ambulance.png", soon: false },
  { id: 2, title: "Police", logo: "/images/police.png", soon: false },
  { id: 3, title: "MOI", logo: "/images/moi.png", soon: false },
  { id: 4, title: "Cars", logo: "/images/cars.png", soon: false },
  { id: 5, title: "RG", logo: "/images/rg.png", soon: true },
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
  const [formSuccess, setFormSuccess] = useState("");

  // جلب بيانات المستخدم لو مسجل دخول
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
        .catch((err) => {
          console.error("Error fetching profile:", err);
        });
    }
  }, []);

  const handleApplyClick = (job) => {
    if (!Cookies.get("token")) {
      // إذا لم يكن المستخدم مسجل دخول، يتم عرضه تنبيه مع رابط تسجيل الدخول
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    // التحقق من الحقول المطلوبة (يمكن تعديلها حسب احتياجاتك)
    const { realName, cityName, discordId, nationalId, reason, dailyHours } = formData;
    if (!realName || !cityName || !discordId || !nationalId || !reason || !dailyHours) {
      setFormError("Please fill in all required fields.");
      return;
    }

    // محاكاة إرسال الطلب (يمكن استبدالها بنداء API)
    console.log("Submitting job application:", formData);
    setTimeout(() => {
      setFormSuccess(
        `Your application for ${formData.jobRequested} has been submitted. We will review your application and contact you soon.`
      );
      // هنا يمكنك إرسال البيانات للوحة تحكم الادمنز عبر API
      setShowModal(false);
      // إعادة تعيين الحقول (باستثناء الاسم الحقيقي)
      setFormData((prev) => ({
        ...prev,
        cityName: "",
        discordId: "",
        nationalId: "",
        age: "",
        group: "",
        previousJob: "",
        currentJobField: "",
        reason: "",
        dailyHours: "",
      }));
      setFormSuccess("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Job Opportunities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobsList.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <div className="w-20 h-20 mb-4">
              <Image src={job.logo} alt={`${job.title} Logo`} width={80} height={80} />
            </div>
            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
            {job.soon ? (
              <div className="bg-gray-800 text-white px-4 py-2 rounded">Soon</div>
            ) : (
              <button
                onClick={() => handleApplyClick(job)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Apply
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal Popup for Job Application Form */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Apply for {currentJob?.title}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Q1: Real Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  اسمك الحقيقي
                </label>
                <input
                  type="text"
                  name="realName"
                  value={formData.realName}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              {/* Q2: City Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  اسمك داخل المدينة
                </label>
                <input
                  type="text"
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              {/* Q3: Discord ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ID الديسكورد الخاص بك
                </label>
                <input
                  type="text"
                  name="discordId"
                  value={formData.discordId}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              {/* Q4: National ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  الرقم القومي في المدينة
                </label>
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              {/* Q5: Age (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  السن (اختياري)
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* Q6: Group (if any) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  الجروب الخاص بك إن وُجد
                </label>
                <input
                  type="text"
                  name="group"
                  value={formData.group}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              {/* Q7: Job Requested (optional, prepopulated) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  الوظيفة المطلوبة (اختياري)
                </label>
                <input
                  type="text"
                  name="jobRequested"
                  value={formData.jobRequested}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* Q8: Previous Job (if any) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  الوظيفة السابقة إن وُجد
                </label>
                <input
                  type="text"
                  name="previousJob"
                  value={formData.previousJob}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              {/* Q9: Current Job (if any) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  الوظيفة الحالية إن وُجد
                </label>
                <input
                  type="text"
                  name="currentJobField"
                  value={formData.currentJobField}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              {/* Q10: Reason for applying */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  سبب رغبتك في الوظيفة
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                ></textarea>
              </div>
              {/* Q11: Daily Hours */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  عدد ساعات التواجد يوميًا
                </label>
                <input
                  type="number"
                  name="dailyHours"
                  value={formData.dailyHours}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              {formError && <p className="text-red-500">{formError}</p>}
              {formSuccess && <p className="text-green-500">{formSuccess}</p>}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
