import React from 'react';
import style from "./Main.module.scss"
import classNames from "classnames";
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import Body from "../Components/Body";


const Main = () => {
    return (
        <div className={classNames(style.AppWrapper)}>
            <SideBar className={classNames(style.AppSideBar)}/>
            <Header className={classNames(style.AppHeader)}/>
            <Body className={classNames(style.AppBody)}/>
        </div>
    );
};

export default Main;