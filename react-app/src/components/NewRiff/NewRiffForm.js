import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./NewRiffForm.css";

const LoginForm = () => {
	const [errors, setErrors] = useState([]);

	const [link, setLink] = useState('');
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");

	const user = useSelector((state) => state.session.user);

	const dispatch = useDispatch();
	const history = useHistory();

	const newRiffSubmit = async (e) => {
		e.preventDefault();

		// user_id = user;


		// const data = await dispatch(login(email, password));
		// if (data) {
		// 	setErrors(data);
		// }
	};
	
	if (!user) {
		return <Redirect to="/" />;
	}

	return (
		<form id="new-riff-form" onSubmit={newRiffSubmit}>
			<div className="new-riff-header">
				{/* <h1>riff raff</h1> */}
				<h3>Add your riffs to get collaborating</h3>
			</div>
			<div className="form-errors">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div className="riff-fields">
				<label>Title</label>
				<input
					name="title"
					type="text"
					placeholder="Title"
					value={title}
					required
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className="riff-fields">
				<label>Note</label>
				<textarea
					name="note"
					type="text"
					placeholder="Add Note (optional)"
					value={note}
					onChange={(e) => setNote(e.target.value)}
				/>
			</div>
			<div className='s3-song-upload'>
				S3 upload to go here lol
			</div>
			<div className="new-riff-submit-container">
				<button className="btn riff-submit" type="submit">
					Add Riff
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
