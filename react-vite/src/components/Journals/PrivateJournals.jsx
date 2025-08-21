import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkGetPrivateJournals } from "../../redux/journals";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { thunkEditPrivacy } from "../../redux/journals";
import { useModal } from "../../context/Modal";
import ConfirmDeleteJournalModal from "./ConfirmDeleteJournal";
import "./PrivateJournals.css";

export default function PrivateJournals() {
  const dispatch = useDispatch();
  const privateJournals = useSelector(state => state.journals.privateJournals || []);
  const currentUser = useSelector(state => state.session.user);
  const { setModalContent} = useModal(); 
  const navigate = useNavigate(); 


  
  useEffect(() => {
    dispatch(thunkGetPrivateJournals());
  }, [dispatch]);

  if (!privateJournals.length) {
    return <p>You don’t have any private journals yet.</p>;
  }

  return (
    <div className="private-journals-page">
      <h2>A Collection of your Private Journals</h2>
      <div className="private-journals-list">
        {privateJournals.map(journal => (
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

              {/* Privacy toggle button */}
              <button
                className="privacy-toggle-btn"
                onClick={async (e) => {
                  e.stopPropagation(); // prevent navigation
                  await dispatch(thunkEditPrivacy({ id: journal.id, is_private: false }));
                  dispatch(thunkGetPrivateJournals());
                }}
                title="Make Public"
              >
                <FaLock />
              </button>

              {/* Edit and Delete */}
              {currentUser.id === journal.user_id && (
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
