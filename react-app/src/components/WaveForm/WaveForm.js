import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import WaveSurfer from "wavesurfer.js";

function WaveForm( { audio, riffId } ) {
    const containerRef = useRef()
    // console.log(containerRef);
    const waveSurferRef = useRef()

    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current,
        })
        waveSurfer.load(audio)
        waveSurfer.on('ready', () => {
            waveSurferRef.current = waveSurfer
        })

        return () => {
            waveSurfer.destroy()
        }
    }, [audio])

	

	return (
		<div ref={containerRef}>
            Riff ID: {riffId} with link {audio}
            </div>
	);
}

WaveForm.propTypes = {
    audio: PropTypes.string.isRequired,
}

export default WaveForm;
