import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addAdmin } from "../actions/adminActions";

const AddAdmin = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    school: "Tapinac Elementary School",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAdmin(formData));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Add Admin</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="school"
            style={{ display: "block", marginBottom: "5px" }}
          >
            School
          </label>
          <select
            type="text"
            id="school"
            name="school"
            value={formData.school}
            onChange={handleChange}
            placeholder="Enter admin school"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "#000000",
            }}
          >
            <option>Tapinac Elementary School</option>
            <option>Matain Elementary School</option>
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="username"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter admin username"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "#000000",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "#000000",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Admin
        </button>
      </form>
    </div>
  );
};

export default AddAdmin;
