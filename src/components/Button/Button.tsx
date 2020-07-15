import React, { FC } from "react";
import classNames from "classnames";

import { ButtonType, ButtonProps } from "./ButtonProps";

/**
 * 页面中最常用的按钮元素，适用于完成特定的交互。
 * ## 引用方法
 * ~~~js
 * import {Button} from 'antd-components'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    href,
    btnType,
    size,
    disabled,
    ...restProps
  } = props;

  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled, //link没有disabled=》额外添加样式
  });

  if (btnType === "link" && href) {
    return (
      <a className={classes} {...restProps} href={href}>
        {children}
      </a>
    );
  } else {
    return (
      <button
        type="button"
        className={classes}
        {...restProps}
        disabled={disabled}
      >
        {props.children}
      </button>
    );
  }
};

Button.defaultProps = {
  btnType: "default", //ButtonType.Default,
  disabled: false,
};

export default Button;
