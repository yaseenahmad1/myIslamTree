import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./EditJournalForm.css"; // reuse same CSS
import SurahVerseSelector from "../SurahVerseSelector/SurahVerseSelector";
import { thunkEditJournal, thunkGetJournal } from "../../redux/journals";
import { thunkFetchVerse, clearVerse } from "../../redux/verse";

export default function EditJournalForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { journalId } = useParams();

  const journal = useSelector(state => state.journals.singleJournal); 
  const verseState = useSelector(state => state.verse);

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [surah, setSurah] = useState(null);
  const [verse, setVerse] = useState(null);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setLoading(true);
    dispatch(thunkGetJournal(journalId))
      .then(res => {
        if (res && res.surah && res.verse) {
          dispatch(thunkFetchVerse(res.surah, res.verse));
        }
      })
      .finally(() => setLoading(false));

    return () => dispatch(clearVerse());
  }, [dispatch, journalId]);

  useEffect(() => {
    if (journal?.id) {
      setTitle(journal.title || "");
      setImage(journal.image || "");
      setSurah(journal.surah || null);
      setVerse(journal.verse || null);
      setDescription(journal.description || "");
    }
  }, [journal]);

  const handleVerseChange = (newSurah, newVerse) => {
    setSurah(newSurah);
    setVerse(newVerse);
    if (newSurah && newVerse) dispatch(thunkFetchVerse(newSurah, newVerse));
    else dispatch(clearVerse());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!image.trim()) newErrors.image = "Image URL is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!surah || !verse) newErrors.surahVerse = "Please select a verse";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const updatedJournal = {
      id: journalId,
      title,
      image,
      surah,
      verse,
      arabic_text: verseState.arabic_text || null,
      english_text: verseState.english_text || null,
      description,
    };

    const res = await dispatch(thunkEditJournal(updatedJournal));
    if (res.error) setErrors({ submit: res.error });
    else navigate(`/journals/${journalId}`);
  };

  if (loading) return <p>Loading journal...</p>;

  return (
    <form className="create-gallery-form" onSubmit={handleSubmit}>
      <h2>Edit Journal</h2>

      {errors.submit && (
        <ul className="errors">
          {errors.submit.map((err, idx) => <li key={idx}>{err}</li>)}
        </ul>
      )}

      <label>
        Title
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter journal title..." />
        {errors.title && <div className="error">{errors.title}</div>}
      </label>

      <label>
        Image URL
        <input value={image} onChange={e => setImage(e.target.value)} placeholder="Enter image URL..." />
        {errors.image && <div className="error">{errors.image}</div>}
      </label>

      <label>
        Surah & Verse
        <SurahVerseSelector surah={surah} verse={verse} onChange={handleVerseChange} />
        {errors.surahVerse && <div className="error">{errors.surahVerse}</div>}
      </label>

      {(verseState.arabic_text || verseState.english_text) && (
        <div className="verse-preview">
          <p className="arabic">{verseState.arabic_text}</p>
          <p className="english">{verseState.english_text}</p>
        </div>
      )}

      <label>
        Description
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter journal description..." rows={6} />
        {errors.description && <div className="error">{errors.description}</div>}
      </label>

      <button type="submit">Save Changes</button>
    </form>
  );
}
