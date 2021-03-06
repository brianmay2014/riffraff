import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
import { genComments, deleteComment, editComment } from "../../store/comment";
import { Modal } from "../context/Modal";
// import { login } from "../../store/session";
import "./RiffFeed.css";
// import { genRiffs } from "../../store/riff";

const CommentRow = ({ comment, text, setText }) => {
	const [showCommentModal, setShowCommentModal] = useState(false);

	const user = useSelector((state) => state.session.user);

	let showEdit = false;

	if (comment?.user_id === user.id) {
		showEdit = true;
	}

	// const [errors, setErrors] = useState([]);
	// const riffs = useSelector((state) => state.riffs);

	// if (user) {
	// 	return <Redirect to="/" />;
	// }

	// null before riffs / riff prop loads from the store
	if (!comment) {
		return null;
	}

	return (
		<div id={`${comment?.id}-comment-row`} className="comment-row-display">
			<div className="edit-button-container">
				{!showEdit && <div className="not-current-user"></div>}
				{showEdit && (
					<div
						className="user-edit-icon"
						title="Edit/Delete Comment"
						onClick={() => setShowCommentModal(true)}
					>
						<i className="fa-solid fa-sliders"></i>
					</div>
				)}
				{showCommentModal && (
					<Modal
						onClose={() => {
							setShowCommentModal(false);
							setText("");
						}}
					>
						<CommentModal
							comment={comment}
							text={text}
							setText={setText}
							setShowCommentModal={setShowCommentModal}
						/>
					</Modal>
				)}
			</div>
			<div className="comment-text">
				<a href={`/users/${comment.user_id}`}>
					<span className="authorname">
						{" "}
						{comment?.author_username}
					</span>
				</a>
				<p className="comment-text-display">{comment?.text}</p>
			</div>
		</div>
	);
};

const CommentModal = ({ comment, text, setText, setShowCommentModal }) => {
	const user = useSelector((state) => state.session.user);
	const [editText, setEditText] = useState(comment.text);

	// setEditText(comment.text)

	const dispatch = useDispatch();

	const [errors, setErrors] = useState([]);

	const handleEdit = async (e) => {
		e.preventDefault();
		const updateComment = { ...comment };
		updateComment.text = editText;

		// console.log('updated comment? - - - - - - - -- -', updateComment);

		setErrors([]);

		const editConfirm = await dispatch(editComment(updateComment));
		if (editConfirm.errors) {
			setErrors(editConfirm.errors);
			return;
		} else {
			await dispatch(genComments());
			// await dispatch(genRiffs());
			setShowCommentModal(false);
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();

		const data = await dispatch(deleteComment(comment));
		// if (data) {
		// 	setErrors(data)
		// }
	};

	return (
		<form className="edit-comment-form" onSubmit={handleEdit}>
			<h3 className="h3-edit-comment">Edit Comment</h3>
			<textarea
				className="edit-comment-input"
				type="text"
				value={editText}
				required
				onChange={(e) => setEditText(e.target.value)}
			/>
			<div className="form-errors">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div className="comment-modal-buttons">
				<button type="submit" className="comment-edit edit-modal-btn">
					Update Comment
				</button>
				<button
					onClick={handleDelete}
					className="comment-delete edit-modal-btn"
				>
					Delete Comment
				</button>
			</div>
		</form>
	);
};

export default CommentRow;
