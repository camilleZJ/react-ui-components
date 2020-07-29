import React, { FC } from "react";
import { ProgressProps } from "./ProgressProps";

/**
 * 展示操作的当前进度。
 * ### 引用方法
 * ~~~js
 * import { Progress } from 'antd-components'
 * ~~~
 */
export const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props;

  return (
    <div className="progress-bar" style={styles}>
      <div
        className="progress-bar-outer"
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

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};

export default Progress;
