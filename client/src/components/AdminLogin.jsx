import { useState } from "react";
import { useDispatch } from "react-redux";

import { adminLogin } from "../actions/authActions";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    // Basic validation
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    setError("");

    dispatch(adminLogin(username, password));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.5rem",
              color: "black",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.5rem",
              color: "black",
            }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
