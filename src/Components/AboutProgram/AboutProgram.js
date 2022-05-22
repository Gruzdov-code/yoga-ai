import classNames from 'classnames';
import React from 'react';
import { program } from '../../Utils';
import style from "./AboutProgram.module.scss";
const AboutProgram = ({className, setExercise }) => {
	return (
    <div className={classNames(className)}>
      <div className={classNames(style.Inner)}>
        <div className={classNames(style.Header)}>
          <h3 className={classNames(style.Label)}>Lorem ipsum dolor sit</h3>
          <h5 className={classNames(style.Description)}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
            laudantium? Ducimus dolorem eius ex error?Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Nihil, laudantium? Ducimus dolorem
            eius ex error?Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Nihil, laudantium? Ducimus dolorem eius ex error?Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Nihil, laudantium?
            Ducimus dolorem eius ex error?
          </h5>
          <h4 className={classNames(style.Subtitle)}>Упражнения</h4>
        </div>

        <div className={classNames(style.Content)}>
          <ul className={classNames(style.ExercisesList)}>
            {program.map(({ label, img, description, poses }) => (
					<li onClick={() => setExercise?.(label)} className={classNames(style.ExercisesItem)} key={label}>
                <img
                  className={classNames(style.ExercisesImg)}
                  src={img}
                  alt="React Logo"
                />
                <div className={classNames(style.ExercisesInfo)}>
                  <h3 className={classNames(style.ExercisesLabel)}>{label}</h3>
                  <p className={classNames(style.ExercisesText)}>
                    {" "}
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button className={classNames(style.ProgramStart)}>Приступить</button>
      </div>
    </div>
  );
};

export default AboutProgram;