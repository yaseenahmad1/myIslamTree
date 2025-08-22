import { csrfFetch } from "./csrf";

// -------------------------- ACTION TYPES --------------------------------------
const LOAD_FOLLOWERS = "follows/loadFollowers";
const LOAD_FOLLOWING = "follows/loadFollowing";
const ADD_FOLLOW = "follows/addFollow";
const DELETE_FOLLOW = "follows/deleteFollow";

// -------------------------- ACTION CREATORS ----------------------------------
const loadFollowers = (followers) => ({ type: LOAD_FOLLOWERS, payload: followers });
const loadFollowing = (following) => ({ type: LOAD_FOLLOWING, payload: following });
const addFollow = (follow) => ({ type: ADD_FOLLOW, payload: follow });
const deleteFollow = (followId) => ({ type: DELETE_FOLLOW, payload: followId });

// -------------------------- THUNKS ------------------------------------------

// GET followers
export const fetchFollowers = (userId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/users/${userId}/followers`);
    if (res.ok) {
      const data = await res.json();
      dispatch(loadFollowers(data));
    }
  } catch (err) {
    console.error("Failed to fetch followers:", err);
  }
};

// GET following
export const fetchFollowing = (userId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/users/${userId}/following`);
    if (res.ok) {
      const data = await res.json();
      dispatch(loadFollowing(data));
    }
  } catch (err) {
    console.error("Failed to fetch following:", err);
  }
};

// POST: follow a user
export const followUser = (userId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/users/${userId}/follow`, { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      dispatch(addFollow(data));
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
      const followToRemove = state.follows.following.find(f => f.id === userId);
      if (followToRemove) dispatch(deleteFollow(followToRemove.id));
    }
  } catch (err) {
    console.error("Failed to unfollow user:", err);
  }
};

// -------------------------- REDUCER ------------------------------------------
const initialState = {
  followers: [],
  following: []
};

export default function followsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FOLLOWERS:
      return { ...state, followers: action.payload };
    case LOAD_FOLLOWING:
      return { ...state, following: action.payload };
    case ADD_FOLLOW:
      return { ...state, following: [...state.following, action.payload] };
    case DELETE_FOLLOW:
      return {
        ...state,
        following: state.following.filter(f => f.id !== action.payload)
      };
    default:
      return state;
  }
}

// -------------------------- SELECTORS --------------------------------------
export const getFollowers = (state) => state.follows.followers;
export const getFollowing = (state) => state.follows.following;

  





  
