import {useState, useEffect, useRef} from "react";

export function hasMediaDevices() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
}

export function getMediaStream(requestedMedia) {
    return navigator.mediaDevices.getUserMedia(requestedMedia);
}

export function cleanMediaStream(mediaStream) {
    if (!mediaStream) return;
    return mediaStream.getTracks().forEach(track => {
        track.stop();
    });
}


export function useUserMedia(requestedMedia, videoRef) {
    const mediaStream = useRef(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!mediaStream.current) {
            getMediaStream(requestedMedia)
                .then(stream => {
                    mediaStream.current = stream;
                })
                .catch(err => setError(err))
                .finally(() => setLoading(false))
        }

        return () => cleanMediaStream(mediaStream.current);
    }, [requestedMedia])

    return {mediaStream: mediaStream.current, isLoading, error}
}

export function useSetMediaStream(videoRef, mediaStream) {
    useEffect(() => {
        if (videoRef.current)
            videoRef.current.srcObject = mediaStream;
    }, [mediaStream, videoRef.current]);
}