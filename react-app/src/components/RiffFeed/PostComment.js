import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { genComments, makeComment } from "../../store/comment";

// import { login } from "../../store/session";
import "./RiffFeed.css";
// import { genRiffs } from "../../store/riff";

const PostComment = ({ riff, text, setText }) => {
	// const [text, setText] = useState("");
	const [errors, setErrors] = useState([]);
	const [disabled, setDisabled] = useState(true);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    

    useEffect(() => {
        setDisabled(text.length === 0);
    }, [text]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            user_id: user.id,
            riff_id: riff.id,
            text: text, 
        };
        setErrors({});
        const comment = await dispatch(makeComment(data));
        if (comment.errors) {
            setErrors(comment.errors);
            return;
        }
        if (comment && Object.keys(errors).length === 0) {
            setText("");
        }
    }

	// null before riffs / riff prop loads from the store
	if (!riff) {
		return null;
	}

	return (
		<div id={`${riff?.id}-post-comment`} className="post-comment" onSubmit={handleSubmit}>
			<form id={`${riff?.id}-comment-form`} className="post-comment-form">
				<input
					className="post-comment-input"
					type="text"
					placeholder="Add a comment"
					value={text}
					onChange={(e) => setText(e.target.value)}
				></input>
				<button
					className="post-comment-button"
					type="submit"
					disabled={disabled}
				>
					Post
				</button>
			</form>
		</div>
	);
};

export default PostComment;
