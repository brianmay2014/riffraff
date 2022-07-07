import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { login } from "../../store/session";
import "./UserPage.css";
import { genRiffs } from "../../store/riff";
import { genComments } from "../../store/comment";
import RiffCard from "../RiffFeed/RiffCard";
import { genUser } from "../../store/user";

const UserPage = () => {
    const { userId } = useParams();
	const currentUser = useSelector((state) => state.session.user);
	// const [errors, setErrors] = useState([]);
    const riffs = useSelector((state) => state.riffs);
    const user = useSelector((state) => state.user);
	// const comments = useSelector((state) => state.comments);

	const dispatch = useDispatch();
	// const history = useHistory();

    useEffect(() => {
        dispatch(genRiffs());
		dispatch(genComments());
        dispatch(genUser(parseInt(userId, 10)))
    }, [dispatch, userId]);



    // const user = {id: 1,
    //     "email": "demo@demo.com",
    // "username": "demoriffer",
    // "password": "password",
    // "pic_url": "",
    // "bio": "demo user for riffraff" };
    
    // null before riffs loads from the store
    if (!riffs && !user) {
        return null;
     } else {


        if (user?.pic_url === '' || user?.pic_url === null || user?.pic_url === undefined) {
			user.pic_url =
			"https://images.pexels.com/photos/7899456/pexels-photo-7899456.png?auto=compress&cs=tinysrgb&w=126&h=75&dpr=1";
		}
        
        console.log(user);
        
		// console.log(riffs);
		const riffArrUnfiltered = Object.values(riffs)

        const riffArr = riffArrUnfiltered.filter((riff) => {
            // console.log(riff)
            return riff.user_id == userId;
        })
        // console.log('user.id', user.id)
        // console.log(' type of user.id', typeof(user.id))
        // console.log('userId', userId)
        // console.log(' type of userId', typeof(userId))
        // console.log(currentUser);
        // console.log(riffArr);
        
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
						<p id='user-bio'>{user.bio}</p>
					</div>
					<div id="user-display-buttons">
						<button id="follow-button" className="btn">
							Follow
						</button>
						{userId == currentUser.id && (
							<button id="edit-profile-button" className="btn">
								Edit Profile
							</button>
						)}
						{/* {showRiffModal && (
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
						)} */}
					</div>
				</div>
				<h5 id="riff-label">{user.username}'s riffs</h5>

				<div id="feed-body">
					{riffArr &&
						riffArr.map((riff) => {
							return (
								<RiffCard key={`key-${riff?.id}`} riff={riff} />
							);
						})}
				</div>
			</div>
		);
                
            };
            
        };

            export default UserPage;
            