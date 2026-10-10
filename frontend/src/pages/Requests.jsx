import { useEffect, useState } from "react";
import axios from "axios";
import "./Requests.css";

function Requests() {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const loadRequests = async () => {
    try {
      const [incomingResponse, myResponse] = await Promise.all([
        axios.get(
          `http://localhost:8080/api/requests/owner/${user.id}`
        ),
        axios.get(
          `http://localhost:8080/api/requests/requester/${user.id}`
        ),
      ]);

      setIncomingRequests(incomingResponse.data);
      setMyRequests(myResponse.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/requests/${id}/status?status=${status}`
      );

      alert(`Request ${status.toLowerCase()}!`);
      loadRequests();
    } catch (error) {
      console.error(error);
      alert("Failed to update request");
    }
  };

  if (loading) {
    return <h2 className="loading">Loading requests...</h2>;
  }

  return (
    <div className="requests-page">

      <div className="requests-header">
        <h1>Resource Requests</h1>
        <p>Manage requests and track your resource requests.</p>
      </div>

      {/* INCOMING REQUESTS */}
      <div className="requests-container">
        <h2>📩 Requests Received</h2>

        {incomingRequests.length === 0 ? (
          <div className="empty-requests">
            <div>📭</div>
            <h3>No requests received</h3>
            <p>Requests for your resources will appear here.</p>
          </div>
        ) : (
          incomingRequests.map((request) => (
            <div className="request-card" key={request.id}>

              <div className="request-top">
                <span className="request-id">
                  Request #{request.id}
                </span>

                <span
                  className={`request-status ${request.status.toLowerCase()}`}
                >
                  {request.status}
                </span>
              </div>

              <h2>{request.resource.title}</h2>

              <div className="request-details">
                <p>
                  👤 <strong>Requester:</strong>{" "}
                  {request.requester.name}
                </p>

                <p>
                  📧 <strong>Email:</strong>{" "}
                  {request.requester.email}
                </p>

                <p>
                  📍 <strong>Location:</strong>{" "}
                  {request.resource.location}
                </p>

                <p>
                  📂 <strong>Category:</strong>{" "}
                  {request.resource.category}
                </p>
              </div>

              {request.status === "PENDING" && (
                <div className="request-actions">

                  <button
                    className="accept-btn"
                    onClick={() =>
                      updateStatus(request.id, "ACCEPTED")
                    }
                  >
                    ✓ Accept
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() =>
                      updateStatus(request.id, "REJECTED")
                    }
                  >
                    ✕ Reject
                  </button>

                </div>
              )}

              {request.status === "ACCEPTED" && (
                <p className="accepted-message">
                  ✓ Request accepted. Resource is reserved.
                </p>
              )}

              {request.status === "REJECTED" && (
                <p className="rejected-message">
                  ✕ This request was rejected.
                </p>
              )}

            </div>
          ))
        )}
      </div>

      {/* MY REQUESTS */}
      <div className="requests-container">
        <h2>📤 My Requests</h2>

        {myRequests.length === 0 ? (
          <div className="empty-requests">
            <div>📭</div>
            <h3>No requests made</h3>
            <p>Resources you request will appear here.</p>
          </div>
        ) : (
          myRequests.map((request) => (
            <div className="request-card" key={request.id}>

              <div className="request-top">
                <span className="request-id">
                  Request #{request.id}
                </span>

                <span
                  className={`request-status ${request.status.toLowerCase()}`}
                >
                  {request.status}
                </span>
              </div>

              <h2>{request.resource.title}</h2>

              <div className="request-details">

                <p>
                  📂 <strong>Category:</strong>{" "}
                  {request.resource.category}
                </p>

                <p>
                  📍 <strong>Location:</strong>{" "}
                  {request.resource.location}
                </p>

                <p>
                  👤 <strong>Owner:</strong>{" "}
                  {request.resource.owner.name}
                </p>

              </div>

              {request.status === "PENDING" && (
                <p>
                  ⏳ Waiting for the resource owner to respond.
                </p>
              )}

              {request.status === "ACCEPTED" && (
                <p className="accepted-message">
                  ✓ Request accepted! You can arrange the pickup.
                </p>
              )}

              {request.status === "REJECTED" && (
                <p className="rejected-message">
                  ✕ Your request was rejected.
                </p>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Requests;