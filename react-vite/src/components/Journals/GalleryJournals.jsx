import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { thunkGetAllJournals, thunkEditPrivacy } from "../../redux/journals";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { useModal } from "../../context/Modal";
import ConfirmDeleteJournalModal from "./ConfirmDeleteJournal";
import "./GalleryJournals.css";

export default function GalleryJournals() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { galleryId } = useParams();

  // Redux state for journals
  const journals = useSelector(state => state.journals.allJournals || []);
  const currentUser = useSelector(state => state.session.user);
  const { setModalContent} = useModal(); 


  // we add our toggle PATCH privacy feature here
  const handleTogglePrivacy = async (journal) => {
    const updatedJournal = { ...journal, is_private: !journal.is_private };
    await dispatch(thunkEditPrivacy(updatedJournal));
    // Refresh journals to immediately reflect the change
    dispatch(thunkGetAllJournals(galleryId));
  };

  useEffect(() => {
    if (galleryId) {
      dispatch(thunkGetAllJournals(galleryId));
    }
  }, [dispatch, galleryId]);

  if (!journals.length) {
    return <p>No journal entries yet for this gallery.</p>;
  }

  return (
    <div className="gallery-journals">
      <h3>Journal Entries</h3>
      <div className="journals-list">
        {journals.map(journal => (
          <div 
            key={journal.id} 
            className="journal-card"
            onClick={() => navigate(`/journals/${journal.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={journal.image} alt={journal.title} className="journal-image" />
            <div className="journal-content">
              <h4>{journal.title}</h4>
              <p><strong>Surah {journal.surah}, Verse {journal.verse}</strong></p>
              <p className="arabic-text">{journal.arabic_text}</p>
              <p className="english-text">{journal.english_text}</p>
              <p>{journal.description}</p>
  
              {/* Privacy toggle button - only for the owner */}
              {currentUser && currentUser.id === journal.user_id && (
                <button
                  className="privacy-toggle-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTogglePrivacy(journal);
                  }}
                  title={journal.is_private ? "Make Public" : "Make Private"}
                >
                  {journal.is_private ? <FaLock /> : <FaLockOpen />}
                </button>
              )}
  
              {/* Edit and Delete buttons for journal cards */}
              {currentUser && currentUser.id === journal.user_id && (
                <div className="journal-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/journals/${journal.id}/edit`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalContent(<ConfirmDeleteJournalModal journalId={journal.id} />);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
}
