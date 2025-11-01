import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Work");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://c-share.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        // SPA-friendly redirect using react-router
        if (role === "Work") navigate("/work");
        else navigate("/hire");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("Could not connect to backend. Is it running?");
    }
  };

  return (
    <div>
      <header className="head">
              <img src="/image.png" alt="logo" id="pic" />
              <h2><Link to="/" id="logout-link">Find And Grab</Link></h2>
              <nav id="li">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                
              </nav>
            </header>

      <div className="login-container">
        <form onSubmit={onSubmit} className="login-form">
          <h2>Login</h2>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <label>Login as:</label>
          <div className="roles">
            <input type="radio" id="roleWork" name="role" value="Work" checked={role === "Work"} onChange={() => setRole("Work")} />
            <label htmlFor="roleWork">Work</label>
            <input type="radio" id="roleHire" name="role" value="Hire" checked={role === "Hire"} onChange={() => setRole("Hire")} />
            <label htmlFor="roleHire">Hire</label>
          </div>

          <button type="submit">Login</button>

          <div className="links">
            <p>Don’t have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
