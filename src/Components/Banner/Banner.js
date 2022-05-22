import React, { useState } from "react";
import classNames from "classnames";
import Canvas from "../Canvas/Canvas";
import style from "./Banner.module.scss";
import img from "../../Assets/permission.png";
import Exercise from "../Exercise";
import AboutProgram from "../AboutProgram";

const Banner = ({ className, program }) => {
    const [exercise, setExercise] = useState(null);
       const [isActive, setActive] = useState(false);
  return (
    <div className={classNames(className)}>
      {program ? (
        <>
          {exercise ? (
            <Exercise
              setExercise={setExercise}
              className={classNames(style.Exercises)}
            />
          ) : (
            <AboutProgram
              setExercise={setExercise}
              className={classNames(style.AboutProgram)}
            />
          )}
        </>
      ) : (
        <div className={classNames(style.Inner)}>
          <Canvas className={classNames(style.Canvas)} />
          {isActive ? (
            <Canvas className={classNames(style.Canvas)} />
          ) : (
            <div className={classNames(style.Intro)}>
              <ul className={classNames(style.IntroList)}>
                <p className={classNames(style.IntroListItem)}>
                  Разрешите доступ к камере и дождитесь ее загрузки.
                  <img
                    className={classNames(style.IntroImg)}
                    src={img}
                    alt="permission"
                  />
                </p>

                {/*<p className={classNames(style.IntroListItem)}>*/}
                {/*    Займите аналогичную позу, как на изображении справа, убедившись, что лицом вы*/}
                {/*    обращены в*/}
                {/*    ту же сторону.*/}
                {/*</p>*/}

                {/*<p className={classNames(style.IntroListItem)}>*/}
                {/*    Удерживайте паузу в течение 20 секунд.*/}
                {/*    Таймер перезапускается, если вы допустили ошибку.*/}
                {/*</p>*/}
              </ul>
              <button
                className={classNames(style.IntroBtn)}
                onClick={() => setActive(true)}>
                Запросить доступ
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Banner;
