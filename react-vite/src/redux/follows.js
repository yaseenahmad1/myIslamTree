import { csrfFetch } from "./csrf";

// -------------------------- ACTION TYPES --------------------------------------
const LOAD_FOLLOWS = "follows/loadFollows";
const ADD_FOLLOW = "follows/addFollow";
const DELETE_FOLLOW = "follows/deleteFollow";

// -------------------------- ACTION CREATORS --------------------------------------
const loadFollows = (follows) => ({ type: LOAD_FOLLOWS, payload: follows });
const addFollow = (follow) => ({ type: ADD_FOLLOW, payload: follow });
const deleteFollow = (followId) => ({ type: DELETE_FOLLOW, payload: followId });

// -------------------------- THUNKS --------------------------------------

// GET: list of users current user is following
export const fetchFollowing = (userId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/users/${userId}/following`);
    if (res.ok) {
      const data = await res.json();
      // data is an array of {id, username} for users being followed
      // Transform it into follow objects: {id, follower_id, following_id, username}
      const follows = data.map(u => ({
        id: u.id,               // Using user's id as a temporary unique key
        follower_id: userId,     // current user is following
        following_id: u.id,
        username: u.username
      }));
      dispatch(loadFollows(follows));
    }
  } catch (err) {
    console.error("Failed to fetch following:", err);
  }
};

// POST: follow a user
export const followUser = (userId) => async (dispatch, getState) => {
  try {
    const res = await csrfFetch(`/api/users/${userId}/follow`, { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      dispatch(addFollow({
        id: data.id,                 // follow record ID from backend
        follower_id: data.follower_id,
        following_id: data.following_id
      }));
    }
  } catch (err) {
    console.error("Failed to follow user:", err);
  }
};

// DELETE: unfollow a user
export const unfollowUser = (userId) => async (dispatch, getState) => {
  try {
    const res = await csrfFetch(`/api/users/${userId}/unfollow`, { method: "DELETE" });
    if (res.ok) {
      const state = getState();
      const followToRemove = Object.values(state.follows).find(
        f => f.follower_id === state.session.user.id && f.following_id === userId
      );
      if (followToRemove) dispatch(deleteFollow(followToRemove.id));
    }
  } catch (err) {
    console.error("Failed to unfollow user:", err);
  }
};

// -------------------------- REDUCER ------------------------------------------
const initialState = {};

export default function followsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_FOLLOWS:
      const all = {};
      action.payload.forEach(f => { all[f.id] = f });
      return all;
    case ADD_FOLLOW:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_FOLLOW:
      if (action.payload) delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}

// -------------------------- SELECTORS --------------------------------------

// All users the current user is following
export const getFollowingByUserId = (state, userId) =>
    Object.values(state.follows).filter(f => f.follower_id === userId);

// Usernames of users the current user is following
export const getFollowingUsernames = (state, userId) =>
    getFollowingByUserId(state, userId).map(f => f.username);

// All users who follow the current user
export const getFollowersByUserId = (state, userId) =>
    Object.values(state.follows).filter(f => f.following_id === userId);

// Usernames of users who follow the current user
export const getFollowerUsernames = (state, userId) =>
    getFollowersByUserId(state, userId).map(f => f.username);

  
