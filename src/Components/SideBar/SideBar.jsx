import React from 'react';
import classNames from "classnames";
import IonIcon from '@reacticons/ionicons';
import style from "./SideBar.module.scss"

const SideBar = ({className}) => {
    return (
        <nav className={classNames(className)}>
            <ul className={classNames(style.SideBarList)}>
                <li className={classNames(style.SideBarItem)}>
                    <IonIcon className={classNames(style.SideBarItemImg)} name="home-outline"/>
                </li>

                <li className={classNames(style.SideBarItem)}>
                    <IonIcon className={classNames(style.SideBarItemImg)} name="stats-chart"/>
                </li>

                <li className={classNames(style.SideBarItem)}>
                    <IonIcon className={classNames(style.SideBarItemImg)} name="today"/>
                </li>
            </ul>
        </nav>
    );
};

export default SideBar;