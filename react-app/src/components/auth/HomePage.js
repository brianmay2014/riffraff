import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import "./Auth.css";

const HomePage = () => {
	const user = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);
	const dispatch = useDispatch();
	const history = useHistory();

	const toLogin = async (e) => {
		e.preventDefault();
		history.push("/login");
	};
	const toSignup = async (e) => {
		e.preventDefault();
		history.push("/sign-up");
	};

	const demoSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(login("demo@demo.com", "password"));
		if (data) {
			setErrors(data);
		}
	};

	if (user) {
		return <Redirect to="/riffs" />;
	}

	return (
		<div id="home-body">
			<div id="home-guts">
				<div id="splash-logo">
					<img
						src="https://riff-raff.s3.us-west-1.amazonaws.com/transparentlogos/middarkslate-clear.png"
						alt="riff raff logo"
					></img>
				</div>
				<div id="splash-auth-links">
					<div className="auth-header">
						<h1>riff raff</h1>
						<h3>A community for songwriters.</h3>
						<p className='home-smaller'>Members can share riffs.</p>
						<p className='home-smaller'>Members can share suggestions for backing chords, or accompanying riffs.</p>
						<h4>Building songs together, one riff at a time.</h4>
					</div>
					<div className="auth-page-links">
						<p>Already have an account?</p>
						<button
							id="to-log-in"
							className="btn-auth-link"
							onClick={toLogin}
						>
							Log in!
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
					<div className="form-errors">
						{errors.map((error, ind) => (
							<div key={ind}>{error}</div>
						))}
					</div>
					<button
						id="home-demo-button"
						className="btn-cancel"
						onClick={demoSubmit}
					>
						Demo Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
