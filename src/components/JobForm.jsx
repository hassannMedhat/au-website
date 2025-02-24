"use client";
// Job Application Form Component
import { useState } from "react";
import axios from "axios";

export default function JobForm() {
  const [position, setPosition] = useState("");
  const [resume, setResume] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/jobs", { position, resume });
      setPosition("");
      setResume("");
      alert("Job application submitted");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <input
        type="text"
        placeholder="Resume URL"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />
      <button type="submit">Apply</button>
    </form>
  );
}
