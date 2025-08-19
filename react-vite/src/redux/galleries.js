import { csrfFetch } from "./csrf";

// -------------------------- ACTION TYPES --------------------------------------

const GET_GALLERY = 'galleries/getGallery'; 
const GET_CURRENT_USER_GALLERIES = 'galleries/getCurrentUserGalleries';
const GET_USER_GALLERIES = 'galleries/getUserGalleries';
const CREATE_GALLERY = 'galleries/createGallery';
const EDIT_GALLERY = 'galleries/editGallery'; 
const DELETE_GALLERY = 'galleries/deleteGallery'

// -------------------------- ACTION CREATORS --------------------------------------

const getGallery = (gallery) => ({ type: GET_GALLERY, payload: gallery }); 
const getCurrentUserGalleries = (galleries) => ({ type: GET_CURRENT_USER_GALLERIES, payload: galleries}); 
const getUserGalleries = (galleries) => ({ type: GET_USER_GALLERIES, payload: galleries });
const createGallery = (gallery) => ({ type: CREATE_GALLERY, payload: gallery }); // our payload is the gallery object 
const editGallery = (gallery) => ({ type: EDIT_GALLERY, payload: gallery }); 
const deleteGallery = (galleryId) => ({ type: DELETE_GALLERY, payload: galleryId }); 

// -------------------------- THUNKS --------------------------------------

export const thunkGetGallery = (galleryId) => async(dispatch) => { // we start our first thunk async dispatch function 

    try {  /// we initiate a try catch in our function as a promise 
        // so now this dispatch will go into our backend storage room and try to pull information
        const response = await csrfFetch(`/api/galleries/${galleryId}`); // we provide the api route 

        if (response.ok) { // if response is okay ...
            const data = await response.json(); // now that response is given back to us as a json object and we store it inside our data variable 
            dispatch(getGallery(data)) // then we dispatch our data by the action creator function which will retrieve that like a waiter bringing the food to the table 
            return data; // return so other parts of the app can use it immediately (good for the gold tree feature)
        } else { 
            // errors that come from the server 
            const error = await response.json(); 
            return { error: [ error.message || 'Not able to fetch gallery']}
        }
    } catch (err) {
        console.error("Failed to get gallery:", err); 
        return { error: ["Unable to get gallery"]}; 
    }
}; 

export const thunkGetCurrentUserGalleries = () => async(dispatch) => { 

    try { 
        const response = await csrfFetch(`/api/galleries`); 

        if (response.ok) { 
            const data = await response.json(); 
            dispatch(getCurrentUserGalleries(data)); 
            return data; 
        } else { 
            // errors that come from the server 
            const error = await response.json(); 
            return { error: [ error.message || 'Not able to fetch all galleries']}
        } 
    } catch (err) { 
        console.error("Failed to get gallery:", err); 
        return { error: ["Unable to get gallery"]};
    }
}; 

export const thunkGetUserGalleries = (userId) => async(dispatch) => { // we pass in our userId as that is critical information for our api endpoint fetch

    try { 
        // now we try to fulfill this promise
        const response = await csrfFetch(`/api/galleries/user/${userId}`); 

        if (response.ok) { 
            const data = await response.json(); 
            dispatch(getUserGalleries(data)); 
            return data;
        } else { 
            // errors that come from the server 
            const error = await response.json(); 
            return { error: [ error.error || error.message || 'Not able to fetch all galleries']}
        }
    }   catch (err) { 
        console.error("Failed to get galleries:", err); 
        return { error: ["Unable to get galleries"]};
    }
}

export const thunkCreateGallery = (gallery) => async(dispatch) => {

    try { 
        const response = await csrfFetch(`/api/galleries`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gallery)
        }); 

        if (response.ok) {
            const data = await response.json(); 
            dispatch(createGallery(data));
            return data; 
        } else {
            const error = await response.json(); 
            return { error: [ error.errors || "Unable to create gallery"]}
        }
    } catch (err) {
        console.error("Failed to create galleries:", err); 
        return { error: ["Unable to create gallery"]};
    }
}

export const thunkEditGallery = (gallery) => async(dispatch) => {

    try {
        const response = await csrfFetch(`/api/galleries/${gallery.id}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(gallery)
        }); 

        if (response.ok) {
            const data = await response.json(); 
            dispatch(editGallery(data)); 
            return data; 
        } else { 
            const error = await response.json(); 
            return { error: [ error.errors || error.error || "Edit unsuccessful"]}
        }
    } catch (err) {
        console.error("Failed to edit gallery:", err); 
        return { error: ["Unable to edit gallery"]};
    }
}

export const thunkDeleteGallery = (galleryId) => async(dispatch) => {

    try { 
        const response = await csrfFetch(`/api/galleries/${galleryId}`, {
            method: 'DELETE', 
            headers: { 'Content-Type': 'application/json' }, 
        }); 

        if (response.ok) {
            const data = await response.json(); 
            dispatch(deleteGallery(galleryId)); 
            return data; 
        } else { 
            const error = await response.json(); 
            return { error: [ error.error || "Deletion unsuccessful"]}
        }
    } catch (err) {
        console.error("Failed to delete gallery:", err); 
        return { error: ["Unable to delete gallery"]};
    }
}

// -------------------------- INITIAL STATE --------------------------------------

const initialState = {
    singleGallery: {}, // a single gallery to fetch its info on a page
    currentUserGalleries: {}, // all galleries of the current user 
    userGalleries: {}, // all galleries of a user  
}

// -------------------------- REDUCER ------------------------------------------

// our reducer acts as a factory worker receiving incoming instructions for our state
export default function galleriesReducer(state = initialState, action) {// starting with an empty initialState defaults empty warehouse

    const newState = { ...state }; // this now creates a copy of that current state two lines above  
    //     This is like making a photocopy of the warehouse inventory before making changes — 
    //     this way, we never touch the original inventory directly.
    //     In Redux, state must be immutable, meaning we don’t change the old state 
    //     directly; we always return a new version.

    switch (action.type) { // looks at the type of action coming in and decides which path to take 
        case GET_GALLERY: // action type holds the payload (i.e. info we need) as its value after the thunk runs the dispatch
            newState.singleGallery = { ...action.payload }; // now that empty singleGallery object has a gallery object inside it
            return newState; // once it is in that newState we return the newState

        case GET_CURRENT_USER_GALLERIES: // after thunk places the dispatched data into this key
            newState.currentUserGalleries = {}; // start the newState of the currentUserGalleries
            action.payload.forEach(gallery => { // for each action (which is GET) attach the payload to it so get the payload for each single gallery object in an array // action.payload holds this array
                newState.currentUserGalleries[gallery.id] = gallery; // newState.currentUserGalleries is an object we are building to store galleries by their ID
            });     // this is the key of the object ^  and this ^ is the value stored inside that key (aka the entire gallery object)
            return newState; // we return the newState which now holds the current user's galleries

        case GET_USER_GALLERIES: // we are presented with now getting all user galleries based on dispatch 
            newState.userGalleries = {}; // our new state takes in 
            action.payload.forEach(gallery => {
                newState.userGalleries[gallery.id] = gallery;
            });
            return newState;

        case CREATE_GALLERY: // the action coming in, so we run the code below 
            newState.currentUserGalleries[action.payload.id] = action.payload; // newState.currentUserGalleries is the part of our Redux state that keeps all galleries (action.payload is the new gallery object and the .id is the unique ID of that newly created gallery)
            return newState; // after the new post is added return all galleries of the user now 

        case EDIT_GALLERY:
            if (newState.singleGallery.id === action.payload.id) { // if the gallery currently being viewed is the one that was just edited 
                newState.singleGallery = action.payload; // replace the old gallery data with the updated one from the action.payload
            }
            if (newState.currentUserGalleries[action.payload.id]) { // if the edited gallery is an id of the current user 
                newState.currentUserGalleries[action.payload.id] = action.payload; // reflect change of edit on the GET method of galleries of a current user 
                newState.userGalleries[action.payload.id] = action.payload; // reflect it userGalleries when grabbing that userId as well
            }
            return newState; // return the newState in all departments essentially

        case DELETE_GALLERY: // listening for the action type DELETE_GALLERY that we dispatched with thunk 
            // action.payload here is the id of the gallery we want to delete so: 
            delete newState.currentUserGalleries[action.payload]; // remove it from here
            delete newState.userGalleries[action.payload]; // and this one 
            if (newState.singleGallery.id === action.payload) { // check if the currently viewed gallery is the one being deleted and if so 
                newState.singleGallery = {}; // it is cleared out by setting the singleGallery to an empty object 
            }
            return newState; // finally, the reducer returns the updated state

        default: // if the reducer gets an action it doesn't know about, does nothing
            return state; // and returns the state as it is 
    }
}