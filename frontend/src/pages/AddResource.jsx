import { useState } from "react";
import axios from "axios";
import "./AddResource.css";

function AddResource() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Books",
    conditionStatus: "Good",
    location: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:8080/api/resources", {
        ...formData,
        status: "AVAILABLE",
        owner: { id: user.id },
      });

      setMessage("Resource added successfully! ✅");

      setFormData({
        title: "",
        description: "",
        category: "Books",
        conditionStatus: "Good",
        location: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to add resource ❌");
    }
  };

  return (
    <div className="add-resource-page">

      <div className="add-resource-header">
        <h1>Share a Resource</h1>
        <p>Help another student by sharing something you no longer need.</p>
      </div>

      <div className="form-container">

        <h2>Add New Resource</h2>

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label>Resource Title</label>
          <input
            name="title"
            type="text"
            placeholder="Example: Engineering Mathematics Book"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Describe the resource..."
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Books">Books</option>
            <option value="Lab Equipment">Lab Equipment</option>
            <option value="Electronics">Electronics</option>
            <option value="Stationery">Stationery</option>
            <option value="Other">Other</option>
          </select>

          <label>Condition</label>
          <select
            name="conditionStatus"
            value={formData.conditionStatus}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="Good">Good</option>
            <option value="Used">Used</option>
          </select>

          <label>Location</label>
          <input
            name="location"
            type="text"
            placeholder="Example: Block A, Room 104"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <button type="submit">
            ➕ Add Resource
          </button>

        </form>
      </div>

    </div>
  );
}

export default AddResource;