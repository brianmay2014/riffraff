import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
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
    return <Redirect to='/' />;
  }

  return (
		<form onSubmit={onLogin}>
			<div className="auth-header"></div>
			<div className="form-errors">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div className="auth-fields">
				<label htmlFor="email">Email</label>
				<input
					name="email"
					type="text"
					placeholder="Email"
					value={email}
					onChange={updateEmail}
				/>
			</div>
			<div className="auth-fields">
				<label htmlFor="password">Password</label>
				<input
					name="password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={updatePassword}
				/>
			</div>
			<div>
				<div className="login-buttons-containers">
					<button className="btn" type="submit">
						Login
					</button>
					<button className="btn-cancel" onClick={demoSubmit}>
						Demo Login
					</button>
				</div>
				<p>Don't have an account?</p>
				<button id="to-sign-up" className="btn-auth-link" onClick={toSignup}>
					Sign up!
				</button>
			</div>
		</form>
  );
};

export default LoginForm;
