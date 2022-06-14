import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./RiffFeed.css";
// import { genRiffs } from "../../store/riff";
import CommentDisplay from "./CommentDisplay";
import { Modal } from "../context/Modal";
import { deleteRiff, editRiff } from "../../store/riff";
import RiffPlayer from "./RiffPlayer";
import WaveForm from '../WaveForm/WaveForm';
// import { AudioVisualizer } from "../WaveForm/AudioVisualizer";
import "react-h5-audio-player/lib/styles.css";

import AudioPlayer from 'react-h5-audio-player'
import './AudioPlayer.css';

const RiffCard = ( {riff} ) => {
	const user = useSelector((state) => state.session.user);
	// const [errors, setErrors] = useState([]);

	const [showRiffModal, setShowRiffModal] = useState(false);
	const [showWave, setShowWave] = useState(false);

	

	let showRiffEdit = false;

	if (riff?.user_id === user.id) {
		showRiffEdit = true;
	}

	//maybe to re-render the whole card??????
    // const riffs = useSelector((state) => state.riffs);
	// const dispatch = useDispatch();
    
    // null before riffs / riff prop loads from the store
    if (!riff) {
        return null;
    } else {

		
		if (riff.author_img === '' || riff.author_img === null || riff.author_img === undefined) {
			riff.author_img =
			"https://images.pexels.com/photos/7899456/pexels-photo-7899456.png?auto=compress&cs=tinysrgb&w=126&h=75&dpr=1";
		}
		
		return (
			<div id={`riff-card-${riff.id}`} className="riff-cards">
			<div className="riff-header">
				<div className="card-header-left">
					<img
						className="card-user-img"
						src={riff?.author_img}
						alt="default-remove"
						></img>
					<p className="authorname">{riff.author_username}</p>
				</div>
				<div className="card-header-right">
					{!showRiffEdit && <div className="not-current-user"></div>}
					{showRiffEdit && (
						<div
						className="user-edit-icon"
						title="Edit/Delete Riff"
						onClick={() => setShowRiffModal(true)}
						>
							<i className="fa-solid fa-sliders"></i>
						</div>
					)}
					{showRiffModal && (
						<Modal
						onClose={() => {
							setShowRiffModal(false);
						}}
						>
							<RiffModal
								riff={riff}
								setShowRiffModal={setShowRiffModal}
								/>
						</Modal>
					)}
				</div>
			</div>
			<div className="riff-player">
				<p className='riff-card-title'>
					{riff?.title}
					</p>
				{/* {riff && <RiffPlayer riff={riff} />} */}
				{riff && <AudioPlayer 
							src={riff.link}
							// onPlay={e => console.log("onPlay")}
							/>}
				{/* <button onClick={(e) => setShowWave(true)}>click em!</button> */}
				{/* {riff && <WaveForm audio={riff.link} riffId={riff.id} />} */}
				{/* {riff && <AudioVisualizer audio={riff.link} riffId={riff.id} />} */}
			</div>
			<div className="card-caption">
				<span className="authorname"> {riff.author_username}</span>
				<span>{riff.note}</span>
			</div>
			<CommentDisplay riff={riff} />
		</div>
	);
}
};

/////////////

const RiffModal = ({ riff, setShowRiffModal }) => {
	const user = useSelector((state) => state.session.user);
	// const [editText, setEditText] = useState(comment.text);
	const [title, setTitle] = useState(riff.title);
	const [note, setNote] = useState(riff.note);

	// setEditText(comment.text)

	const dispatch = useDispatch();

	const [errors, setErrors] = useState([]);

	const handleEdit = async (e) => {
		e.preventDefault();

		console.log('title', title);
		console.log("note", note);
		const updateRiff = { ...riff };
		updateRiff.title = title;
		updateRiff.note = note;

		// console.log("updated comment? - - - - - - - -- -", updateRiff);

		setErrors([]);

		const editRiffConfirm = await dispatch(editRiff(updateRiff));
		console.log(editRiffConfirm.errors);

		if (editRiffConfirm.errors) {
			setErrors(editRiffConfirm.errors);
			return;
		} else {
			// await dispatch(genComments());
			// await dispatch(genRiffs());
			setShowRiffModal(false);
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();

		const data = await dispatch(deleteRiff(riff));





		// if (data) {
		// 	setErrors(data)
		// }
	};

	return (
		<form className="edit-comment-form" onSubmit={handleEdit}>
			<h3 className="h3-edit-comment">Edit Riff</h3>
			<div className="form-errors">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div className="required-input-header">
				<label className="edit-riff-labels">Title</label>
				<span className="required">required</span>
			</div>
			<input
				className="edit-comment-input"
				type="text"
				value={title}
				required
				onChange={(e) => setTitle(e.target.value)}
			/>
			<div className="required-input-header">
				<label className="edit-riff-labels">Note</label>
				<span className="optional">(optional)</span>
			</div>
			<textarea
				className="edit-comment-input"
				type="text"
				value={note}
				onChange={(e) => setNote(e.target.value)}
			/>
			<div className="comment-modal-buttons">
				<button type="submit" className="comment-edit edit-modal-btn">
					Update Riff
				</button>
				<button
					onClick={handleDelete}
					className="comment-delete edit-modal-btn"
				>
					Delete Riff
				</button>
			</div>
		</form>
	);
};


/////////////

export default RiffCard;
