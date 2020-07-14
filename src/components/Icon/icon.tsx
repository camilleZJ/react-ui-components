import React from "react";
import classNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = (props) => {
  const { theme, className, ...restProps } = props; //className是FontAwesomeIconProps里定义的
  const classes = classNames("menu-icon", className, {
    [`icon-${theme}`]: theme, // icon-primary
  });

  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
