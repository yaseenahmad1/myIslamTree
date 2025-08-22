import { csrfFetch } from "./csrf";
import { thunkGetUserGalleries } from "./galleries";
import { thunkGetAllJournals } from "./journals";

// -------------------------- ACTION TYPES --------------------------------------

const GET_SINGLE_USER = 'users/getSingleUser';

// -------------------------- ACTION CREATORS --------------------------------------

export const getSingleUser = (user) => ({ type: GET_SINGLE_USER, payload: user });


// -------------------------- THUNKS --------------------------------------

export const thunkGetSingleUser = (userId) => async (dispatch) => {

    try {
        const response = await csrfFetch(`/api/users/${userId}`);

        if (response.ok) {
        const data = await response.json();
        dispatch(getSingleUser(data));
        await dispatch(thunkGetUserGalleries(userId)); // adding what we need for their profileas 
        await dispatch(thunkGetAllJournals(userId)); // we want their journals too 
        return data;
        } else { 
            const error = await response.json(); 
            return { errors: [ error.error || "Unable to find user"]}
        }
    } catch (err) {
        console.error("Could not find user:", err); 
        return { errors: ["Could not find user"]};
}
  };

// -------------------------- REDUCERS --------------------------------------
const initialState = {
    singleUser: null,
  };

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
      case GET_SINGLE_USER:
        return { ...state, singleUser: action.payload };
      default:
        return state;
    }
}