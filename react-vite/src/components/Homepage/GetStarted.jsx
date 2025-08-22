// src/components/homepage/GetStarted.jsx
// import React from "react";
import "./GetStarted.css";

const GetStarted = () => {
  return (
    <div className="get-started-container">
        <div className="get-started-content">
            <img
                src="/browntree.png"
                alt="Tree Logo"
                className="get-started-tree"
            />
        </div>
      
      <div className="get-started-text">
        <h2>Welcome to myIslamTree!</h2>
        <p>
          This is a platform where you can create your own `&quot;`museum`&quot;` of galleries 
          and journals, reflecting on the verses of the Quran. The purpose of this 
          site is to help you maintain a personal collection of reflections and 
          analyses of the Quran, as Allah says in Surah 38:28: 
          <br />
          <div className="get-started-text-verse">
          <em>`&quot;`[This is] a blessed Book which We have revealed to you, [O Muhammad], 
          that they might reflect upon its verses and that those of understanding 
          would be reminded.`&quot;`</em>
          </div>
        </p>
        <p>
          As you explore this page, you`&lsquo;`ll see an example from a user`&lsquo;`s gallery 
          demonstrating how you can create your very own galleries!
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
