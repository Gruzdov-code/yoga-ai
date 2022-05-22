import React from 'react';
import classNames from "classnames";
import Banner from "../../Components/Banner";
import Stat from "../../Components/Stat";
import Action from "../../Components/Action/Action";
import Programs from "../../Components/Programs/Programs";
import style from "../../Components/Body/Body.module.scss";

const Main = ({className}) => {
    return (
        <div className={classNames(style.Container)}>
            <Banner className={classNames(style.Banner)}/>
            <div className={classNames(style.Content)}>
                <Stat className={classNames(style.Stat)}/>
                <Action className={classNames(style.Action)}/>
                <Programs className={classNames(style.Programs)}/>
            </div>
        </div>
    );
};

export default Main;