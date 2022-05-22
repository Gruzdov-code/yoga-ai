import React from 'react';
import classNames from "classnames";
import {BrowserRouter} from "react-router-dom";
import style from "./App.module.scss"
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import Body from "../Components/Body";

const App = () => {
    return (
        <BrowserRouter>
            <div className={classNames(style.AppWrapper)}>
                <SideBar className={classNames(style.AppSideBar)}/>
                <Header className={classNames(style.AppHeader)}/>
                <Body className={classNames(style.AppBody)}/>
            </div>
        </BrowserRouter>
    )
};

export default App;