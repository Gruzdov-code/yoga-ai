import React from 'react';
import classNames from "classnames";
import Canvas from "../Canvas";
import style from "./Banner.module.scss"

const Banner = ({className}) => {
    return (
        <div className={classNames(className)}>
            <div className={classNames(style.Inner)}>
                <Canvas className={classNames(style.Canvas)}/>
            </div>
        </div>
    );
};

export default Banner;