import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCurrentUserGalleries, thunkDeleteGallery } from "../../redux/galleries";
import { NavLink, useNavigate } from "react-router-dom";
import "./CurrentUserGalleries.css";
import ConfirmDeleteGalleryModal from "./ConfirmDeleteGalleryModal";

function CurrentUserGalleries() {
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const galleries = useSelector(state => state.galleries.currentUserGalleries);

  useEffect(() => {
    dispatch(thunkGetCurrentUserGalleries());
  }, [dispatch]);

  const handleDelete = (galleryId) => {
    if (window.confirm("Are you sure you want to delete this gallery?")) {
      dispatch(thunkDeleteGallery(galleryId));
    }
  };

  const hasGalleries = Object.values(galleries).length > 0;

  return (
    <div className="current-user-galleries">
      <div className="galleries-header">
        <h2>My Journal Galleries</h2>
        <button onClick={() => navigate("/create-a-gallery")}>
          + Create a Gallery
        </button>
      </div>

      {!hasGalleries ? (
        <div className="no-galleries">
          <h3>You have no galleries at the moment!</h3>
          <p>Click the button above to create your first gallery.</p>
        </div>
      ) : (
        <div className="galleries-list">
          {Object.values(galleries).map(gallery => (
            <div key={gallery.id} className="gallery-card">
              <NavLink to={`/galleries/${gallery.id}`}>
                <div className="gallery-title">{gallery.title}</div>
                <div className="gallery-description">{gallery.description}</div>
              </NavLink>
              <div className="gallery-actions">
                <button onClick={() => navigate(`/galleries/${gallery.id}/edit`)}>
                  Edit
                </button>
                <button onClick={() => setModalContent(<ConfirmDeleteGalleryModal galleryId={gallery.id} />)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrentUserGalleries;


