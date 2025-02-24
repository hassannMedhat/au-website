"use client";
// Users Management Page
import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users")
      .then((res)=> setUsers(res.data))
      .catch((err)=> console.error(err));
  }, []);

  return (
    <div className="dashboard-users">
      <h1>Users Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
             <tr key={user.id}>
               <td>{user.id}</td>
               <td>{user.name}</td>
               <td>{user.email}</td>
               <td>{user.roles ? user.roles.join(", ") : "User"}</td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
