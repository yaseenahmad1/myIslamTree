import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFollowers,
  fetchFollowing,
} from "../../redux/follows";
import "./FollowsPage.css";

function FollowsPage({ userId }) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("followers");

  // Fetch followers and following when component mounts or userId changes
  useEffect(() => {
    if (userId) {
      dispatch(fetchFollowers(userId));
      dispatch(fetchFollowing(userId));
    }
  }, [dispatch, userId]);

  // Directly use Redux state arrays
  const followers = useSelector((state) => state.follows.followers);
  const following = useSelector((state) => state.follows.following);

  const displayedUsers = activeTab === "followers" ? followers : following;

  return (
    <div className="follows-container">
      <div className="tabs">
        <button
          className={activeTab === "followers" ? "active" : ""}
          onClick={() => setActiveTab("followers")}
        >
          Followers ({followers.length})
        </button>
        <button
          className={activeTab === "following" ? "active" : ""}
          onClick={() => setActiveTab("following")}
        >
          Following ({following.length})
        </button>
      </div>

      <div className="users-list">
        {displayedUsers.length === 0 ? (
          <p>No {activeTab} yet.</p>
        ) : (
          displayedUsers.map((user) => (
            <div key={user.id} className="user-item">
              <span>@{user.username}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FollowsPage;






