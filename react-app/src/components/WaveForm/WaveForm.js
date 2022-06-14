import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import WaveSurfer from "wavesurfer.js";
// import MediaElement from "wavesurfer.js/src/mediaelement";

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
			waveColor: "#7B95AD",
			progressColor: "#7B95AD",
			cursorColor: "#616185",
            cursorWidth: 3,
			backend: "MediaElement",
            // fillParent: false,
            // audioRate: 1.25,
			backgroundColor: "#141422",
			barRadius: 10,
            barMinHeight: 1,
            barHeight: 4,
            drawingContextAttributes: {desynchronized: false},
            // minPxPerSec: 20,
            normalize: true,
            // mediaControls: true,
            // forceDecode: true,
            // partialRender: true,
            pixelRatio: 1,
            barWidth: 10,
			height: 85,
			// hideScrollbar: true,
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
        // console.log(audio);
        waveSurferRef.current.on('ready', () => {
            // console.log(waveSurferRef.current);
            // waveSurferRef.current = waveSurfer
            waveSurferRef.current.pause()
        })

        console.log(waveSurferRef.current.isReady);
        return () => {
            waveSurferRef.current.stop();
            waveSurferRef.current.destroy();
            toggleIsPlaying(false);
        }
    }, [audio])

	

	return (
        <>
        <button
        onClick={() => {
            // console.log(waveSurferRef);
            waveSurferRef.current.playPause()
            toggleIsPlaying(waveSurferRef.current.isPlaying())
            // console.log(waveSurferRef.current.exportImage())
        }} type='button'
        >
            {isPlaying ? 'pause' : 'play'}
        </button>
		<div ref={containerRef}>
            {/* Riff ID: {riffId} with link {audio} */}
            </div>
        </>
	);
}

WaveForm.propTypes = {
    audio: PropTypes.string.isRequired,
}

export default WaveForm;
