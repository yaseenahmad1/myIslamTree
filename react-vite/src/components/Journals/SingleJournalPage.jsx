import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetJournal, thunkEditPrivacy } from "../../redux/journals";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { useModal } from "../../context/Modal";
import ConfirmDeleteJournalModal from "./ConfirmDeleteJournal";
import "./SingleJournalPage.css";

export default function SingleJournalPage() {
  const { journalId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModalContent } = useModal();

  const journal = useSelector(state => state.journals.singleJournal);
  const currentUser = useSelector(state => state.session.user);

  // Fetch journal on mount
  useEffect(() => {
    if (journalId) dispatch(thunkGetJournal(journalId));
  }, [dispatch, journalId]);

  // Toggle privacy
  const handleTogglePrivacy = async () => {
    if (!currentUser || journal.user_id !== currentUser.id) return;
    await dispatch(thunkEditPrivacy({ ...journal, is_private: !journal.is_private }));
    dispatch(thunkGetJournal(journalId)); // refresh data
  };

  if (!journal || !journal.id) return <p>Loading journal...</p>;

  return (
    <div className="single-journal-page">
      <h2>{journal.title}</h2>
      <img src={journal.image} alt={journal.title} className="journal-image" />

      <div className="journal-verse">
        <p><strong>Surah {journal.surah}, Verse {journal.verse}</strong></p>
        <p className="arabic-text">{journal.arabic_text}</p>
        <p className="english-text">{journal.english_text}</p>
      </div>

      {journal.description && (
        <div className="journal-description">{journal.description}</div>
      )}

      {currentUser && currentUser.id === journal.user_id && (
        <div className="journal-actions">
          {/* Privacy toggle */}
          <button
            className="privacy-toggle-btn"
            onClick={handleTogglePrivacy}
            title={journal.is_private ? "Make Public" : "Make Private"}
          >
            {journal.is_private ? <FaLock style={{ color: "red" }} /> : <FaLockOpen />}
          </button>

          {/* Edit & Delete */}
          <button onClick={() => navigate(`/journals/${journal.id}/edit`)}>Edit</button>
          <button onClick={() => setModalContent(<ConfirmDeleteJournalModal journalId={journal.id} />)}>Delete</button>
        </div>
      )}
    </div>
  );
}
