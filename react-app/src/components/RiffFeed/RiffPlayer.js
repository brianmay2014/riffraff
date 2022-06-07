import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
// import { login } from "../../store/session";
import "./RiffFeed.css";
// import { genRiffs } from "../../store/riff";

const RiffPlayer = ({ riff }) => {
	// const user = useSelector((state) => state.session.user);
	// const [errors, setErrors] = useState([]);
	// const riffs = useSelector((state) => state.riffs);

	// const dispatch = useDispatch();
	// const history = useHistory();

	// useEffect(() => {
	//     dispatch(genRiffs());
	// }, [dispatch]);

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

	// null before riffs / riff prop loads from the store
	if (!riff) {
		return null;
	}

	return (
			<div id={`${riff.id}-player`} className="ind-player">
				Individual riff player will go here!
			</div>
	);
};

export default RiffPlayer;
