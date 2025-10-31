import React from "react";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div>
      <header className="head">
                  <img src="/image.png" alt="logo" id="pic" />
                  <h1 id="he">Find And Grab</h1>
                  <nav id="li">
                    <Link to="/hire">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/help">Help</Link>
                    <Link to="/" id="logout-link">Logout</Link>
                  </nav>
                  </header>

      <div className="help-container">
        <h2>Help & FAQs</h2>
        <div className="faq">
          <button className="faq-question">🔹 How do I register?</button>
          <div className="faq-answer">
            <p>Go to the Register page, fill your details and click Register.</p>
          </div>
        </div>
        <div className="faq">
          <button className="faq-question">🔹 How do I hire a worker?</button>
          <div className="faq-answer">
            <p>Login as "Hire", then search and click a profile to contact.</p>
          </div>
        </div>
        <div className="faq">
          <button className="faq-question">🔹 How do I offer my services?</button>
          <div className="faq-answer">
            <p>Login as "Work", update your profile with skills and availability.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
