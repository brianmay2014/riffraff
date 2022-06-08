import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { genComments } from "../../store/comment";
// import { login } from "../../store/session";
import "./RiffFeed.css";
// import { genRiffs } from "../../store/riff";

const CommentRow = ({ comment }) => {
	// const user = useSelector((state) => state.session.user);
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
		<div id={`${comment.id}-comment-row`} className="comment-row-display">
			<span className="authorname"> {comment.author_username}</span>
			<span>{comment.text}</span>
		</div>
	);
};

export default CommentRow;
