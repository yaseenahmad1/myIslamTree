import React from "react";
import SpiralVisual from "./SpiralVisual"; // make sure path is correct
import GetStarted from "./GetStarted";
import "./Homepage.css"; // optional for homepage-specific styles

const Homepage = () => {
  return (
    <div className="homepage-container">
      {/* Get Started Section */}
      <div className="get-started-wrapper">
        <GetStarted />
      </div>
      {/* Spiral Section */}
      <div className="spiral-section">
        <SpiralVisual />
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Features</h2>
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
