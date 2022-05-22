import classNames from 'classnames';
import React from 'react';
import { poses } from '../../Utils';
import style from "./Exercises.module.scss";
import TreePose from '../../Assets/poses/tree.svg';

const Exercises = ({className, setExercise}) => {
	return (
    <div
      className={classNames(className)}>
      <div className={classNames(style.Inner)}>
        <div className={classNames(style.Content)}>
          <img
            className={classNames(style.ExerciseImg)}
            src={TreePose}
            alt="React Logo"
          />
          <div className={classNames(style.ExerciseInfo)}>
            <h3 className={classNames(style.ExerciseLabel)}>
              Lorem ipsum dolor sit amet.
            </h3>
            <p className={classNames(style.ExerciseText)}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Explicabo nulla placeat quam iure perspiciatis sapiente aspernatur
              modi reprehenderit ullam tempore est iusto architecto corrupti
              corporis, consectetur hic aliquid iste inventore eum blanditiis
              magnam illo. Voluptatibus eos quo voluptatem nemo, laboriosam, nam
              explicabo dolore architecto repudiandae nobis, eligendi rem
              aliquam accusantium!
            </p>
          </div>
        </div>
        <button
          onClick={() => setExercise?.(false)}
          className={classNames(style.ProgramStart)}>
          Назад
        </button>
      </div>
    </div>
  );
};

export default Exercises;