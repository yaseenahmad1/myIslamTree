import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetGallery } from "../../redux/galleries";
import { thunkFetchVerse } from "../../redux/verse";
import { FaPlusCircle } from "react-icons/fa";
import GalleryJournals from "../Journals/GalleryJournals";

export default function SingleGallery() {
  const { galleryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const gallery = useSelector(state => state.galleries.singleGallery);
  const verse = useSelector(state => state.verse); // Redux state for verse text
  const currentUser = useSelector(state => state.session.user); 

  // Load the gallery
  useEffect(() => {
    dispatch(thunkGetGallery(galleryId));
  }, [dispatch, galleryId]);

  // Fetch verse text after gallery is loaded
  useEffect(() => {
    if (gallery.surah && gallery.verse) {
      dispatch(thunkFetchVerse(gallery.surah, gallery.verse));
    }
  }, [dispatch, gallery.surah, gallery.verse]);

  if (!gallery.id) return <p>Loading gallery...</p>;

  return (
    <div className="single-gallery-page">
      <h2>{gallery.title}</h2>
      <img src={gallery.image} alt={gallery.title} />

      {gallery.surah && gallery.verse && (
        <div className="gallery-verse">
          <p>Surah {gallery.surah}, Verse {gallery.verse}</p>
          {verse.arabic_text || verse.english_text ? (
            <>
              <p className="arabic-text">{verse.arabic_text}</p>
              <p className="english-text">{verse.english_text}</p>
            </>
          ) : (
            <p>Loading verse text...</p>
          )}
        </div>
      )}

      {gallery.description && (
        <div className="gallery-description">
          {gallery.description}
        </div>
      )}

      {/* Journals will be right under the description and above the add button */}
      <GalleryJournals />

      {/* Add journal button but only if the current user owns the gallery so the aesthetic is clean for outside viewers */}
      {currentUser && gallery.user_id === currentUser.id && (
        <button
          className="add-journal-btn"
          title="Add a Journal"
          onClick={() => navigate(`/galleries/${galleryId}/journals/new`)}
        >
          <FaPlusCircle size={28} />
        </button>
      )}
      </div>
  );
}


