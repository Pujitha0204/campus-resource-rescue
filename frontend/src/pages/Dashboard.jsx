import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [resources, setResources] = useState([]);
  const [myRequests, setMyRequests] = useState([]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [resourcesResponse, requestsResponse] =
          await Promise.all([
            axios.get("http://localhost:8080/api/resources"),
            axios.get(
              `http://localhost:8080/api/requests/requester/${user.id}`
            ),
          ]);

        setResources(resourcesResponse.data);
        setMyRequests(requestsResponse.data);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    };

    if (user) {
      loadDashboardData();
    }
  }, [user?.id]);

  const availableResources = resources.filter(
    (resource) => resource.status === "AVAILABLE"
  ).length;

  const myResources = resources.filter(
    (resource) => resource.owner?.id === user?.id
  ).length;

  const reservedResources = resources.filter(
    (resource) =>
      resource.owner?.id === user?.id &&
      resource.status === "RESERVED"
  ).length;

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>Campus Resource Rescue</h1>
          <p>Welcome, {user?.name}! 👋</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">

        <h2>Student Dashboard</h2>

        <p className="subtitle">
          Find, share and reuse useful campus resources.
        </p>

        {/* STATISTICS */}
        <div className="dashboard-stats">

          <div className="stat-box">
            <div className="stat-icon">📚</div>
            <div>
              <h3>{availableResources}</h3>
              <p>Available Resources</p>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon">📩</div>
            <div>
              <h3>{myRequests.length}</h3>
              <p>My Requests</p>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon">📦</div>
            <div>
              <h3>{myResources}</h3>
              <p>My Shared Resources</p>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon">🔄</div>
            <div>
              <h3>{reservedResources}</h3>
              <p>Reserved Resources</p>
            </div>
          </div>

        </div>

        {/* EXISTING CARDS */}
        <div className="dashboard-cards">

          <Link to="/resources" className="dashboard-card">
            <div className="card-icon">📚</div>
            <h3>Browse Resources</h3>
            <p>
              Find books, equipment and other available resources.
            </p>
          </Link>

          <Link to="/add-resource" className="dashboard-card">
            <div className="card-icon">➕</div>
            <h3>Add Resource</h3>
            <p>
              Share an unused resource with other students.
            </p>
          </Link>

          <Link to="/requests" className="dashboard-card">
            <div className="card-icon">📩</div>
            <h3>Resource Requests</h3>
            <p>
              View and manage resource requests.
            </p>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;