import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteGallery } from "../../redux/galleries";
import "./ConfirmDeleteGalleryModal.css";

function ConfirmDeleteGalleryModal({ galleryId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(thunkDeleteGallery(galleryId))
      .then(closeModal);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this gallery?</p>
        <div className="modal-buttons">
          <button
            onClick={handleDelete}
            style={{ color: "white", backgroundColor: "red" }}
            className="confirm"
          >
            Delete Gallery
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

export default ConfirmDeleteGalleryModal;
