import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { login } from "../../store/session";
import "./UserPage.css";
import { genRiffs } from "../../store/riff";
import { genComments } from "../../store/comment";
import RiffCard from "../RiffFeed/RiffCard";
import { genUser } from "../../store/user";
import { makeFollow, deleteFollow, genFollows } from "../../store/follow";

const UserPage = () => {
    const { userId } = useParams();
	const currentUser = useSelector((state) => state.session.user);
    const riffs = useSelector((state) => state.riffs);
    const user = useSelector((state) => state.user);
    const follows = useSelector((state) => state.follows);
    const [errors, setErrors] = useState([]);
	// const comments = useSelector((state) => state.comments);

	const dispatch = useDispatch();

    useEffect(() => {
        dispatch(genRiffs());
		dispatch(genComments());
        dispatch(genUser(parseInt(userId, 10)))
        dispatch(genFollows())
    }, [dispatch, userId]);


    const followSubmit = async (e) => {
        e.preventDefault();

        const followed_id = parseInt(userId);
        const follower_id = user.id;

        setErrors([]);

        const follow = await dispatch(makeFollow(followed_id, follower_id))

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
    }

    const unfollowSubmit = async (e) => {
		e.preventDefault();

		const followed_id = parseInt(userId);
		const follower_id = user.id;

		setErrors([]);

		const unfollow = await dispatch(deleteFollow(followed_id, follower_id));

		if (unfollow.errors) {
			setErrors(unfollow.errors);
			unfollow.errors = [];

			return;
		}

		//generate following list after unfollow is successful
		const genfollow = await dispatch(genFollows());

		if (genfollow.errors) {
			setErrors(genfollow.errors);
			genfollow.errors = [];

			return;
		}
	};

        //creates array to for follow/unfollow buttons in render
        const followArr = follows[currentUser.id]

    // null before riffs loads from the store
    if (!riffs && !user && !followArr) {
        return null;
     } else {
			if (
				user?.pic_url === "" ||
				user?.pic_url === null ||
				user?.pic_url === undefined
			) {
				user.pic_url =
					"https://images.pexels.com/photos/7899456/pexels-photo-7899456.png?auto=compress&cs=tinysrgb&w=126&h=75&dpr=1";
			}

			const riffArrUnfiltered = Object.values(riffs);

			const riffArr = riffArrUnfiltered.filter((riff) => {
				return riff.user_id == userId;
			});


			//sort by id - to show newest created at the top
			riffArr.sort((a, b) => {
				return b.id - a.id;
			});


			return (
				<div id="user-page">
					<div id="user-display">
						<div id="user-display-left">
							<img src={user.pic_url}></img>
						</div>
						<div id="user-display-right">
							<h3>{user.username}</h3>
							<p id="user-bio">{user.bio}</p>
						</div>

						{/* FOLLOW AND EDIT BUTTONS */}
						<div id="user-display-buttons">
							{userId != currentUser.id &&
								!followArr?.includes(parseInt(userId, 10)) && (
									<form
										id="follow-button"
										onSubmit={followSubmit}
									>
										<button className="btn" type="submit">
											Follow
										</button>
									</form>
								)}
							{userId != currentUser.id &&
								followArr?.includes(parseInt(userId, 10)) && (
									<form
										id="unfollow-button"
										onSubmit={unfollowSubmit}
									>
										<button className="btn" type="submit">
											Unfollow
										</button>
									</form>
								)}


							{userId == currentUser.id && (
								<button
									id="edit-profile-button"
									className="btn"
								>
									Edit Profile
								</button>
							)}

							{/* COMMENT ME OUT - for edit profile
						{showRiffModal && (
							<Modal
								onClose={() => {
									setShowRiffModal(false);
								}}
							>
								<RiffModal
									riff={riff}
									setShowRiffModal={setShowRiffModal}
								/>
							</Modal>
						)} COMMENT ABOVE ME
                        
                    FUTURE FEATURES */}
						</div>
					</div>
					<h5 id="riff-label">{user.username}'s riffs</h5>

					<div id="feed-body">
						{riffArr &&
							riffArr.map((riff) => {
								return (
									<RiffCard
										key={`key-${riff?.id}`}
										riff={riff}
									/>
								);
							})}
					</div>
				</div>
			);
		};
            
        };

            export default UserPage;
            