import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./UserPage.css";
import { useParams, useHistory } from "react-router-dom";
import { genUnfollows } from "../../store/unfollow";
import { makeFollow, deleteFollow, genUserFollows, genFollows } from "../../store/follow";

const UserFollowing = () => {
	// const [errors, setErrors] = useState([]);
    const { userId } = useParams();
	const currentUser = useSelector((state) => state.session.user);
	// const unfollows = useSelector((state) => state.unfollows);
	const follows = useSelector((state) => state.follows);
	// const comments = useSelector((state) => state.comments);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		// console.log('inside the use effect for unfollooolllloowwsss----------------')
		dispatch(genUserFollows(currentUser.id));
	}, [dispatch]);

    // only available for the current user to unfollow people
	if (currentUser.id !== parseInt(userId, 10)) {
        history.push('/unauthorized');
    }

	// console.log(unfollows);
	let followArr = Object.values(follows);

    console.log(followArr);


	return (
		<div id="user-follows-body">
			<p>Users you are following</p>
			{followArr &&
				followArr.map((user) => {
					// return <p>{user.username}</p>
					return <FollowingRow key={`key-${user?.id}`} user={user} />;
				})}
		</div>
	);
};

const FollowingRow = (user) => {
	// console.log(user.user);
	let rowuser = user.user;

    // console.log(user.user);

	const currentUser = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);

	const dispatch = useDispatch();

	const unfollowSubmit = async (e) => {
		e.preventDefault();

		const followed_id = rowuser.id;
		const follower_id = currentUser.id;
        

		setErrors([]);

		const follow = await dispatch(deleteFollow(followed_id, follower_id));

		if (follow.errors) {
			setErrors(follow.errors);
			follow.errors = [];

			return;
		}

		//generate following list after follow is successful
		const genfollow = await dispatch(genUserFollows(currentUser.id));

		if (genfollow.errors) {
			setErrors(genfollow.errors);
			genfollow.errors = [];

			return;
		}

		// dispatch(genUnfollows());
	};

	if (
		rowuser.pic_url === "" ||
		rowuser.pic_url === null ||
		rowuser.pic_url === undefined
	) {
		rowuser.pic_url =
			"https://images.pexels.com/photos/7899456/pexels-photo-7899456.png?auto=compress&cs=tinysrgb&w=126&h=75&dpr=1";
	}

	return (
		<div className="unfollow-row">
			<img className="card-user-img" src={rowuser.pic_url} alt="follow" />
			{/* <p> {rowuser.pic_url} </p> */}
			<a href={`/users/${rowuser.id}`}> {rowuser.username} </a>
			<form id="unfollow-button" onSubmit={unfollowSubmit}>
				<button className="feed-unfollow-btn" type="submit">
					Unfollow
				</button>
			</form>
		</div>
	);
};

export default UserFollowing;
