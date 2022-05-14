import React from 'react';
import classNames from "classnames";
import style from "./Stat.module.scss.css"

const Stat = ({className}) => {
    return (
        <div className={classNames(className)}>
            <div className={classNames(style.StatInner)}>
                StatInner
            </div>
        </div>
    );
};

export default Stat;