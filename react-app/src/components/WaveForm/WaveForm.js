import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import WaveSurfer from "wavesurfer.js";

function WaveForm( { audio, riffId } ) {

    // console.log(audio);

    const containerRef = useRef()
    // console.log(containerRef);
    // const waveSurfer = useRef({
    //     isPlaying: false,
    // });
    const [isPlaying, toggleIsPlaying] = useState(false);
    const waveSurferRef = useRef(null)

    // const audio =
	// 	"https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/1-warm.mp3";

    useEffect(() => {
        waveSurferRef.current = WaveSurfer.create({
			container: containerRef.current,
            waveColor: 'white',
            progressColor: '#f50',
            cursorColor: '#f50',
            barWidth: 2,
            height: 85,
            minPxPerSec: 2,
            hideScrollbar: true,
			xhr: {
				cache: "default",
				mode: "no-cors",
				method: "GET",
				credentials: "include",
				headers: [
					{ key: "cache-control", value: "no-cache" },
					{ key: "pragma", value: "no-cache" },
				],
			},
		});
        waveSurferRef.current.load(audio)
        console.log(audio);
        waveSurferRef.current.on('ready', () => {
            console.log(waveSurferRef.current);
            // waveSurferRef.current = waveSurfer
            waveSurferRef.pause()
        })

        console.log(waveSurferRef.current.isReady);
        return () => {
            waveSurferRef.current.destroy()
        }
    }, [audio])

	

	return (
        <>
        <button
        onClick={() => {
            console.log(waveSurferRef);
            waveSurferRef.current.playPause()
            toggleIsPlaying(waveSurferRef.current.isPlaying())
        }} type='button'
        >
            {isPlaying ? 'pause' : 'play'}
        </button>
		<div ref={containerRef}>
            Riff ID: {riffId} with link {audio}
            </div>
        </>
	);
}

WaveForm.propTypes = {
    audio: PropTypes.string.isRequired,
}

export default WaveForm;
