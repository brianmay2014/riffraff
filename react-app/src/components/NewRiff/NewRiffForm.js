import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { makeRiff } from "../../store/riff";
import "./NewRiffForm.css";
// import UploadSong from "./UploadSong";

const NewRiffForm = () => {
	const [errors, setErrors] = useState([]);

	const [link, setLink] = useState('');
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");
	const [linkLoading, setLinkLoading] = useState(false);

	const user = useSelector((state) => state.session.user);

	const dispatch = useDispatch();
	const history = useHistory();

	const newRiffSubmit = async (e) => {
		e.preventDefault();

		const data = {
			title: title,
			user_id: user.id,
			note: note,
		}
		//loading message because aws can be a bit slow
		setLinkLoading(true);
		
		setErrors([]);
		const riff = await dispatch(makeRiff(data, link))
		if (riff.errors) {
			// console.log([ ...riff.errors]);
			setErrors(riff.errors);
			// console.log(errors)
			setLinkLoading(false);
			return;
		}
		// if (riff && Object.keys(errors).length === 0) {
			setLink("");
			setTitle("");
			setNote("");
			setLinkLoading(false);

			// route to newly created riff?
			history.push(`/`);
			// history.push(`/riffs/${riff.id}`);
		// }
	};
	
	if (!user) {
		return <Redirect to="/" />;
	}

	const updateLink = (e) => {
		const file = e.target.files[0];
		setLink(file);
	};

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
				{/* {Object.keys(errors).length > 0 && (
					<div className="form-errors">
						{Object.keys(errors).map(
							(key) => `${key.toUpperCase()}: ${errors[key]}`
						)}
					</div>
				)} */}
			</div>
			<div className="riff-fields">
				<div className="required-input-header">
					<label htmlFor="file-input">Title</label>
					<span className="required">required</span>
				</div>
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
			<div className="s3-song-upload riff-fields">
				<div className="required-input-header">
					<label htmlFor="file-input">Upload Riff</label>
					<span className="required">required</span>
				</div>
				<input
					type="file"
					id="file-input"
					// accept="image/*"
					accept=".mp3,.m4a"
					className="riff-file-input"
					onChange={updateLink}
				/>
				{/* <button type="submit">Submit</button> */}
				{linkLoading && <p>Loading...</p>}
				{/* <UploadSong link={link} setLink={setLink} /> */}
			</div>
			<div className="new-riff-submit-container">
				<button className="btn riff-submit" type="submit">
					Add Riff
				</button>
			</div>
		</form>
	);
};

export default NewRiffForm;
