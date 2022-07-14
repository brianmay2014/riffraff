import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { genComments } from "../../store/comment";
import { genRiffs, genRiffsUser } from "../../store/riff";
import CommentRow from "./CommentRow";
import PostComment from "./PostComment";
// import { genRiffs } from "../../store/riff";
// import { login } from "../../store/session";
import "./RiffFeed.css";

const CommentDisplay = ({ riff }) => {
	// const user = useSelector((state) => state.session.user);
	// const [errors, setErrors] = useState([]);
	const { userId } = useParams();
	const [text, setText] = useState("");
	const dispatch = useDispatch();

	const comments = useSelector((state) => state.comments);
	// console.log(Object.keys(comments).length);
	// const riffs = useSelector((state) => state.riffs);

	useEffect(() => {
		if (riff) {
			// updating the riff store to which page it's loaded
			// a user page
			if (window.location.href.includes('user')) {
				dispatch(genRiffsUser(parseInt(userId, 10)))
			} else {
				//the riff feed
				dispatch(genRiffs());
			}
		}
	}, [comments, dispatch]);

	// console.log(comments);
	// const commentArr = Object.values(comments);

	let riffComments = [];
	riff?.comment_ids?.forEach((comment_id) => {
		riffComments.push(comments[comment_id]);
	});

		// if seeded with different times
		// riffComments.sort((a, b) => {
		// 	return a.created_at - b.created_at;
		// });

		riffComments.sort((a, b) => {
			return a.id - b.id;
		});

		// console.log(riffComments);

	const commentCount = riffComments.length;

	// null before riffs / riff prop loads from the store
	if (!riff) {
		return null;
	}

	return (
		<div id={`${riff?.id}-comments`} className="comment-display-container">
			{commentCount === 0 && (
				<p className="comment-count-number"> No comments</p>
			)}
			{commentCount === 1 && (
				<p className="comment-count-number"> 1 comment</p>
			)}
			{commentCount > 1 && (
				<p className="comment-count-number">{commentCount} comments</p>
			)}
			{riffComments.map((comment) => {
				return (
					<CommentRow
						key={`key-${comment?.id}`}
						comment={comment}
						text={text}
						setText={setText}
					/>
				);
			})}
			<PostComment riff={riff} />
		</div>
	);
};

export default CommentDisplay;
