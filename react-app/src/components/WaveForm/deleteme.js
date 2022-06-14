import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import MarkersPlugin from "wavesurfer.js/dist/plugin/wavesurfer.markers.min.js";
import { formatTime } from "../../../utils/formatTime";
import { Howl } from "howler";
import { updateSongTime } from "../../../store/selectedSong";
import {
	pauseSong,
	receivePlaySong,
	resumeSong,
	clearSong,
	setDuration,
} from "../../../store/songPlay";
import "./songContainerTop.css";

const SongContainerTop = ({ sessionUser, song, comments }) => {
	const dispatch = useDispatch();
	const currentSong = useSelector((state) => state.currentSong);
	const selectedSong = useSelector((state) => state.selectedSong.song);
	const [songDuration, setSongDuration] = useState();
	const [currentTime, setCurrentTime] = useState();
	const [isPlaying, setIsPlaying] = useState(false);
	const waveformRef = useRef();
	const timeInterval = useRef();
	const waveSurfer = useRef(null);
	const markersRef = useRef();

	useEffect(() => {
		waveSurfer.current = WaveSurfer.create({
			container: waveformRef.current,
			waveColor: "white",
			progressColor: "#f50",
			cursorColor: "#f50",
			// This parameter makes the waveform look like SoundCloud's player
			barWidth: 2,
			height: 100,
			hideScrollbar: true,
			xhr: {
				cache: "default",
				mode: "cors",
				method: "GET",
				headers: [
					{ key: "cache-control", value: "no-cache" },
					{ key: "pragma", value: "no-cache" },
				],
			},
		});
		waveSurfer.current.load(song.url);
		waveSurfer.current.on("ready", function () {
			setSongDuration(waveSurfer.current.getDuration());
			timeInterval.current = setInterval(() => {
				setCurrentTime(waveSurfer.current?.getCurrentTime());
			}, 300);

			if (currentSong.songId === song.id && currentSong.isPlaying) {
				waveSurfer.current.skip(currentSong.song.seek());
				waveSurfer.current.playPause();
				waveSurfer.current.setVolume(0);
				setIsPlaying(true);
			} else if (currentSong.songId === song.id && currentSong.isPaused) {
				waveSurfer.current.skip(currentSong.song.seek());
				waveSurfer.current.setVolume(0);
			}
		});

		return () => {
			clearInterval(timeInterval.current);
			waveSurfer.current.stop();
			waveSurfer.current.destroy();
			waveSurfer.current = null;
			setIsPlaying(false);
		};
	}, [
		comments,
		currentSong.isPlaying,
		currentSong.song,
		currentSong.songId,
		dispatch,
		song.id,
		song.url,
	]);
	useEffect(() => {
		dispatch(
			updateSongTime(currentTime ? currentTime.toFixed(2) : undefined)
		);

		return () => {};
	}, [dispatch, currentTime]);

	const playSong = () => {
		if (currentSong.songId === song.id && currentSong.isPaused) {
			dispatch(resumeSong());
		} else {
			const sound = new Howl({
				src: [song.url],
				html5: true,
				onend: function () {
					dispatch(clearSong());
				},
				onload: function () {
					dispatch(setDuration(sound._duration));
				},
			});
			dispatch(receivePlaySong(sound, song.id));
		}
		setIsPlaying(!isPlaying);
		if (waveSurfer.current.isPlaying()) {
			clearInterval(timeInterval.current);
		}
		waveSurfer.current.playPause();
		waveSurfer.current.setVolume(0);
	};

	const pauseCurrentSong = () => {
		waveSurfer.current.playPause();
		dispatch(pauseSong());
	};

	return (
		<>
			{song && (
				<div className="top-song-container">
					<div className="left-div">
						<div className="song-info-container">
							<div className="play-info">
								<img
									className="detail-play-button"
									alt={isPlaying ? "Play song" : "Pause song"}
									src={
										isPlaying
											? require("./images/pause-button.png")
											: require("./images/play-button.png")
									}
									onClick={
										isPlaying ? pauseCurrentSong : playSong
									}
								/>
								<div className="artist-song-info">
									<h1 className="song-title">{song.title}</h1>
									<h2 className="song-creator">
										{song.artist}
									</h2>
									<h2 className="song-creator">
										{song.User?.username}
									</h2>
								</div>
							</div>
							<div className="genre-info">
								<h1 className="genre-song-top">
									#{song.Genre.name}
								</h1>
							</div>
						</div>
						<div className="wavebar-div">
							<div id="wavesurfer" ref={waveformRef}></div>
							<div className="absolute-time-container">
								<div className="current-time-show">
									{currentTime ? formatTime(currentTime) : ""}
								</div>
								<div className="time-show-container">
									<div className="total-time-show">
										{songDuration
											? formatTime(songDuration)
											: "Loading..."}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="right-div">
						<div className="uploaded-genre"></div>
						<div className="top-song-image">
							<img
								className="individual-song-image"
								src={
									song.Album?.imageUrl
										? song.Album.imageUrl
										: song.imageUrl
								}
							></img>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SongContainerTop;
