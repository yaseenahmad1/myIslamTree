// redux/verse.js
import { csrfFetch } from "./csrf"; // or wherever your helper is

// action types
const SET_VERSE = "verse/SET_VERSE";
const CLEAR_VERSE = "verse/CLEAR_VERSE";

// action creators
export const setVerse = (verse) => ({ type: SET_VERSE, verse });
export const clearVerse = () => ({ type: CLEAR_VERSE });

// thunk
export const thunkFetchVerse = (surah, verse) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/verse?surah=${surah}&verse=${verse}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(setVerse(data));
      return data;
    }
  } catch (err) {
    console.error("Failed to fetch verse:", err);
    return null;
  }
};

// reducer
const initialState = { arabic_text: "", english_text: "", surah: null, verse: null };

export default function verseReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VERSE:
      return { ...state, ...action.verse };
    case CLEAR_VERSE:
      return initialState;
    default:
      return state;
  }
}
