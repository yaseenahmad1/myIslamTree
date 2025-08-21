import { csrfFetch } from "./csrf";
import { getCurrentUser } from "./session";

// -------------------------- ACTION TYPES --------------------------------------

const GET_JOURNAL = 'journals/getJournal'; 
const GET_JOURNALS = 'journals/getAllJournals';
const GET_PRIVATE_JOURNALS = 'journals/getPrivateJournals'
const CREATE_JOURNAL = 'journals/createJournal';
const EDIT_JOURNAL = 'journals/editJournal'; 
const EDIT_PRIVACY = 'journals/editPrivacy';
const DELETE_JOURNAL = 'journals/deleteJournal'

// -------------------------- ACTION CREATORS -----------------------------------

const getJournal = (journal) => ({ type: GET_JOURNAL, payload: journal }); 
const getAllJournals = (journals) => ({ type: GET_JOURNALS, payload: journals }); 
const getPrivateJournals = (journals) => ({ type: GET_PRIVATE_JOURNALS, payload: journals });
const createJournal = (journal) => ({ type: CREATE_JOURNAL, payload: journal });  
const editJournal = (journal) => ({ type: EDIT_JOURNAL, payload: journal }); 
const editPrivacy = (journal) => ({ type: EDIT_PRIVACY, payload: journal });
const deleteJournal = (journalId) => ({ type: DELETE_JOURNAL, payload: journalId }); 

// -------------------------- THUNKS --------------------------------------------

export const thunkGetJournal = (journalId) => async(dispatch) => {

    try { 
        const response = await csrfFetch(`/api/journals/${journalId}`); 

        if (response.ok) {
            const data = await response.json(); 
            dispatch(getJournal(data)); 
            return data; 
        } else { 
            const error = await response.json(); 
            return { errors: [ error.error || 'Not able to fetch journal']}
        }
    } catch (err) { 
        console.error("Failed to get journal:", err); 
        return { errors: ["Unable to get journal"]}; 
    }
}

export const thunkGetAllJournals = (galleryId) => async(dispatch) => { // we need the galleryId to grab all journals related to it so that is what we pass in

    try { 
        const response = await csrfFetch(`/api/galleries/${galleryId}/journals`); 

        if (response.ok) {
            const data = await response.json();
            dispatch(getAllJournals(data)); 
            return data; 
        } else {
            const error = await response.json(); 
            return { error: [error.error || 'This gallery does not exist'] }
        }
    } catch (err) {
        console.error("Failed to find gallery:", err); 
        return { error: ["Unable to find gallery"]}; 
    }
}

export const thunkGetPrivateJournals = () => async(dispatch) => {

    try {
        const response = await csrfFetch(`/api/journals/private`); 

        if (response.ok) {
            const data = await response.json();
            dispatch(getPrivateJournals(data)); 
            return data; 
        }
    } catch (err) {
        console.error("No private journals:", err);
        return { error: ["You have no private journals at this time"]}
    }
}

export const thunkCreateJournal = (galleryId, journal) => async(dispatch) => {

    try {
        const response = await csrfFetch(`/api/galleries/${galleryId}/journal`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(journal)
        }); 

        if (response.ok) {
            const data = await response.json();
            dispatch(createJournal(data));
            dispatch(getCurrentUser());
            return data; 
        } else {
            const error = await response.json(); 
            return { errors: [ error.errors || 'Unable to create journal']}
        }
    } catch (err) {
        console.error("Failed to created journal:", err);
        return { errors: ["Unable to create journal"]};
    }
}

export const thunkEditJournal = (journal) => async(dispatch) => {

    try {
        const response = await csrfFetch(`/api/journals/${journal.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(journal)
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(editJournal(data));
            return data;
        } else {
            const error = await response.json();
            return { errors: [ error.errors || "Unable to edit journal"]};
        }
    } catch (err) {
        console.error("Failed to edit journal:", err);
        return { errors: ["Unable to edit journal"]};
    }
}

export const thunkEditPrivacy = (journal) => async(dispatch) => {

    try {
        const response = await csrfFetch(`/api/journals/${journal.id}`, {
            method: 'PATCH', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(journal)
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(editPrivacy(data));
            return data;
        } else {
            const error = await response.json();
            return { errors: [error.errors || "Privacy toggle did not function as expected"]};
        }
    } catch (err) {
        console.error("Unsuccessful:", err);
        return { errors: ["Unsuccessful"]}
    }
}

export const thunkDeleteJournal = (journalId) => async(dispatch) => {

    try {
        const response = await csrfFetch(`/api/journals/${journalId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }, 
        }); 

        if (response.ok) {
            const data = await response.json(); 
            dispatch(deleteJournal(journalId)); 
            dispatch(getCurrentUser());
            return data; 
        } else { 
            const error = await response.json(); 
            return { errors: [ error.error || "Deletion unsuccessful"]}
        }
    } catch (err) {
        console.error("Failed to delete journal:", err); 
        return { errors: ["Unable to delete journal"]};
    }
}

// -------------------------- INITIAL STATE --------------------------------------------

const initialState = { // have initial state take in all these inner states
    allJournals: [], // all journals for the gallery or user 
    privateJournals: [], // private journals
    singleJournal: null // the journal the user is viewing or editing currently
}

// -------------------------- REDUCERS --------------------------------------------

export default function journalsReducer(state = initialState, action) {
    const newState = { ...state }; // make a copy of current state 

    switch (action.type) {

        case GET_JOURNAL:
            newState.singleJournal = { ...action.payload } // spreading out all the info in our new slice of state that occured in our thunk
            return newState;
        
        case GET_JOURNALS:
            newState.allJournals = [ ...action.payload.journals ]; // in our new state we insert an array of all journal objects from our dispatch
            return newState; 

        case GET_PRIVATE_JOURNALS:
            newState.privateJournals = [ ...action.payload.private_journals]; // chain our private_journal entries that we return in our backend to our payload 
            return newState; 

        case CREATE_JOURNAL:
            newState.allJournals = [ ...newState.allJournals, action.payload]; // allJournals is the array of all journals the user can see (public and private) and action.payload is the new journal object returned from the backend when it has been ceeated 
            newState.privateJournals = action.payload.is_private // check to see if private button was clicked if the payload object is private
                ? [...newState.privateJournals, action.payload] // push it into our privateJournals array with the updated action.payload
                : [...newState.privateJournals]; // if not private then leave the privateJournals array unchanged 
            return newState;  // and then return newState so the private journals can be stored in private journals array as well as all journals for authorized user who can see both 

        case EDIT_JOURNAL:
            if (newState.currentJournal && newState.currentJournal.id === action.payload.id) { // if the journal selected is the one being edited
                newState.currentJournal = action.payload; // replace the old journal with the updated one and reflect those changes in every array
            }

            // update allJournals array
            newState.allJournals = newState.allJournals.map(journal => // after edit, .map over each journal 
                journal.id === action.payload.id ? action.payload : journal // if the journal id equals the payload (aka the edited journal id) then replace that with the action.payload otherwise leave it as is
            );

            // update privateJournals array if necessary
            if (action.payload.is_private) { // if the edit was turned private 
                
            // Then we remove the old version of this journal (if it exists) to avoid duplicates
            const updatedPrivate = newState.privateJournals.filter(
                journal => journal.id !== action.payload.id
            ); // this is looking for the journal id in question so the filter ignores all ids that do not equal our payload.id

            // Then add the updated journal to the array
            newState.privateJournals = [...updatedPrivate, action.payload]; // now we take that id tht did match and replacing the old one with the new one

            } else {
            // If the journal is no longer private:
            // Remove it from the privateJournals array...
            newState.privateJournals = newState.privateJournals.filter(
                journal => journal.id !== action.payload.id // by keeping only journals that do not match the updated journal 
            );
            }   
            return newState; 

        case DELETE_JOURNAL:
            // If the currently viewed journal is the one being deleted, clear it
            if (newState.currentJournal && newState.currentJournal.id === action.payload) {
                newState.currentJournal = null; // or {} if you prefer
            }

            // Remove the deleted journal from allJournals array
            newState.allJournals = newState.allJournals.filter(
                journal => journal.id !== action.payload // by keeping all the ones that were not the action.payload id 
            );

            // Remove it from privateJournals array if it exists there
            newState.privateJournals = newState.privateJournals.filter(
                journal => journal.id !== action.payload // same for this 
            );
            return newState;
        
        default:
            return state; 
    }

}