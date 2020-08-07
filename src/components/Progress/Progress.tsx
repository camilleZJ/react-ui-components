import React, { FC } from "react";
import { ProgressProps } from "./ProgressProps";

/**
 * 展示操作的当前进度。
 * ### 引用方法
 * ~~~js
 * import { Progress } from 'react-ui-components-pkg'
 * ~~~
 */
export const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme, type, width } = props;

  const circleHtml = () => {
    const sty = { width: `${width}px`, ...styles };
    const circle_sty =
      percent >= 50
        ? { clip: "auto" }
        : {
            clip: `rect(0, ${width}px, ${width}px, ${(width as number) / 2}px)`,
          };

    return (
      <div className="progress-bar" style={sty}>
        <div
          className={`progress-bar-outer ${type}-progress-bar circle-color-${theme}`}
          style={{ width: `${width}px`, height: `${width}px` }}
        >
          <div className="progress-bar-inner-con" style={circle_sty}>
            <div
              className="progress-bar-inner left-bar"
              style={{
                clip: `rect(0, ${(width as number) / 2}px, ${width}px, 0)`,
                transform: `rotate(${(18 / 5) * percent}deg)`,
              }}
            ></div>
            {percent >= 50 && (
              <div
                className="progress-bar-inner right-bar"
                style={{
                  clip: `rect(0, ${width}px, ${width}px, ${
                    (width as number) / 2
                  }px)`,
                }}
              ></div>
            )}
          </div>
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    );
  };

  const lineHtml = () => {
    return (
      <div className="progress-bar" style={styles}>
        <div
          className={`progress-bar-outer ${type}-progress-bar`}
          style={{ height: `${strokeHeight}px` }}
        >
          <div
            className={`progress-bar-inner color-${theme}`}
            style={{ width: `${percent}%` }}
          >
            {showText && <span className="inner-text">{`${percent}%`}</span>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {type === "line" && lineHtml()}
      {type === "circle" && circleHtml()}
    </>
  );
};

Progress.defaultProps = {
  strokeHeight: 13,
  showText: true,
  theme: "primary",
  type: "line",
  width: 126,
};

export default Progress;
