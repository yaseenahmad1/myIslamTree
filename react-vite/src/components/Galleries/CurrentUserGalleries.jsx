import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCurrentUserGalleries } from "../../redux/galleries";
import { NavLink, useNavigate } from "react-router-dom";
import "./CurrentUserGalleries.css";

function CurrentUserGalleries() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const galleries = useSelector(state => state.galleries.currentUserGalleries);

  useEffect(() => {
    dispatch(thunkGetCurrentUserGalleries());
  }, [dispatch]);

  const hasGalleries = Object.values(galleries).length > 0;

  return (
    <div className="current-user-galleries">
      <h2>My Journal Galleries</h2>

      {!hasGalleries ? (
        <div className="no-galleries">
          <h3>You have no galleries at the moment!</h3>
          <p>Click below to create your very first gallery.</p>
          <NavLink to="/create-a-gallery">
          <button>Create a Gallery</button>
          </NavLink>
        </div>
      ) : (
        <div className="galleries-list">
          {Object.values(galleries).map(gallery => (
            <NavLink
              key={gallery.id}
              to={`/galleries/${gallery.id}`}
              className="gallery-card"
            >
              <div className="gallery-title">{gallery.title}</div>
              <div className="gallery-description">{gallery.description}</div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrentUserGalleries;

