"use client";
// Logs Page (Owners Only)
import { useEffect, useState } from "react";
import axios from "axios";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("/api/logs")
      .then((res)=> setLogs(res.data))
      .catch((err)=> console.error(err));
  }, []);

  return (
    <div className="dashboard-logs">
      <h1>Logs</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.user?.name || "N/A"}</td>
              <td>{log.action}</td>
              <td>{log.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
