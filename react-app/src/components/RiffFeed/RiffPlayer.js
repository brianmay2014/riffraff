import React, { Component, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
// import { login } from "../../store/session";
import "./RiffFeed.css";
// import { genRiffs } from "../../store/riff";
import WaveSurfer from 'wavesurfer.js';

// const RiffPlayer = ({ riff }) => {

// 	const [state, setState] = useState({ playing: false})

// 	// null before riffs / riff prop loads from the store
	
// 	// let waveform;
	
// 	// useEffect(() => {
// 		const track = document.querySelector(`#${riff?.id}-riff`);
		
// 		const waveform = WaveSurfer.create({
// 			barWidth: 3,
// 			cursorWidth: 1,
// 			container: `${riff?.id}-wave`,
// 			backend: 'WebAudio',
// 			height: 80,
// 			progressColor: '#2D5BFF',
// 			responsive: true,
// 			waveColor: '#EFEFEF',
// 			cursorColor: 'transparent',
// 		});
		
// 		waveform.load(track);
		
// 	// }, []);
	
// 	const handlePlay = () => {
// 		setState({ playing: !state.playing });
// 		waveform.playPause();
// 	}
	
// 	if (!riff) {
// 		return null;
// 	}
	
// 	const url = riff.link;

// 	return (
// 			<div id={`${riff.id}-player`} className="ind-player">
// 				Individual riff player will go here!
// 				{riff.title}
// 				<div className='waveform-container'>
// 					<button className='play-button' onClick={handlePlay}>
// 						{!state.playing ? 'Play' : "Pause"}
// 					</button>
// 					<div className={`${riff.id}-wave`}>

// 					</div>
// 					<audio id={`${riff.id}-riff`} src={url} />
// 				</div>
// 			</div>
// 	);
// };

// export default RiffPlayer;


const RiffPlayer = ({ riff, riffArr }) => {

	console.log(riffArr);

	const [state, setState] = useState({ playing: false})
	const riffs = useSelector((state) => state.riffs);

	if (!riff) {
		return null;
	}
	
	console.log(riffs[riff.id].link);

		const waveform = WaveSurfer.create({
			barWidth: 3,
			cursorWidth: 1,
			container: `#${riff.id}-wave`,
			backend: 'WebAudio',
			height: 80,
			progressColor: '#2D5BFF',
			responsive: true,
			waveColor: '#EFEFEF',
			cursorColor: 'transparent',
		});
		
		waveform.load(riff.link);
	
	const handlePlay = () => {
		setState({ playing: !state.playing });
		waveform.playPause();
	}
	
	const url = riff.link

	return (
			<div id={`${riff.id}-player`} className="ind-player">
				Individual riff player will go here!
				{riff.title}
				<div className='waveform-container'>
					<button className='play-button' onClick={handlePlay}>
						{!state.playing ? 'Play' : "Pause"}
					</button>
					<div className={`${riff.id}-wave`}>

					</div>
					<audio id={`${riff.id}-riff`} src={url} />
				</div>
			</div>
	);
};

export default RiffPlayer;













// class RiffPlayer extends Component {
// 	// constructor(riff) {
// 	// 	super(riff);
// 	// }
	
// 	state = { playing: false};
	
// 	componentDidUpdate() {
// 		console.log(this.props?.riff);
// 		// const track = document.querySelector(`#${this.props?.riff.id}-riff`);
// 		const track = document.querySelector(`#track`);

// 		this.waveform = WaveSurfer.create({
// 			barWidth: 3,
// 			cursorWidth: 1,
// 			// container: `${this.props.riff?.id}-wave`,
// 			container: `.wave`,
// 			backend: "WebAudio",
// 			height: 80,
// 			progressColor: "#2D5BFF",
// 			responsive: true,
// 			waveColor: "#EFEFEF",
// 			cursorColor: "transparent",
// 		});

// 		this.waveform.load(track);
// 	};
	
// 	handlePlay = () => {
// 		this.setState({ playing: !this.state.playing });
// 		this.waveform.playPause();
// 	}
	
// 	// if (!riff) {
// 	// 	return null;
// 	// }
	
// 	render() {

// 		const url = this.props.riff.link;
		
// 		return (
// 			<div id={`${this.props.riff.id}-player`} className="ind-player">
// 				Individual riff player will go here!
// 				{this.props.riff.title}
// 				<div className="waveform-container">
// 					<button className="play-button" onClick={this.handlePlay}>
// 						{!this.state.playing ? "Play" : "Pause"}
// 					</button>
// 					<div className='wave' id={`${this.props.riff.id}-wave`}></div>
// 					{/* <audio id={`${this.props.riff.id}-riff`} src={url} /> */}
// 					<audio id={`track`} src={url} />
// 				</div>
// 			</div>
// 		);
// };

// }
// export default RiffPlayer;
