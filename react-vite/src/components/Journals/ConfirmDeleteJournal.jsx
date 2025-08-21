import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteJournal } from "../../redux/journals";
import "./ConfirmDeleteJournal.css"; 

function ConfirmDeleteJournalModal({ journalId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(thunkDeleteJournal(journalId))
      .then(closeModal);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this journal?</p>
        <div className="modal-buttons">
          <button
            onClick={handleDelete}
            style={{ color: "white", backgroundColor: "red" }}
            className="confirm"
          >
            Delete Journal
          </button>
          <button
            onClick={closeModal}
            className="cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteJournalModal;
