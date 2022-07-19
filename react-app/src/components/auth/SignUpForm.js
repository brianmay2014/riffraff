import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './Auth.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [hideReqEmail, setHideReqEmail] = useState(true);
  const [hideReqUsername, setHideReqUsername] = useState(true);
  const [hideReqPassword, setHideReqPassword] = useState(true);
  const [hideReqRepeatPassword, setHideReqRepeatPassword] = useState(true);

  const onSignUp = async (e) => {
    e.preventDefault();
	setHideReqEmail(true);
	setHideReqUsername(true);
	setHideReqPassword(true);
	setHideReqRepeatPassword(true);

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
			if (email === '') setHideReqEmail(false);
			if (username === '') setHideReqUsername(false);
			if (password === "") setHideReqPassword(false);
			if (repeatPassword === "") setHideReqRepeatPassword(false);
        	setErrors(data)
		}
    } else {
		if (password === '') setHideReqPassword(false);
		if (repeatPassword === '') setHideReqRepeatPassword(false);
		// console.log('here');
		setErrors(['Both passwords must match to create an account, please try again'])
		if (email === "" && username === '') {
			setHideReqEmail(false);
			setHideReqUsername(false);
			setErrors([
				"Username is a required field.",
				"Email is a required field.",
				"Both passwords must match to create an account, please try again",
			]);
		}
		else if (email === "") {
			setHideReqEmail(false);
			setErrors([
				"Email is a required field.",
				"Both passwords must match to create an account, please try again",
			]);
		}
		else if (username === "") {
			setHideReqUsername(false);
			setErrors([
				"Username is a required field.",
				"Both passwords must match to create an account, please try again",
			]);
		}
    }
  };

  const toLogin = async (e) => {
		e.preventDefault();
		history.push("/login");
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/riffs' />;
  }

  return (
		<form id="sign-up-form" onSubmit={onSignUp}>
			<div className="auth-header">
				<h1>riff raff</h1>
				<h3>Sign up to start collaborating with your friends.</h3>
			</div>
			<div className="form-errors">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div className="auth-fields">
				<div className="required-input-header">
					<label>User Name</label>
					<span className="required" hidden={hideReqUsername}>required</span>
				</div>
				<input
					type="text"
					name="username"
					onChange={updateUsername}
					placeholder="Username"
					autoComplete="off"
					value={username}
				></input>
			</div>
			<div className="auth-fields">
				<div className="required-input-header">
					<label>Email</label>
					<span className="required" hidden={hideReqEmail}>required</span>
				</div>

				<input
					type="text"
					name="email"
					placeholder="Email"
					onChange={updateEmail}
					autoComplete="off"
					value={email}
				></input>
			</div>
			<div className="auth-fields">
				<div className="required-input-header">
				<label>Password</label>
					<span className="required" hidden={hideReqPassword}>required</span>
				</div>

				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={updatePassword}
					autoComplete="off"
					value={password}
				></input>
			</div>
			<div className="auth-fields">
				<div className="required-input-header">
				<label>Confirm Password</label>
					<span className="required" hidden={hideReqRepeatPassword}>required</span>
				</div>
				<input
					type="password"
					name="repeat_password"
					placeholder="Confirm Password"
					onChange={updateRepeatPassword}
					autoComplete="off"
					value={repeatPassword}
					// required={true}
				></input>
			</div>
			<div id="signup-button">
				<button className="btn auth-submit" type="submit">
					Sign Up
				</button>
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
		</form>
  );
};

export default SignUpForm;
