import React, {useEffect, useRef} from 'react';
import {CAPTURE_OPTIONS, useSetMediaStream, useUserMedia} from "../Utils";

const Camera = () => {
    const videoRef = useRef();
    const {mediaStream, isLoading} = useUserMedia(CAPTURE_OPTIONS);
    useSetMediaStream(videoRef, mediaStream);

    function handleCanPlay() {
        videoRef.current.play();
    }

    if (isLoading) return <h2>Loading</h2>;

    return (
        <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted/>
    );
};

export default Camera;