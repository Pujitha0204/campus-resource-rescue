import { useState } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "http://localhost:8080/api/users/login",
        formData
      );

      alert("Login successful!");

      console.log(response.data);

      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      window.location.href = "/dashboard";

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Unable to connect to backend");
      }
    }
  };

  return (
    <div>
      <h2>Student Login</h2>

      <form onSubmit={handleSubmit}>

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
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;