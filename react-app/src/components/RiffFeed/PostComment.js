import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
import { makeComment } from "../../store/comment";

// import { login } from "../../store/session";
import "./RiffFeed.css";
// import { genRiffs } from "../../store/riff";

const PostComment = ({ riff }) => {
	const [addText, setAddText] = useState("");
	const [errors, setErrors] = useState([]);
	const [disabled, setDisabled] = useState(true);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    

    useEffect(() => {
        setDisabled(addText.length === 0);
    }, [addText]);

    const handleSubmit = async (e) => {
        e.preventDefault();
		// console.log('errors at top of handlesubmit',errors);
        const data = {
            user_id: user.id,
            riff_id: riff.id,
            text: addText, 
        };
        setErrors([]);
        const comment = await dispatch(makeComment(data));
		// console.log('errors after comment dispatch',errors);

		// console.log('comment.errors after dispatch',comment.errors);
		// console.log('comment after dispatch', comment);
		// console.log('object key of errors length after dispatch', Object.keys(errors).length);

        if (comment.errors) {
            setErrors(comment.errors);
			comment.errors = [];

			// console.log('errors inside if comment.errors)', errors);
            return;
        }
        // if (comment && Object.keys(errors).length === 0) {
			// console.log('inside reset');
            setAddText("");
        // }

		// console.log('end of handle submit');
    }

	// null before riffs / riff prop loads from the store
	if (!riff) {
		return null;
	}

	return (
		<div
			id={`${riff?.id}-post-comment`}
			className="post-comment"
			onSubmit={handleSubmit}
		>
			<form id={`${riff?.id}-comment-form`} className="post-comment-form">
				<input
					className="post-comment-input"
					type="text"
					placeholder="Add a comment"
					value={addText}
					autoComplete="off"
					onChange={(e) => setAddText(e.target.value)}
				></input>
				<button
					className="post-comment-button"
					type="submit"
					disabled={disabled}
				>
					Post
				</button>
			</form>
			<div className="form-errors comment-errors">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
		</div>
	);
};

export default PostComment;
