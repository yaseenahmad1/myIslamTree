import { useEffect } from "react";

export default function Screensaver() {
  useEffect(() => {

    // lock scrolling so that the page is static : 
    document.body.style.overflow = "hidden"; 
    // Redirect when the user clicks anywhere
    const handleClick = () => {
      window.location.href = "/home"; // Send them to your homepage
    };

    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, []);

  return (
    <iframe
      src="/greetings/greetings.html"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        overflow: "hidden",
      }}
      title="salaam"
    />
  );
}
