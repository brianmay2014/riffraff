import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { genRiffs, likeRiff, unlikeRiff } from "../../store/riff";

import "./RiffFeed.css";

const LikeContainer = ({ riff }) => {
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

    // maybe can feed just the riff id
    // then have the component re-render and pull only that specific riff?

    const submitLike = async (e) => {
        e.preventDefault();

        // dispatch(likeRiff(user.id, riff.id))

        console.log('trying to like this')

        dispatch(likeRiff(riff.id));


    }

    const submitUnlike = async (e) => {
		e.preventDefault();

		// dispatch(unlikeRiff(user.id, riff.id))

		console.log("trying to NOT like this");
        dispatch(unlikeRiff(riff.id));
	};

	// null before riffs / riff prop loads from the store
	if (!riff) {
		return null;
	}

    const likeCount = riff?.user_likes.length
	

	return (
		<div id={`${riff?.id}-likes`} className="like-display-container">
			{!riff?.user_likes.includes(user.id) && (
				<button onClick={submitLike} className="like-button">
					<i className="fa-regular fa-heart"></i>
				</button>
			)}
			{riff?.user_likes.includes(user.id) && (
				<button onClick={submitUnlike} className="like-button">
					<i className="fa-solid fa-heart"></i>
				</button>
			)}
			{likeCount === 0 && <p className='like-text'>No likes</p>}
			{likeCount === 1 && <p className='like-text'>1 like</p>}
			{likeCount > 1 && <p className='like-text'>{likeCount} likes</p>}
		</div>
	);
};

export default LikeContainer;
