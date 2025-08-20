import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./CreateGalleryForm.css";
import SurahVerseSelector from "../SurahVerseSelector/SurahVerseSelector";
import { thunkCreateGallery } from "../../redux/galleries";
import { thunkFetchVerse, clearVerse } from "../../redux/verse";

export default function CreateGalleryForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const verseState = useSelector((state) => state.verse);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [surah, setSurah] = useState("");
  const [verse, setVerse] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  // Clear verse when component unmounts
  useEffect(() => {
    return () => dispatch(clearVerse());
  }, [dispatch]);

  if (!currentUser) return <p>Please log in to create a gallery.</p>;

  const handleVerseChange = async (newSurah, newVerse) => {
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newGallery = {
      title,
      image,
      surah: surah || null,
      verse: verse || null,
      arabic_text: verseState.arabic_text || null,
      english_text: verseState.english_text || null,
      description,
    };

    try {
      const createdGallery = dispatch(thunkCreateGallery(newGallery));

      if (createdGallery && createdGallery.id) {
        navigate(`/galleries/${createdGallery.id}`);
      } else if (createdGallery.errors) {
        setErrors(createdGallery.errors);
      }
    } catch (err) {
      console.error("Unexpected error creating gallery:", err);
    }
  };

  return (
    <form className="create-gallery-form" onSubmit={handleSubmit}>
      <h2>Create a New Gallery</h2>

      <label htmlFor="title">
        Title
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter gallery title..."
        />
        {errors.title && <div className="error">{errors.title}</div>}
      </label>

      <label htmlFor="image">
        Image URL
        <input
          id="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter image URL..."
        />
        {errors.image && <div className="error">{errors.image}</div>}
      </label>

      <label>
        Surah & Verse
        <SurahVerseSelector
          surah={surah}
          verse={verse}
          onChange={handleVerseChange}
        />
      </label>

      {verseState.arabic_text && verseState.english_text && (
        <div className="verse-preview">
          <p><strong>Arabic:</strong> {verseState.arabic_text}</p>
          <p><strong>English:</strong> {verseState.english_text}</p>
        </div>
      )}

      <label htmlFor="description">
        Description
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter gallery description..."
          rows={5}
        />
        {errors.description && <div className="error">{errors.description}</div>}
      </label>

      <button type="submit">Create Gallery</button>
    </form>
  );
}
