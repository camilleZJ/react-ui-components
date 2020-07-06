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
  className?: string;
  children?: React.ReactNode;
  href?: string;
  btnType?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
}

//button标签原生的html属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
//连接a元素的html属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
//设置这些属性为可选属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

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
