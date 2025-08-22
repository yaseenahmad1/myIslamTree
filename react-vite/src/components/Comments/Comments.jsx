import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getCommentsByGalleryId, 
    createComment, 
    editComment 
} from '../../redux/comments';
import { useModal } from "../../context/Modal";
import AuthPromptModal from '../AuthPromptModal/AuthPromptModal';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import ConfirmDeleteModal from './ConfirmDeleteCommentModal';
import './Comments.css';

function Comments({ galleryId }) {
    const dispatch = useDispatch();
    const commentsList = useSelector((state) => state.comments); 
    const commentsArr = Object.values(commentsList); 
    const sessionUser = useSelector(state => state.session.user);

    const [newComment, setNewComment] = useState(''); 
    const [editId, setEditId] = useState(null); 
    const [editBody, setEditBody] = useState(''); 
    const [showComments, setShowComments] = useState(false);
    const { setModalContent } = useModal(); 

    useEffect(() => {
        if (galleryId) dispatch(getCommentsByGalleryId(galleryId)); 
    }, [dispatch, galleryId]);

    const handleCreate = (e) => { 
        e.preventDefault(); 
        if (!newComment.trim()) return;

        if (!sessionUser) {
            setModalContent(
                <AuthPromptModal
                    onClose={() => setModalContent(null)}
                    openLogin={() => setModalContent(<LoginFormModal />)}
                    openSignup={() => setModalContent(<SignupFormModal />)}
                />
            );
            return;
        }

        dispatch(createComment(galleryId, { comment_body: newComment })); 
        setNewComment(''); 
    }; 

    const startEditing = (comment) => {
        setEditId(comment.id); 
        setEditBody(comment.comment_body);
    }; 

    const handleEdit = (e) => {
        e.preventDefault(); 
        if (!editBody.trim()) return;
        dispatch(editComment(editId, { comment_body: editBody }));
        setEditId(null); 
        setEditBody('');
    };  

    const handleDeleteClick = (comment) => {
        setModalContent(<ConfirmDeleteModal commentId={comment.id} />);
    };

    const sortedComments = commentsArr.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); 

    return (
        <div className="comments-section">
            {/* Section Header with dropdown toggle */}
            <h3 
                className="comments-header toggle"
                onClick={() => setShowComments(!showComments)}
            >
                {showComments 
                    ? `Hide Comments ▲` 
                    : `Show Comments (${sortedComments.length}) ▼`}
            </h3>

            {/* Comments list (only show if dropdown is open) */}
            {showComments && (
                <div className="comments-list">
                    {sortedComments.map(comment => (
                        <div key={comment.id} className="comment">
                            {editId === comment.id ? (
                                <form onSubmit={handleEdit}>
                                    <textarea
                                        value={editBody}
                                        onChange={(e) => setEditBody(e.target.value)}
                                    />
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => setEditId(null)}>Cancel</button>
                                </form>
                            ) : (
                                <>
                                    <p>{comment.comment_body}</p>
                                    <div className="comment-meta">
                                        <span className='comment-username'>{comment.username}</span>
                                        <span className='comment-date'>{new Date(comment.created_at).toLocaleDateString()}</span>
                                    </div>
                                    {sessionUser && Number(sessionUser.id) === Number(comment.user_id) && (
                                        <div className="comment-actions">
                                            <button className="edit-btn" onClick={() => startEditing(comment)}>Edit</button>
                                            <button className="delete-btn" onClick={() => handleDeleteClick(comment)}>Delete</button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Comment form (always visible) */}
            <form onSubmit={handleCreate} className="comment-form">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button type="submit">Post Comment</button>
            </form>
        </div>
    );
}

export default Comments;

