import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchLikes,
  postLike,
  removeLike,
  getLikesByGalleryId,
  getUsernamesByGalleryId
} from "../../redux/likes";
import { useModal } from "../../context/Modal";
import AuthPromptModal from "../AuthPromptModal/AuthPromptModal";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./LikeButton.css";

const LikeButton = ({ galleryId, compact = false }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  // Grab likes and usernames from selectors
  const likesForGallery = useSelector((state) =>
    getLikesByGalleryId(state, galleryId)
  );
  const usersWhoLiked = useSelector((state) =>
    getUsernamesByGalleryId(state, galleryId)
  );
  const likeCount = likesForGallery.length;

  // Track whether this user has liked
  const userHasLiked = sessionUser
    ? likesForGallery.some((like) => like.user.id === sessionUser.id)
    : false;

  const [showDropdown, setShowDropdown] = useState(false);
  const { setModalContent } = useModal();

  useEffect(() => {
    if (galleryId) dispatch(fetchLikes(galleryId));
  }, [dispatch, galleryId]);

  const handleLikeToggle = async () => {
    if (!sessionUser) {
      // Prompt login/signup if not logged in
      setModalContent(
        <AuthPromptModal
          onClose={() => setModalContent(null)}
          openLogin={() => setModalContent(<LoginFormModal />)}
          openSignup={() => setModalContent(<SignupFormModal />)}
        />
      );
      return;
    }

    if (userHasLiked) {
      await dispatch(removeLike(galleryId));
    } else {
      await dispatch(postLike(galleryId));
    }
  };

  return (
    <div className={`like-container ${compact ? "compact" : ""}`}>
      <button
        onClick={handleLikeToggle}
        className={`like-button ${userHasLiked ? "liked" : ""}`}
        aria-label={userHasLiked ? "Unlike gallery" : "Like gallery"}
      >
        <span className="heart-icon">♥</span>
      </button>

      {/* Like Count */}
      <span
        className={`like-count ${likeCount > 0 ? "clickable" : ""}`}
        onClick={() => likeCount > 0 && setShowDropdown(!showDropdown)}
      >
        {likeCount}
      </span>

      {/* Dropdown of usernames */}
      {showDropdown && likeCount > 0 && (
        <div className="likes-dropdown">
          <h4>Liked by:</h4>
          <ul>
            {usersWhoLiked.map((username, idx) => (
              <li key={idx}>{username}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LikeButton;
