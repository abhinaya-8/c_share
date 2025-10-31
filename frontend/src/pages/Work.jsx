import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Work = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.email) {
      const el = document.getElementById('email');
      if (el) el.value = user.email;
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      jobType: document.getElementById('jobType').value,
      experience: document.getElementById('experience').value,
    };
    try {
      const res = await fetch('/api/workers/details', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
      });
      const result = await res.json();
      const msg = document.getElementById('msg');
      if (msg) {
        msg.innerText = result.message || result.error;
        msg.style.color = res.ok ? 'green' : 'red';
      }
    } catch (err) {
      const msg = document.getElementById('msg'); if (msg) { msg.innerText = 'Error: ' + err.message; msg.style.color = 'red'; }
    }
  };

  return (
    <div>
      <header className="head">
                        <img src="/image.png" alt="logo" id="pic" />
                        <h1 id="he">Find And Grab</h1>
                        <nav id="li">
                          
                          <Link to="/login">Log Out</Link>
                          
                          
                        </nav>
                        </header>

      <div className="reg-container">
        <form id="workForm" className="reg-form" onSubmit={onSubmit}>
          <h2>Worker Details</h2>
          <label>Full Name:</label>
          <input type="text" id="name" name="name" required />
          <label>Email:</label>
          <input type="email" id="email" name="email" required readOnly />
          <label>Job Type:</label>
          <select id="jobType" name="jobType" required>
            <option value="">-- Select a Job --</option>
            <option>Plumber</option>
            <option>Electrician</option>
            <option>Tutor</option>
            <option>Painter</option>
            <option>Mechanic</option>
            <option>Gardener</option>
            <option>Chef</option>
            <option>Caretacker</option>
          </select>
          <label>Experience:</label>
          <textarea id="experience" name="experience" rows="3" placeholder="e.g., 2 years" required />
          <button type="submit">Save Details</button>
          <p id="msg" style={{ marginTop: '10px', textAlign: 'center', fontWeight: 'bold' }}></p>
        </form>
      </div>
    </div>
  );
};

export default Work;
