import React from 'react';
import classNames from "classnames";
import style from "./Programs.module.scss"
import {poses} from "../../Utils";

const ProgramsOld = ({className}) => {
    return (
        <div className={classNames(className)}>
            <div className={classNames(style.ProgramsInner)}>
                <div className={classNames(style.ProgramsHeader)}>
                    <h3 className={classNames(style.ProgramsTitle)}>
                        Программы тренировок
                    </h3>
                </div>
                <ul className={classNames(style.ProgramsList)}>
                    {poses.map(({label, img}) => (
                        <li className={classNames(style.ProgramsItem)} key={label}>
                            <h3 className={classNames(style.ProgramsLabel)}>{label}</h3>
                            <img className={classNames(style.ProgramsImg)}
                                 src={img} alt="React Logo"/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProgramsOld;