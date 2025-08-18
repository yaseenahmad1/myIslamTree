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
            return { error: error.message || ['Not able to fetch gallery']}
        }
    } catch (err) {
        console.error("Failed to get gallery:", err); 
        return { error: "Unable to get gallery"}; 
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
            return { error: error.message || ['Not able to fetch all galleries']}
        } 
    } catch (err) { 
        console.error("Failed to get gallery:", err); 
        return { error: "Unable to get gallery"};
    }
}; 



