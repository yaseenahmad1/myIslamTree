// src/components/Homepage/Footer.jsx
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import AuthPromptModal from "../AuthPromptModal/AuthPromptModal";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Footer.css";

export default function Footer() {
  const user = useSelector((s) => s.session.user);
  const { setModalContent, closeModal } = useModal();

  const openLogin = () => setModalContent(<LoginFormModal />);
  const openSignup = () => setModalContent(<SignupFormModal />);

  const openAuthPrompt = () =>
    setModalContent(
      <AuthPromptModal
        onClose={closeModal}
        openLogin={openLogin}
        openSignup={openSignup}
      />
    );

  return (
    <footer className="site-footer">
      {/* Left side */}
      <div className="footer-left">
        {!user ? (
          <>
            <div className="message">
              <p>Plant your seed and grow your tree today!</p>
            </div>
            <button className="join-btn" onClick={openAuthPrompt}>
              Join
            </button>
          </>
        ) : (
          <p className="welcome-msg">Salaam, {user.username}!</p>
        )}
      </div>

      {/* Divider */}
      <div className="footer-divider"></div>

      {/* Right side */}
      <div className="footer-right">
        <h4>Web Developer Contact</h4>
        <p>Yaseen Ahmad</p>
        <p><a href="mailto:yahmad09@gmail.com">yahmad09@gmail.com</a></p>
        <p><a href="https://github.com/yaseenahmad1" target="_blank" rel="noreferrer">GitHub</a></p>
        <p><a href="https://github.com/yaseenahmad1" target="_blank" rel="noreferrer">My Portfolio</a></p>
      </div>
    </footer>
  );
}





