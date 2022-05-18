import React from 'react';
import classNames from "classnames";
import style from "./Header.module.scss";

const Header = ({className}) => {
    return (
        <header className={classNames(className)}>
            <div className={classNames(style.HeaderInner)}>
                <h1 className={classNames(style.HeaderLogo)}>
                    YogaAI
                </h1>
                <div className={classNames(style.HeaderUser)}>
                    <img className={classNames(style.UserAvatar)}
                         src="https://www.pngarts.com/files/5/User-Avatar-PNG-Free-Download.png" alt="avatar"/>
                    <h3 className={classNames(style.UserInfo)}>
                        Рубчинский Сергей
                    </h3>
                </div>
            </div>
        </header>
    );
};

export default Header;