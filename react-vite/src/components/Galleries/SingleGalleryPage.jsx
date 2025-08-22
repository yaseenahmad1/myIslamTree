import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetGallery } from "../../redux/galleries";
import { thunkFetchVerse } from "../../redux/verse";
import { FaPlusCircle } from "react-icons/fa";
import GalleryJournals from "../Journals/GalleryJournals";
import Comments from "../../components/Comments/Comments";
import LikeButton from "../../components/LikeButton/LikeButton";
import "./SingleGalleryPage.css"; // <-- make sure this path matches your file

export default function SingleGallery() {
  const { galleryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gallery = useSelector((state) => state.galleries.singleGallery || {});
  const verse = useSelector((state) => state.verse || {}); // { arabic_text, english_text }
  const currentUser = useSelector((state) => state.session.user);

  // Start with Arabic shown; switch to English on hover and keep it there.
  const [showEnglish, setShowEnglish] = useState(false);

  // Load the gallery
  useEffect(() => {
    dispatch(thunkGetGallery(galleryId));
  }, [dispatch, galleryId]);

  // Fetch verse text after gallery is loaded
  useEffect(() => {
    if (gallery?.surah && gallery?.verse) {
      dispatch(thunkFetchVerse(gallery.surah, gallery.verse));
    }
  }, [dispatch, gallery?.surah, gallery?.verse]);

  if (!gallery?.id) return <p className="loading">Loading gallery...</p>;

  return (
    <>
      {/* Title */}

        <h1 className="gallery-title">{gallery.title}</h1>
     
  
      {/* Full-width image */}
      <section className="gallery-image-section">
        <img src={gallery.image} alt={gallery.title} />
      </section>
  
      {/* Centered content below */}
      <div className="single-gallery-page">
        {/* Verse Block */}
        {gallery.surah && gallery.verse && (
          <section className="verse-section">
            <div
              className="verse-card"
              onMouseEnter={() => setShowEnglish(true)}
              onMouseLeave={() => setShowEnglish(false)}
            >
              <div className="verse-block">
              <div className="verse-text-wrapper">
                <p className={`arabic-text ${showEnglish ? "hidden" : "visible"}`}>
                  {verse.arabic_text || "..."}
                </p>
                <p className={`english-text ${showEnglish ? "visible" : "hidden"}`}>
                  {verse.english_text || "..."}
                </p>
              </div>
              </div>

  
              <div className="verse-ref">
                {gallery.surah} : {gallery.verse}
              </div>
            </div>
  
            {/* Description */}
            {gallery.description && (
              <div className="gallery-description">{gallery.description}</div>
            )}
          </section>
        )}
  
        {/* Divider */}
        <div className="divider" />
  
        {/* Journals */}
        <section className="journals-section">
          <GalleryJournals />
        </section>
  
        {/* Add Journal Button (owner only) */}
        {currentUser && gallery.user_id === currentUser.id && (
          <button
            className="add-journal-btn"
            title="Add a Journal"
            onClick={() => navigate(`/galleries/${galleryId}/journals/new`)}
          >
            <FaPlusCircle size={28} />
          </button>
        )}
  
        {/* Likes + Comments */}
        <section className="interactions-section">
          <LikeButton galleryId={galleryId} />
          <Comments galleryId={galleryId} />
        </section>
      </div>
    </>
  );
  
}







// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { thunkGetGallery } from "../../redux/galleries";
// import { thunkFetchVerse } from "../../redux/verse";
// import { FaPlusCircle } from "react-icons/fa";
// import GalleryJournals from "../Journals/GalleryJournals";
// import Comments from "../../components/Comments/Comments"
// import LikeButton from "../../components/LikeButton/LikeButton";
// import "./SingleGalleryPage.css";

// export default function SingleGallery() {
//   const { galleryId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); 

//   const gallery = useSelector(state => state.galleries.singleGallery);
//   const verse = useSelector(state => state.verse); // Redux state for verse text
//   const currentUser = useSelector(state => state.session.user); 

//   const [showEnglish, setShowEnglish] = useState(true);
//   const [showArabic, setShowArabic] = useState(true);

//   // Load the gallery
//   useEffect(() => {
//     dispatch(thunkGetGallery(galleryId));
//   }, [dispatch, galleryId]);

//   // Fetch verse text after gallery is loaded
//   useEffect(() => {
//     if (gallery.surah && gallery.verse) {
//       dispatch(thunkFetchVerse(gallery.surah, gallery.verse));
//     }
//   }, [dispatch, gallery.surah, gallery.verse]);

//   if (!gallery.id) return <p>Loading gallery...</p>;

//  return (
//    <div className="single-gallery-page">
//       {/* Title */}
//       <h2 className="gallery-title">{gallery.title}</h2>

//       {/* Main Image */}
//       <div className="gallery-image-container">
//         <img src={gallery.image} alt={gallery.title} />
//       </div>

//       {/* Verse */}
//       {gallery.surah && gallery.verse && (
//         <div
//           className="gallery-verse"
//           onMouseEnter={() => setShowEnglish(true)}
//         >
//           <p className="verse-ref">
//             Surah {gallery.surah}:{gallery.verse}
//           </p>

//           {!showEnglish ? (
//             <p className="arabic-text">{verse.arabic_text}</p>
//           ) : (
//             <p className="english-text">{verse.english_text}</p>
//           )}
//         </div>
//       )}

//       {/* Description */}
//       {gallery.description && (
//         <div className="gallery-description">{gallery.description}</div>
//       )}

//       {/* Divider */}
//       <div className="divider"></div>

//       {/* Journals */}
//       <GalleryJournals />

//       {/* Add Journal Button (owner only) */}
//       {currentUser && gallery.user_id === currentUser.id && (
//         <button
//           className="add-journal-btn"
//           title="Add a Journal"
//           onClick={() => navigate(`/galleries/${galleryId}/journals/new`)}
//         >
//           <FaPlusCircle size={28} />
//         </button>
//       )}

//       {/* Likes + Comments */}
//       <div className="interactions-section">
//         <LikeButton galleryId={galleryId} />
//         <Comments galleryId={galleryId} />
//       </div>
//     </div>
//   );
// }


