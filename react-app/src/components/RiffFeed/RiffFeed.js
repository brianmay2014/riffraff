import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
// import { login } from "../../store/session";
import "./RiffFeed.css";
import { genRiffs } from "../../store/riff";
import { genComments } from "../../store/comment";
import { genFollows } from '../../store/follow';
import RiffCard from "./RiffCard";
import SuggestedFollows from "./SuggestedFollows";

const RiffFeed = () => {
	// const [errors, setErrors] = useState([]);
	const currentUser = useSelector((state) => state.session.user);
	const riffs = useSelector((state) => state.riffs);
	const follows = useSelector((state) => state.follows);
	// const comments = useSelector((state) => state.comments);

	const dispatch = useDispatch();
	// const history = useHistory();

	useEffect(() => {
		dispatch(genRiffs());
		dispatch(genFollows());
		dispatch(genComments());
	}, [dispatch]);

	useEffect(() => {
		dispatch(genRiffs());
	}, [follows])

	//creates array to for follow/unfollow buttons in render
	const followArr = follows[currentUser.id];


	// null before riffs loads from the store
	if (!riffs) {
		return null;
	}
	// console.log(riffs);
	const riffArr = Object.values(riffs);
	//sort by id - to show newest created at the top
	riffArr.sort((a, b) => {
		return b.id - a.id;
	});

	return (
		<div id="feed-body">
			<div id="feed-cards">
				{riffArr.length === 0 && (
					<div id='empty-riff-feed'>
						<p>You have no riffs to view!</p>
						<p>Either add to the community <a href='/riffs/new'>here</a></p>
						<p>Or start following other users!</p>
					</div>
				)}
				{riffArr &&
					riffArr.map((riff) => {
						return <RiffCard key={`key-${riff?.id}`} riff={riff} />;
					})}
			</div>
			<SuggestedFollows />
		</div>
	);
};

export default RiffFeed;
