"use client";
// Live Streamers Component
import { useEffect, useState } from "react";
import axios from "axios";

export default function LiveStreamers() {
  const [streamers, setStreamers] = useState([]);

  useEffect(() => {
    axios.get("/api/streamers/live")
      .then((res) => setStreamers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="live-streamers">
      <h2>Live Streamers</h2>
      <ul>
        {streamers.map((streamer) => (
          <li key={streamer.id}>{streamer.platform}: {streamer.stream_url}</li>
        ))}
      </ul>
    </div>
  );
}
