import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Help from "./pages/Help";
import About from "./pages/About";
import Hire from "./pages/Hire";
import Work from "./pages/Work";
import "./App.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/help" element={<Help/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/hire" element={<Hire />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </div>
  );
};

export default App;
