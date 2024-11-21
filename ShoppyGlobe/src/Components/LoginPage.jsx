import React, { useState } from "react";
import "../CssFiles/LoginPage.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function login() {
    try {
      setLoginError(false);
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        setLoginError(true);
        return;
      } else {
        const formattedResponse = await response.json();
        localStorage.setItem("authToken", formattedResponse.authToken);
        localStorage.setItem("userId", formattedResponse.user._id);
        Swal.fire({
          title: "Login Successful!",
          text: "Welcome !",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/");
      }
    } catch (error) {
      console.log("error in login =", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="login-parent-container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
            {loginError && (
              <p
                style={{
                  fontSize: "0.9rem",
                  marginBottom: "0px",
                  color: "red",
                }}
              >
                check credentials
              </p>
            )}
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p style={{ fontSize: "0.9rem" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer", color: "#007bff" }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
