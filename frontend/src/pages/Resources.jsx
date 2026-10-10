import { useEffect, useState } from "react";
import axios from "axios";
import "./Resources.css";

function Resources() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadResources = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/resources"
      );
      setResources(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load resources");
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const requestResource = async (resourceId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await axios.post(
        `http://localhost:8080/api/requests?resourceId=${resourceId}&requesterId=${user.id}`
      );

      alert("Resource requested successfully!");
      loadResources();
    } catch (error) {
      console.error(error);
      alert("Failed to request resource");
    }
  };

  const markCompleted = async (resourceId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/resources/${resourceId}/status?status=COMPLETED`
      );

      alert("Resource marked as completed!");
      loadResources();
    } catch (error) {
      console.error(error);
      alert("Failed to update resource");
    }
  };

  const filteredResources = resources
    .filter((resource) =>
      resource.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (resource) =>
        category === "" || resource.category === category
    );

  return (
    <div className="resources-page">

      <div className="resources-header">
        <h1>Campus Resources</h1>
        <p>Find and reuse resources from other students.</p>
      </div>

      <div className="filters">

        <input
          type="text"
          placeholder="🔍 Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Books">Books</option>
          <option value="Lab Equipment">Lab Equipment</option>
          <option value="Electronics">Electronics</option>
          <option value="Stationery">Stationery</option>
          <option value="Other">Other</option>
        </select>

      </div>

      <div className="resource-grid">

        {filteredResources.length === 0 ? (
          <p className="no-resources">
            No resources found.
          </p>
        ) : (
          filteredResources.map((resource) => (

            <div className="resource-card" key={resource.id}>

              <div className="resource-icon">
                {resource.category === "Books" ? "📚" : "📦"}
              </div>

              <h2>{resource.title}</h2>

              <p>{resource.description}</p>

              <div className="resource-info">
                <span>📂 {resource.category}</span>
                <span>📍 {resource.location}</span>
                <span>🔧 {resource.conditionStatus}</span>
              </div>

              <p className={`status ${resource.status.toLowerCase()}`}>
                ● {resource.status}
              </p>

             {resource.status === "AVAILABLE" &&
  resource.owner?.id !==
    JSON.parse(localStorage.getItem("user"))?.id && (
    <button onClick={() => requestResource(resource.id)}>
      Request Resource
    </button>
  )} 
             {resource.status === "RESERVED" &&
  resource.owner?.id ===
    JSON.parse(localStorage.getItem("user"))?.id && (
    <button onClick={() => markCompleted(resource.id)}>
      Mark Completed
    </button>
  )}
              {resource.status === "COMPLETED" && (
                <p className="completed-text">
                  ✅ Exchange Completed
                </p>
              )}

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default Resources;