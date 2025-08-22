import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetGallery } from "../../redux/galleries";
import { thunkFetchVerse } from "../../redux/verse";
import { thunkGetAllJournals } from "../../redux/journals";
import GalleryJournals from "../Journals/GalleryJournals";
import TreeStatus from "../ProgressTree/ProgressTree";
import "./SingleUserGallery.css";

export default function SingleUserGallery() {
  const { galleryId } = useParams();
  const dispatch = useDispatch();

  const gallery = useSelector(state => state.galleries.singleGallery);
  const verse = useSelector(state => state.verse);
  const singleUser = useSelector(state => state.users.singleUser);

  // Load the gallery on mount
  useEffect(() => {
    dispatch(thunkGetGallery(galleryId));
  }, [dispatch, galleryId]);

  useEffect(() => {
    if (gallery?.id) {
      dispatch(thunkGetAllJournals(gallery.id));
    }
  }, [dispatch, gallery?.id]);

  // Fetch verse text after gallery is loaded
  useEffect(() => {
    if (gallery?.surah && gallery?.verse) {
      dispatch(thunkFetchVerse(gallery.surah, gallery.verse));
    }
  }, [dispatch, gallery.surah, gallery.verse]);

  if (!gallery?.id) return <p>Loading gallery...</p>;

  return (
    <div className="single-user-gallery-page">
      {/* Header with user info */}
      {singleUser && (
        <div className="gallery-user-header">
          <h2>{singleUser.username}'s Gallery</h2>
          <TreeStatus totalProgress={singleUser.total_progress} size="medium" />
        </div>
      )}

      {/* Gallery Title & Image */}
      <h3>{gallery.title}</h3>
      {gallery.image && <img src={gallery.image} alt={gallery.title} className="gallery-image" />}

      {/* Verse */}
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

      {/* Gallery Description */}
      {gallery.description && (
        <div className="gallery-description">
          {gallery.description}
        </div>
      )}

      {/* Journals for this gallery */}
      <GalleryJournals />

      {/* Optional: You could add additional buttons if current user is owner */}
    </div>
  );
}
