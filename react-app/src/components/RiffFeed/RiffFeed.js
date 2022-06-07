import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import "./RiffFeed.css";

const RiffFeed = () => {
	// const user = useSelector((state) => state.session.user);
	// const [errors, setErrors] = useState([]);
	// const dispatch = useDispatch();
	// const history = useHistory();


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

	return (
		<div id="home-body">
			This is where the riffs will all show up.
		</div>
	);
};

export default RiffFeed;
