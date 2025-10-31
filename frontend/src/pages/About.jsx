import React from "react";
import { Link } from "react-router-dom";
import "../about.css";
const About = () => {
  return (
    <>
      <header className="head">
      <div className="logo-title">
        <img src="/image.png" alt="logo" id="pic" />
        <h1 id="he">Find And Grab</h1>
      </div>
      <nav id="li">
      <Link to="/hire">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/help">Help</Link>
      <Link to="/" id="logout-link">Logout</Link>
    </nav>
    </header>
      <section className="page-content">
        <h2>About Community Skill Sharing</h2>
        <p><strong>SkillShare</strong> is a platform that bridges the gap between skilled workers and people who need their help.</p>
        <h3>Our Mission</h3>
        <p>We aim to empower local talents and provide quick access to essential services for everyone.</p>
        <h3>Why Choose Us?</h3>
        <ul>
          <li>Easy-to-use interface</li>
          <li>Verified and skilled workers</li>
          <li>Flexible and transparent hiring process</li>
          <li>Community-driven recommendations</li>
        </ul>
      </section>
    </>
  );
};

export default About;
