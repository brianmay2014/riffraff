import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./RiffFeed.css";
import { genUnfollows } from "../../store/unfollow";
import { makeFollow, deleteFollow, genFollows } from "../../store/follow";

const SuggestedFollows = () => {
	// const [errors, setErrors] = useState([]);
	const currentUser = useSelector((state) => state.session.user);
	const unfollows = useSelector((state) => state.unfollows);
    const follows = useSelector((state) => state.follows);
	// const comments = useSelector((state) => state.comments);

	const dispatch = useDispatch();
	// const history = useHistory();

	useEffect(() => {
        // console.log('inside the use effect for unfollooolllloowwsss----------------')
		dispatch(genUnfollows());
                 
	}, [dispatch]);

	//creates array to for follow/unfollow buttons in render
	// const unfollowArr = unfollows[currentUser.id];

	// null before riffs loads from the store
	// if (!unfollowArr) {
	// 	return null;
	// }

    // console.log(unfollows);
    let unfollowArr = Object.values(unfollows);
	let displayArr = unfollowArr.slice(0,4);
	
    // console.log(unfollowArr)

	return (
		<div id="suggested-body">
            <p>Suggestions For You</p>
            {displayArr && displayArr.map((user) => {
                // return <p>{user.username}</p>
                return <FollowRow key={`key-${user?.id}`} user={user} />;
            })}
			{displayArr.length === 0 && <p className='no-suggestions'>No suggested users!</p>}
			<div id='add-riff-link'>
				<p>Feed feeling empty?</p>
				<a href='/riffs/new'>Add a riff!</a>
			</div>
		</div>
	);
};


const FollowRow = (user) => {
    
    // console.log(user.user);
    let rowuser = user.user
    const currentUser = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

        const followSubmit = async (e) => {
			e.preventDefault();

			const followed_id = rowuser.id;
			const follower_id = currentUser.id;

			setErrors([]);

			const follow = await dispatch(makeFollow(followed_id, follower_id));

			if (follow.errors) {
				setErrors(follow.errors);
				follow.errors = [];

				return;
			}

			//generate following list after follow is successful
			const genfollow = await dispatch(genFollows());

			if (genfollow.errors) {
				setErrors(genfollow.errors);
				genfollow.errors = [];

				return;
			}

            dispatch(genUnfollows());
			
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
		<div className="follow-row">
			<img className="card-user-img" src={rowuser.pic_url} alt="follow" />
			{/* <p> {rowuser.pic_url} </p> */}
			<a href={`/users/${rowuser.id}`}> {rowuser.username} </a>
			<form id="follow-button" onSubmit={followSubmit}>
				<button className="feed-follow-btn" type="submit">
					Follow
				</button>
			</form>
		</div>
	);
};

export default SuggestedFollows;
// export default FollowRow;
