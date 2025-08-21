import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./CreateJournalForm.css";
import SurahVerseSelector from "../SurahVerseSelector/SurahVerseSelector";
import { thunkCreateJournal } from "../../redux/journals";
import { thunkFetchVerse, clearVerse } from "../../redux/verse";

export default function CreateJournalForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { galleryId } = useParams();

  const currentUser = useSelector((state) => state.session.user);
  const verseState = useSelector((state) => state.verse);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [surah, setSurah] = useState(null);
  const [verse, setVerse] = useState(null);
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    return () => dispatch(clearVerse());
  }, [dispatch]);

  if (!currentUser) return <p>Please log in to create a journal entry.</p>;

  const handleVerseChange = (newSurah, newVerse) => {
    setSurah(newSurah);
    setVerse(newVerse);
    if (newSurah && newVerse) {
      dispatch(thunkFetchVerse(newSurah, newVerse));
    } else {
      dispatch(clearVerse());
    }
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

    const newJournal = {
      title,
      image,
      surah,
      verse,
      arabic_text: verseState.arabic_text || "",
      english_text: verseState.english_text || "",
      description,
      is_private: isPrivate,
      gallery_id: galleryId,
    };

    try {
      const createdJournal = await dispatch(thunkCreateJournal(galleryId, newJournal));
      if (createdJournal && createdJournal.id) {
        navigate(`/galleries/${galleryId}`);
      } else if (createdJournal.errors) {
        setErrors(createdJournal.errors);
      }
    } catch (err) {
      console.error("Unexpected error creating journal:", err);
    }
  };

  return (
    <form className="create-journal-form" onSubmit={handleSubmit}>
      <h2>Create a Journal Entry</h2>

      {/* Title */}
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter journal title..."
        />
        {errors.title && <div className="error">{errors.title}</div>}
      </label>

      {/* Image URL */}
      <label>
        Image URL
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter image URL..."
        />
        {errors.image && <div className="error">{errors.image}</div>}
      </label>

      {/* Surah & Verse Selector */}
      <label>
        Surah & Verse
        <SurahVerseSelector
          surah={surah}
          verse={verse}
          onChange={handleVerseChange}
        />
        {errors.surahVerse && <div className="error">{errors.surahVerse}</div>}
      </label>

      {/* Verse Text Display */}
      {verseState.arabic_text && (
        <div className="verse-display-arabic">
          <p>{verseState.arabic_text}</p>
        </div>
      )}
      {verseState.english_text && (
        <div className="verse-display-english">
          <p>{verseState.english_text}</p>
        </div>
      )}

      {/* Description */}
      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your reflection..."
          rows={6}
          style={{ width: "100%", resize: "vertical" }}
        />
        {errors.description && <div className="error">{errors.description}</div>}
      </label>

      {/* Private toggle */}
      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
        Make this journal private
      </label>

      <button type="submit">Create Journal</button>
    </form>
  );
}
