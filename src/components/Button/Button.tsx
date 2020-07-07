import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classNames from "classnames";

// export type ButtonSize = "lg" | "sm";
// export type ButtonType = "primary" | "default" | "danger" | "link";
export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}

//组件可以设置的属性
interface BaseButtonProps {
  /** 自定义类名 */
  className?: string;
  children?: React.ReactNode;
  /** 当btnType为link时，必填 */
  href?: string;
  /** 设置 Button 的类型 */
  btnType?: ButtonType;
  /** 设置 Button 的尺寸 */
  size?: ButtonSize;
  /** 设置 Button 的禁用 */
  disabled?: boolean;
}

//button标签原生的html属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
//连接a元素的html属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
//设置这些属性为可选属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

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
  btnType: ButtonType.Default,
  disabled: false,
};

export default Button;
