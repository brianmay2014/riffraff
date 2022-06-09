import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
// import { genComments } from "../../store/comment";
import { genRiffs } from "../../store/riff";
import CommentRow from "./CommentRow";
import PostComment from "./PostComment";
// import { genRiffs } from "../../store/riff";
// import { login } from "../../store/session";
import "./RiffFeed.css";

const CommentDisplay = ({ riff }) => {
	// const user = useSelector((state) => state.session.user);
	// const [errors, setErrors] = useState([]);
	const [text, setText] = useState("");
	const dispatch = useDispatch();

	const comments = useSelector((state) => state.comments);
	console.log(Object.keys(comments).length);
	const riffs = useSelector((state) => state.riffs);

	useEffect(() => {
		if (riff) {
			dispatch(genRiffs());
		}
	}, [comments, dispatch]);

	// console.log(comments);
	// const commentArr = Object.values(comments);

	let riffComments = [];
	riff?.comment_ids.forEach((comment_id) => {
		riffComments.push(comments[comment_id]);
	});

	const commentCount = riffComments.length

	// null before riffs / riff prop loads from the store
	if (!riff) {
		return null;
	}

	return (
		<div id={`${riff?.id}-comments`} className="comment-display-container">
			<p>{commentCount} comments</p>
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
			<PostComment riff={riff}/>
		</div>
	);
};

export default CommentDisplay;
