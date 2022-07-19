import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import "./Auth.css";

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();
	const [hideReqEmail, setHideReqEmail] =  useState(true);
	const [hideReqPassword, setHideReqPassword] = useState(true);


	const onLogin = async (e) => {
		e.preventDefault();
		setHideReqEmail(true);
		setHideReqPassword(true);

		const data = await dispatch(login(email, password));
		if (data) {
			if (email === '') setHideReqEmail(false);
			if (password === "") setHideReqPassword(false);
			setErrors(data);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const demoSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(login("demo@demo.com", "password"));
		if (data) {
			setErrors(data);
		}
	};

	const toSignup = async (e) => {
		e.preventDefault();
		history.push("/sign-up");
	};

	if (user) {
		return <Redirect to="/riffs" />;
	}

	return (
		<form id="login-form" onSubmit={onLogin}>
			<div className="auth-header">
				<h1>riff raff</h1>
				<h3>Log in to collaborate with your friends.</h3>
			</div>
			<div className="form-errors">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div className="auth-fields">
				<div className="required-input-header">
					<label htmlFor="email">Email</label>
					<span className="required" hidden={hideReqEmail}>required</span>
				</div>
				<input
					name="email"
					type="text"
					placeholder="Email"
					value={email}
					autoComplete="off"
					onChange={updateEmail}
				/>
			</div>
			<div className="auth-fields">
				<div className="required-input-header">
					<label htmlFor="password">Password</label>
					<span className="required" hidden={hideReqPassword}>required</span>
				</div>
				<input
					name="password"
					type="password"
					placeholder="Password"
					value={password}
					autoComplete="off"
					onChange={updatePassword}
				/>
			</div>
			<div className="login-buttons-container">
				<button className="btn auth-submit" type="submit">
					Login
				</button>
				<button className="btn-cancel" onClick={demoSubmit}>
					Demo Login
				</button>
			</div>
			<div className="auth-page-links">
				<p>Don't have an account?</p>
				<button
					id="to-sign-up"
					className="btn-auth-link"
					onClick={toSignup}
				>
					Sign up!
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
