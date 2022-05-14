import React, {useEffect, useRef} from 'react';
import {CAPTURE_OPTIONS, useEstimatePoses, useSetMediaStream, useUserMedia} from "../Utils";

const Camera = () => {
    const videoRef = useRef();
    // const {mediaStream, isLoading} = useUserMedia(CAPTURE_OPTIONS);
    // useSetMediaStream(videoRef, mediaStream);
    // useEstimatePoses(videoRef, mediaStream);

    useEffect(() => {
        const camera = new Camera(videoRef.current, CAPTURE_OPTIONS);
    }, [videoRef.current])

    function handleCanPlay() {
        videoRef.current.play();
    }

    if (isLoading) return <h2>Loading</h2>;

    return (
        <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted/>
    );
};

export default Camera;