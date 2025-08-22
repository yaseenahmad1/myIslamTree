import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import AuthPromptModal from "../AuthPromptModal/AuthPromptModal"
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import TreeStatus from "../ProgressTree/ProgressTree"

function Navigation() {
  const currentUser = useSelector((state) => state.session.user);
  const { setModalContent, closeModal } = useModal();
  const navigate = useNavigate();
  const [showTreeDropdown, setShowTreeDropdown] = useState(false);

  const openLoginModal = () => setModalContent(<LoginFormModal />);
  const openSignupModal = () => setModalContent(<SignupFormModal />);

  const treeDropdownItems = [
    { label: "myJournalGalleries", path: "/my-galleries" },
    { label: "myReflectionJournals", path: "/my-private-journals" },
    { label: "myCorrhizae", path: "/my-corrhizae" },
  ];
  
  const handleDropdownClick = (path) => {
    if (!currentUser) {
      setModalContent(<AuthPromptModal 
        onClose={closeModal}                    // closes the auth prompt
        openLogin={() => setModalContent(<LoginFormModal />)} // takes us to our log in modal
        openSignup={() => setModalContent(<SignupFormModal />)} // and this to the sign up 
        />);
    } else {
      navigate(path);
      setShowTreeDropdown(false); // hiding dropdown after navigation
    }
  };

  return (
    <nav className="nav-header">
      {/* Left: Tree Logo + Dropdown */}
      <div 
        className="tree-dropdown-container"
        onMouseEnter={() => setShowTreeDropdown(true)}
        onMouseLeave={() => setShowTreeDropdown(false)}
      >
       
         {/* Small nav icon */}
      {currentUser ? (
        <TreeStatus totalProgress={currentUser.total_progress} />  // small by default
      ) : (
        <img src="/tree.svg" alt="Tree Logo" className="tree-logo" />
      )}
     

        {showTreeDropdown && (
          <div className="tree-dropdown">
           {/* Big tree in dropdown */}
          {currentUser ? (
            <div
              onClick={() => {
                navigate("/home");
                setShowTreeDropdown(false);
              }}
              style={{ cursor: "pointer" }}
              title="Homepage"
            >
              <TreeStatus totalProgress={currentUser.total_progress} size="big" />
            </div>
          ) : (
            <img
              src="/tree.svg"
              alt="Progress Tree"
              className="big-tree"
              onClick={() => {
                navigate("/home");
                setShowTreeDropdown(false);
              }}
              style={{ cursor: "pointer" }}
              title="Homepage"
            />
          )}
          
            {treeDropdownItems.map((item) => ( // easier to map through each dropdown item so that we can link it to the respective paths
              <button
                key={item.path} // the key is path that we touch on which will grab us our value links
                className="dropdown-link"
                onClick={() => handleDropdownClick(item.path)} // on click take us to that path 
              >
              {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Profile Button */}
      <div className="profile-wrapper">
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
