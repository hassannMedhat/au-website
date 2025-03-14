"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DiscordCount() {
  const [count, setCount] = useState('0');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/discord');
        setCount(data.member_count || '0');
      } catch (err) {
        console.error('Error:', err);
        setCount('???'); // عرض علامة استفهام إذا حدث خطأ
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // تحديث كل 5 دقائق
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold animate-pulse">{count}</div>
      <div className="mt-2 text-sm opacity-75">Discord Members</div>
    </div>
  );
}