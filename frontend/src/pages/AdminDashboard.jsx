import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersResponse, resourcesResponse, requestsResponse] =
          await Promise.all([
            axios.get("http://localhost:8080/api/users"),
            axios.get("http://localhost:8080/api/resources"),
            axios.get("http://localhost:8080/api/requests/all"),          ]);

        setUsers(usersResponse.data);
        setResources(resourcesResponse.data);
        setRequests(requestsResponse.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load admin data");
      }
    };

    loadData();
  }, []);

  const available = resources.filter(
    (r) => r.status === "AVAILABLE"
  ).length;

  const reserved = resources.filter(
    (r) => r.status === "RESERVED"
  ).length;

  const completed = resources.filter(
    (r) => r.status === "COMPLETED"
  ).length;

  const pending = requests.filter(
    (r) => r.status === "PENDING"
  ).length;

  return (
    <div className="admin-page">

      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Campus Resource Rescue Management</p>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <span>👥</span>
          <h2>{users.length}</h2>
          <p>Total Users</p>
        </div>

        <div className="stat-card">
          <span>📚</span>
          <h2>{resources.length}</h2>
          <p>Total Resources</p>
        </div>

        <div className="stat-card">
          <span>📩</span>
          <h2>{requests.length}</h2>
          <p>Total Requests</p>
        </div>

        <div className="stat-card">
          <span>⏳</span>
          <h2>{pending}</h2>
          <p>Pending Requests</p>
        </div>

      </div>

      <div className="admin-section">

        <h2>Resource Status</h2>

        <div className="status-grid">

          <div>
            <strong>{available}</strong>
            <p>Available</p>
          </div>

          <div>
            <strong>{reserved}</strong>
            <p>Reserved</p>
          </div>

          <div>
            <strong>{completed}</strong>
            <p>Completed</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;