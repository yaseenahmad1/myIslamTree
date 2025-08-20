import { csrfFetch } from "./csrf";

// -------------------------- ACTION TYPES --------------------------------------
const LOAD_LIKES = "likes/loadLikes";
const ADD_LIKE = "likes/addLike";
const DELETE_LIKE = "likes/deleteLike";

// -------------------------- ACTION CREATORS --------------------------------------
const loadLikes = (likes) => ({ type: LOAD_LIKES, payload: likes });
const addLike = (like) => ({ type: ADD_LIKE, payload: like }); 
const deleteLike = (likeId) => ({ type: DELETE_LIKE, payload: likeId }); 

// -------------------------- THUNKS --------------------------------------

// Fetch all likes for a gallery
export const fetchLikes = (galleryId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/galleries/${galleryId}/likes`);
        if (res.ok) {
            const data = await res.json();
            dispatch(loadLikes(data.likes));
        }
    } catch (err) {
        console.error("Failed to fetch likes:", err);
    }
};

// POST a like for a gallery
export const postLike = (galleryId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/galleries/${galleryId}/likes`, {
            method: "POST",
        });
        if (res.ok) {
            const data = await res.json();
            // Add like only if backend returned like_id (new like)
            if (data.liked) {
                dispatch(addLike({
                    id: data.like_id,
                    gallery_id: galleryId,
                    user: data.user
                }));
            }
        }
    } catch (err) {
        console.error("Failed to post like:", err);
    }
};

// DELETE a like for a gallery
export const removeLike = (galleryId) => async (dispatch, getState) => {
    try {
        const res = await csrfFetch(`/api/galleries/${galleryId}/likes`, {
            method: "DELETE",
        });
        if (res.ok) {
            // Find the like in state by galleryId and current user
            const state = getState();
            const likeToRemove = Object.values(state.likes).find(
                like => like.gallery_id === galleryId && like.user.id === state.session.user.id
            );
            if (likeToRemove) dispatch(deleteLike(likeToRemove.id));
        }
    } catch (err) {
        console.error("Failed to remove like:", err);
    }
};

// -------------------------- REDUCER ------------------------------------------
const initialState = {};

export default function likesReducer(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_LIKES:
            const all = {};
            action.payload.forEach(like => { all[like.id] = like });
            return all;
        case ADD_LIKE:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_LIKE:
            if (action.payload) delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}

// -------------------------- SELECTORS --------------------------------------

export const getLikesByGalleryId = (state, galleryId) =>
  Object.values(state.likes).filter(like => like.gallery_id === galleryId); // filtering through to return like objects from a gallery

export const getUsernamesByGalleryId = (state, galleryId) =>
  getLikesByGalleryId(state, galleryId).map(like => like.user.username); // then mapping over those likes with map to extract the usernames



