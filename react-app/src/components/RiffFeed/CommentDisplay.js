import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { genComments } from "../../store/comment";
import CommentRow from "./CommentRow";
// import { login } from "../../store/session";
import "./RiffFeed.css";
// import { genRiffs } from "../../store/riff";

const CommentDisplay = ({ riff }) => {
	// const user = useSelector((state) => state.session.user);
	// const [errors, setErrors] = useState([]);
	// const riffs = useSelector((state) => state.riffs);

	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	// console.log('in useEffect for generating comments');

	// 	if (riff) {
	// 		dispatch(genComments(riff))
	// 	}

	// }, [riff, dispatch]);

	const riffId = riff.id
	
	const comments = useSelector((state) => state.comments);
	const commentCount = Object.keys(comments).length;
	// console.log(comments);
	const commentArr = Object.values(comments);

	let riffComments = [];
	riff.comment_ids.forEach((comment_id) => {
		riffComments.push(comments[comment_id]);
	});

	// console.log(riffComments);
	// console.log(commentArr);
	// const riffComments = 

	// if (user) {
	// 	return <Redirect to="/" />;
	// }

	// null before riffs / riff prop loads from the store
	if (!riff) {
		return null;
	}

	return (
		<div id={`${riff?.id}-comments`} className="comment-display-container">
			{riffComments.map((comment) => {
				return <CommentRow key={`key-${comment?.id}`} comment={comment} />;
			})}
		</div>
	);
};

export default CommentDisplay;
