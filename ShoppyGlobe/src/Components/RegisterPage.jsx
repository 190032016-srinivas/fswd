import React, { useState } from "react";
import "../CssFiles/RegisterPage.css"; // Make sure to create this CSS file
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function register() {
    try {
      setRegisterError(false);
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        setRegisterError(true);
        return;
      } else {
        Swal.fire({
          title: "Registration Successful!",
          text: "You can now log in.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log("error in register =", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  return (
    <div className="register-parent-container">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            {registerError && (
              <p
                style={{
                  fontSize: "0.9rem",
                  marginBottom: "0px",
                  color: "red",
                }}
              >
                email already taken
              </p>
            )}
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
        <p style={{ fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", color: "#007bff" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
