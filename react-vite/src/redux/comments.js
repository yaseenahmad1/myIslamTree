import { csrfFetch } from "./csrf";

// -------------------------- ACTION TYPES --------------------------------------

const LOAD_COMMENTS = 'comments/loadComments'; 
const ADD_COMMENT = 'comments/addComment'; 
const UPDATE_COMMENT = 'comments/updateComment'; 
const DELETE_COMMENT = 'comments/deleteComment';

// -------------------------- ACTION CREATORS --------------------------------------

const loadComments = (comments) => ({ type: LOAD_COMMENTS, payload: comments });
const addComment = (comment) => ({ type: ADD_COMMENT, payload: comment }); 
const updateComment = (comment) => ({ type: UPDATE_COMMENT, payload: comment }); 
const deleteComment = (commentId) => ({ type: DELETE_COMMENT, payload: commentId }); 


// -------------------------- THUNKS --------------------------------------

// GET all comments for a gallery
export const getCommentsByGalleryId = (galleryId) => async (dispatch) => {

    try { 
    const res = await csrfFetch(`/api/galleries/${galleryId}/comments`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadComments(data.comments));
    }
} catch (err) {
    console.error("Failed to load comments:", err)
}
}; 

// CREATE a new comment 
export const createComment = (galleryId, payload) => async (dispatch) => {
    try {
    const res = await csrfFetch(`/api/galleries/${galleryId}/comments`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }); 
    if (res.ok) {
        const data = await res.json(); 
        dispatch(addComment(data)); 
    }
} catch (err) {
    console.error("Failed to create comment:", err); 
}
}; 

// EDIT an existing comment 
export const editComment = (commentId, payload) => async (dispatch) => {
    try {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), 
    }); 
    if (res.ok) {
        const data = await res.json(); 
        dispatch(updateComment(data)); 
    }
} catch (err) {
    console.error("Failed to edit comment:", err); 
}
}; 

// DELETE a comment
export const removeComment = (commentId) => async (dispatch) => {
    try{
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE', 
    }); 
    if (res.ok) {
        dispatch(deleteComment(commentId)); 
    }
} catch (err) {
    console.error("Failed to delete comment:", err); 
}
}; 


// -------------------------- REDUCER ------------------------------------------

const initialState = {}; // Setting up our default state for our comments slice

// next we create reducer function that will accept the state (currently defaulted as {} and an action (an object with type and payload)
export default function commentsReducer(state = initialState, action) {
    // use the spread operator to create a shallow copy of the current Redux state
    const newState = { ...state }; 
    // switch (action.type) will check the type of action being dispatched
    switch (action.type) {
        // if the action type is load_comments 
        case LOAD_COMMENTS:
            const all = {}; // we create an empty object 
            action.payload.forEach((comment) => {all[comment.id] = comment}) // storing them in a new object with id number as key 
            return all; // then return that object easier for retrieval 
            case ADD_COMMENT: // add a new id 
            case UPDATE_COMMENT: // replace an existing id 
                newState[action.payload.id] = action.payload; // both add comment and update comment do the same thing 
                return newState; 
            case DELETE_COMMENT:
                delete newState[action.payload]; 
                return newState;
            default: 
            return state;
    }
}