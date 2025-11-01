import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phn, setPhn] = useState("");
  const [add, setAdd] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    // Regex for Gmail format
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    // Regex for 10-digit numeric phone number
    const phoneRegex = /^\d{10}$/;

    if (!gmailRegex.test(email)) {
      alert("❌ Please enter a valid Gmail address (e.g., user@gmail.com)");
      return;
    }

    if (!phoneRegex.test(phn)) {
      alert("❌ Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const res = await fetch("https://c-share.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phn, add }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Registered successfully!");
        window.location.href = "/login";
      } else {
        alert(data.error || "❌ Registration failed");
      }
    } catch (err) {
      alert("❌ Could not connect to backend. Is it running?");
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

      <div className="reg-container">
        <form onSubmit={onSubmit} className="reg-form">
          <h2>Register</h2>

          <label>Full Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Phone Number:</label>
          <input
            type="text"
            value={phn}
            onChange={(e) => setPhn(e.target.value)}
            required
          />

          <label>Address:</label>
          <input
            type="text"
            value={add}
            onChange={(e) => setAdd(e.target.value)}
            required
          />

          <button type="submit">Register</button>

          <div className="links">
            <p>Already have an account? <Link to="/login">Log In</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
