import React from 'react';
import {useNavigate} from "react-router-dom";
import classNames from "classnames";
import style from "./CloseBtn.module.scss"

const CloseBtn = ({className}) => {
    const navigate = useNavigate();

    return (
        <button className={classNames(className, style.CloseBtn)}
                onClick={() => {
                    navigate(-1);
                }}/>
    );
};

export default CloseBtn;