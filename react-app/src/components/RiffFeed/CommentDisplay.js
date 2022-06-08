import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { genComments } from "../../store/comment";
import CommentRow from "./CommentRow";
import PostComment from "./PostComment";
// import { login } from "../../store/session";
import "./RiffFeed.css";
// import { genRiffs } from "../../store/riff";

const CommentDisplay = ({ riff }) => {
	// const user = useSelector((state) => state.session.user);
	// const [errors, setErrors] = useState([]);
	
	const comments = useSelector((state) => state.comments);
	console.log(Object.keys(comments).length)
	const riffs = useSelector((state) => state.riffs);
	
	// console.log(comments);
	const commentArr = Object.values(comments);

	let commentCount = 0;
	useEffect(() => {
		commentCount = Object.keys(comments).length; 
	}, [comments])
	
	
	let riffComments = [];
	riff.comment_ids.forEach((comment_id) => {
		riffComments.push(comments[comment_id]);
	});

	// null before riffs / riff prop loads from the store
	if (!riff) {
		return null;
	}

	return (
		<div id={`${riff?.id}-comments`} className="comment-display-container">
			<p>{commentCount} comments</p>
			{riffComments.map((comment) => {
				return <CommentRow key={`key-${comment?.id}`} comment={comment} />;
			})}
			<PostComment riff={riff}/>
		</div>
	);
};

export default CommentDisplay;
