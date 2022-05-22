import React, { useState } from 'react';
import classNames from "classnames";
import Banner from "../Banner";
import style from "./Body.module.scss"
import Stat from "../Stat";
import Action from "../Action/Action";
import Programs from "../Programs/Programs";


const Body = ({ className }) => {

    const [program, setProgram] = useState(null)


    return (
      <div className={classNames(className)}>
        <div className={classNames(style.Container)}>

          <Banner program={program} className={classNames(style.Banner)}/>
          <div className={classNames(style.Content)}>
            <Stat className={classNames(style.Stat)} />
            <Action className={classNames(style.Action)} />
            <Programs
              className={classNames(style.Programs)}
            />
          </div>
        </div>
      </div>
    );
};

export default Body;