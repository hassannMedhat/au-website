"use client";
// Discord Count Component
import { useEffect, useState } from "react";
import axios from "axios";

export default function DiscordCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get("/api/discord")
      .then((res) => setCount(res.data.member_count))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="discord-count">
      <p>Discord Members: {count}</p>
    </div>
  );
}
