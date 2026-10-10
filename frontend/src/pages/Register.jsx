import { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        formData
      );

      alert("Registration successful!");
      console.log(response.data);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "STUDENT",
      });
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert("Unable to connect to backend");
      }
    }
  };

  return (
    <div>
      <h2>Student Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;