import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
// import { login } from "../../store/session";
import "./RiffFeed.css";
import { genUnfollows } from "../../store/unfollow";
import RiffCard from "./RiffCard";

const SuggestedFollows = () => {
	// const [errors, setErrors] = useState([]);
	const currentUser = useSelector((state) => state.session.user);
	const unfollows = useSelector((state) => state.unfollows);
	// const comments = useSelector((state) => state.comments);

	const dispatch = useDispatch();
	// const history = useHistory();

	useEffect(() => {
        console.log('inside the use effect for unfollooolllloowwsss----------------')
		dispatch(genUnfollows());
                 
	}, [dispatch]);

	//creates array to for follow/unfollow buttons in render
	// const unfollowArr = unfollows[currentUser.id];

	// null before riffs loads from the store
	// if (!unfollowArr) {
	// 	return null;
	// }

    console.log(unfollows);
    let unfollowArr = Object.values(unfollows);
    console.log(unfollowArr)

	return (
		<div id="suggested-body">
            <p> Just here to hang out</p>
            {unfollowArr && unfollowArr.map((user) => {
                return <li>{user.username}</li>;
            })}
		</div>
	);
};

export default SuggestedFollows;



const SuggestedFollows = () => {
	// const [errors, setErrors] = useState([]);
	const currentUser = useSelector((state) => state.session.user);
	const unfollows = useSelector((state) => state.unfollows);
	// const comments = useSelector((state) => state.comments);

	const dispatch = useDispatch();
	// const history = useHistory();

	useEffect(() => {
        console.log('inside the use effect for unfollooolllloowwsss----------------')
		dispatch(genUnfollows());
                 
	}, [dispatch]);


    console.log(unfollows);
    let unfollowArr = Object.values(unfollows);
    console.log(unfollowArr)

	return (
		<div id="suggested-body">
            <p> Just here to hang out</p>
            {unfollowArr && unfollowArr.map((user) => {
                return <li>{user.username}</li>;
            })}
		</div>
	);
};

export default SuggestedFollows;
