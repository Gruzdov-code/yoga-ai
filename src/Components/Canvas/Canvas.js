import React, {useEffect, useState, useRef} from 'react';
import {userMediaConfig, detectorConfig, poseDetectionModel} from "../../Utils";
import {AICamera} from "../../Utils/AICamera";
import classNames from "classnames";
import style from "./Canvas.module.scss";

const Canvas = ({className}) => {
    const canvasRef = useRef();
    const {isLoading, error} = useAICamera(canvasRef);

    return (
        <div className={classNames(className, style.Inner)}>
            {isLoading && <i className={classNames(style.Loader)}/>}
            <canvas className={classNames(style.Canvas)} ref={canvasRef}/>
        </div>
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