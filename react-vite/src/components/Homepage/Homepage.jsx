// import React from "react";
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
      {/* Black strip title */}
      <div className="spiral-title-strip">
        <h1>T&nbsp;H&nbsp;E&nbsp;&nbsp;O&nbsp;R&nbsp;I&nbsp;G&nbsp;I&nbsp;N&nbsp;A&nbsp;T&nbsp;O&nbsp;R</h1>
      </div>
      {/* Spiral Section */}
      <div className="spiral-section">
        <SpiralVisual />
      </div>

      <div className="verse-wrapper">
        <div className="verse arabic">
            <h2>وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْيْدٍ وَإِنَّا لَمُوسِعُونَ</h2>
        </div>
        <div className="verse english">
            <h2>
            We built the universe with ˹great˺ might, and We are certainly expanding ˹it˺. <br></br>24&nbsp;:&nbsp;35</h2>
        </div>
      </div>
    

      {/* Journals Section */}
      <div className="journal-wrapper">
        {/* Journal 1 */}
        <div className="journal1">
          <div>
            {/* Image */}
            <img></img>
          </div>
             {/* Title */}
          <div className="journal-title">

          </div>
             {/* Arabic Text */}
          <div className="arabic-text">

          </div>
            {/* English Text */}
          <div className="english-text">

          </div>
            {/* Journal */}
          <div className="description">

          </div>
        {/* Journal 1 */}
        <div className="journal1">
          <div>
            {/* Image */}
            <img></img>
          </div>
             {/* Title */}
          <div className="journal-title">

          </div>
             {/* Arabic Text */}
          <div className="arabic-text">

          </div>
            {/* English Text */}
          <div className="english-text">

          </div>
            {/* Journal */}
          <div className="description">

          </div>
        


        </div>
      </div>
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
