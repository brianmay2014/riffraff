import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { genComments } from "../../store/comment";
import { genRiffs } from "../../store/riff";
// import { genRiffs } from "../../store/riff";
// import { login } from "../../store/session";
import "./RiffFeed.css";

const LikeContainer = ({ riff }) => {
	const user = useSelector((state) => state.session.user);
	

    // maybe can feed just the riff id
    // then have the component re-render and pull only that specific riff?



	// null before riffs / riff prop loads from the store
	if (!riff) {
		return null;
	}

	return (
		<div id={`${riff?.id}-likes`} className="like-display-container">
			
            {!riff?.user_likes.includes(user.id) && <button className='like-button'>
                <i className="fa-regular fa-heart"></i>
            </button>}
            {riff?.user_likes.includes(user.id) && <button className='like-button'>
			    <i className="fa-solid fa-heart"></i>

            </button>}

		</div>
	);
};

export default LikeContainer;
