import React, { FC, useState } from "react";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import classnames from "classnames";
import Icon from "../Icon";
import Transition from "../Transition";
import { AlertProps, AlertType, AlertIconInfo } from "./AlertProps";

/**
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 引用方法
 * ~~~js
 * import { Alert } from 'react-ui-components-pkg'
 * ~~~
 */
export const Alert: FC<AlertProps> = (props) => {
  const [isShow, setIsShow] = useState(true);
  const {
    title,
    description,
    type,
    onClose,
    closable,
    showIcon,
    center,
  } = props;
  const classes = classnames("alert-con", {
    [`alert-${type}`]: type,
    "alert-center": center,
  });
  const titleClasses = classnames("alert-title", {
    "bold-title": description,
  });

  const closeAlert = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsShow(false);

    if (onClose) {
      onClose();
    }
  };

  const iconHtml = () => {
    const key = type as AlertType;
    const size: SizeProp = description ? (center ? "1x" : "2x") : "1x";

    return <Icon {...AlertIconInfo[key]} size={size} />;
  };

  const contentHtml = () => {
    if (center && description) {
      return (
        <div>
          <header className="">
            {showIcon && <p className="alert-icon">{iconHtml()}</p>}
            <span className={titleClasses}>{title}</span>
          </header>
          <p className="alert-desc">{description}</p>
        </div>
      );
    } else {
      return (
        <>
          {showIcon && <p className="alert-icon">{iconHtml()}</p>}
          <div>
            <span className={titleClasses}>{title}</span>
            {description && <p className="alert-desc">{description}</p>}
          </div>
        </>
      );
    }
  };

  return (
    <Transition in={isShow} timeout={300} animation="zoom-in-top">
      <div className={classes}>
        {contentHtml()}
        {closable && (
          <span className="alert-close" onClick={closeAlert}>
            <Icon icon="times" />
          </span>
        )}
      </div>
    </Transition>
  );
};
Alert.defaultProps = {
  type: "default",
  closable: true,
  center: false,
  showIcon: false,
};
export default Alert;
