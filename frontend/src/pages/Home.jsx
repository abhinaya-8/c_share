import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Simplified Header for Home Page */}
      <header className="head">
        <img src="/image.png" alt="logo" id="pic" />
        <h1 id="he">Find And Grab</h1>
        <nav id="li">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>

      <section className="hero">
        <h2>Welcome to the Skill Sharing Network</h2>
        <p>
          A community-driven platform where you can <strong>share your skills</strong> or
          <strong> hire talent</strong>. Whether you’re a professional offering services or
          someone seeking help, this is the place to connect!
        </p>
        <Link to="/register" className="btn">
          Get Started
        </Link>
      </section>

      <section className="details">
        <h2>How It Works</h2>
        <div className="cards">
          <div className="card">
            <h3>👨‍🔧 Share Skills</h3>
            <p>Register as a worker and showcase your skills to people who need them.</p>
          </div>
          <div className="card">
            <h3>🔍 Find Talent</h3>
            <p>Hire workers based on their expertise, ratings, and availability.</p>
          </div>
          <div className="card">
            <h3>🤝 Build Community</h3>
            <p>Connect, collaborate, and grow together in a trusted network.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
