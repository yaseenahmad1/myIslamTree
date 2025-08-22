import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { thunkGetSingleUser, getSingleUser } from "../../redux/users"; // need to import the action creator to clear our state if we visit another one
import { thunkGetUserGalleries } from "../../redux/galleries";
import { thunkGetAllJournals } from "../../redux/journals";
import "./UserProfile.css";
import TreeStatus from "../ProgressTree/ProgressTree";

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const singleUser = useSelector(state => state.users.singleUser);
  const galleries = useSelector(state => state.galleries.userGalleries);
  const journals = useSelector(state => state.journals.userJournals);

  // Fetch user + 
  useEffect(() => {
    dispatch(thunkGetSingleUser(userId));
    dispatch(thunkGetUserGalleries(userId));

    return () => {
      dispatch(getSingleUser(null)); // reset state on unmount
    };
  }, [dispatch, userId]);

  const hasGalleries = galleries && Object.values(galleries).length > 0;

  return (
    <div className="user-profile-page">
      {singleUser ? (
        <>
          {/* Header with username and progress tree */}
          <div className="profile-header">
            <h2>{singleUser.username}'s Profile</h2>
            <TreeStatus totalProgress={singleUser.total_progress} size="big" />
          </div>

          {/* Galleries Section */}
          <div className="user-galleries-section">
            <h3>Journal Galleries</h3>
            {!hasGalleries ? (
              <p>This user has no galleries yet.</p>
            ) : (
              <div className="galleries-list">
                {Object.values(galleries).map(gallery => (
                  <div key={gallery.id} className="gallery-card">
                    <NavLink to={`/galleries/${gallery.id}`}>
                      <div className="gallery-title">{gallery.title}</div>
                      <div className="gallery-description">{gallery.description}</div>
                    </NavLink>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Journals Section */}
          <div className="user-journals-section">
            <h3>Journals</h3>
            {journals && journals.length > 0 ? (
              <div className="journals-list">
                {journals.map(journal => (
                  <div key={journal.id} className="journal-card">
                    <NavLink to={`/journals/${journal.id}`}>
                      <div className="journal-title">{journal.title}</div>
                      <div className="journal-description">{journal.description}</div>
                    </NavLink>
                  </div>
                ))}
              </div>
            ) : (
              <p>This user has no journals yet.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

