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
    return <h3 className="no-journal-msg">No journal entries yet for this gallery.</h3>;
  }

  return (
    <div className="gallery-journals">
      <h3>myReflectionJournals</h3>
      <div className="journal-wrapper">
        {journals.map((journal) => (
          <div 
            key={journal.id} 
            className="journal-card"
            onClick={() => navigate(`/journals/${journal.id}`)}
          >
            <div className="journal-image">
              <img src={journal.image} alt={journal.title} />
            </div>
  
            <div className="journal-content">
              <div className="journal-title">
                <h2>{journal.title}</h2>
              </div>
  
              <div className="verse-block">
                <div className="arabic-text">
                  <h3>{journal.arabic_text}</h3>
                </div>
                <div className="english-text">
                  <h3>{journal.english_text}</h3>
                </div>
              </div>
  
              <div className="description">
                <p>{journal.description}</p>
              </div>
  
              <p><strong>Surah {journal.surah}, Verse {journal.verse}</strong></p>
  
              {currentUser && currentUser.id === journal.user_id && (
                <>
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
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
}
