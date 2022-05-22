import React, { useState } from 'react';
import classNames from "classnames";
import style from "./Programs.module.scss"
import {poses, program} from "../../Utils";
import Exercises from '../Exercise';
import { NavLink } from 'react-router-dom';

const Programs = ({ className }) => {
  return (
    <div className={classNames(className)}>
      <div className={classNames(style.ProgramsInner)}>
        <div className={classNames(style.ProgramsHeader)}>
          <h3 className={classNames(style.ProgramsTitle)}>
            Программы тренировок
          </h3>
        </div>
        <ul className={classNames(style.ProgramsList)}>
          {program.map(({ label, img, description, id, poses }) => (
            <NavLink

              description={description}
              label={label}
              poses={poses}
              to="/">
              <li

                className={classNames(style.ProgramsItem)}
                key={label}>
                <h3 className={classNames(style.ProgramsLabel)}>{label}</h3>
                <h5 className={classNames(style.ProgramsLabel)}>
                  {description}
                </h5>
                <img
                  className={classNames(style.ProgramsImg)}
                  src={img}
                  alt="React Logo"
                />
                {/* <Exercises id={id} poses={poses} /> */}
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Programs;