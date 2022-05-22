import React from 'react';
import classNames from "classnames";
import AppRoutes from "../../App/AppRoutes";

const Body = ({className}) => {
    return (
        <div className={classNames(className)}>
            <AppRoutes/>
        </div>
    );
};

export default Body;