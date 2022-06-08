import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import "./RiffFeed.css";
import { genRiffs } from "../../store/riff";
import { genComments } from "../../store/comment";
import RiffCard from "./RiffCard";

const RiffFeed = () => {
	// const user = useSelector((state) => state.session.user);
	// const [errors, setErrors] = useState([]);
    const riffs = useSelector((state) => state.riffs);
	const comments = useSelector((state) => state.comments);


	const dispatch = useDispatch();
	// const history = useHistory();

    useEffect(() => {
        dispatch(genRiffs());
		dispatch(genComments());
    }, [dispatch]);

	// useEffect(() => {
	// 	// console.log('in useEffect for generating comments');

	
	// 		dispatch(genComments());

	// }, [riff, dispatch]);


	// const toSignup = async (e) => {
	// 	e.preventDefault();
	// 	history.push("/signup");
	// };

	// const demoSubmit = async (e) => {
	// 	e.preventDefault();
	// 	const data = await dispatch(login("demo@demo.com", "password"));
	// 	if (data) {
	// 		setErrors(data);
	// 	}
	// };

	// if (user) {
	// 	return <Redirect to="/" />;
	// }

    
    // null before riffs loads from the store
    if (!riffs) {
        return null;
    } 		
		// console.log(riffs);
		const riffArr = Object.values(riffs)
		// console.log(riffArr);
		
		return (
			<div id="feed-body">
			    {riffArr.map((riff) => {
				        return <RiffCard key={`key-${riff?.id}`} riff={riff} />;
				    })}
			</div>
				
	);

};

export default RiffFeed;
