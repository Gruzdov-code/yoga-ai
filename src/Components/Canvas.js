import React, {useEffect, useState, useRef} from 'react';
import {userMediaConfig, detectorConfig, poseDetectionModel} from "../Utils";
import {AICamera} from "../Utils/AICamera";
import classNames from "classnames";

const Canvas = ({className}) => {
    const canvasRef = useRef();
    const {isLoading, error} = useAICamera(canvasRef);

    // if (error) return <h2>error</h2>;
    // if (isLoading) return <h2>Loading</h2>;

    return (
        <canvas className={classNames(className)} ref={canvasRef}/>
    );
};

export default Canvas;

export function useAICamera(canvasRef) {
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (canvasRef.current) {
            const camera = new AICamera(canvasRef, userMediaConfig, poseDetectionModel, detectorConfig);
            camera.setCallback(({isLoading, error}) => {
                setLoading(isLoading);
                setError(error);
            });
            camera.initCamera();
        }
    }, [canvasRef.current])

    return {isLoading, error}
}