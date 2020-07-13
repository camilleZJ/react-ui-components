import React, { FC, useContext } from "react";
import classNames from "classnames";
import { MenuItemProps, menuContext } from "./MenuProps";

const MenuItem: FC<MenuItemProps> = (props) => {
  const { className, index, children, disabled, style } = props;
  const menuContextInfo = useContext(menuContext);

  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": index === menuContextInfo.index,
  });

  function handleClick() {
    if (!disabled && menuContextInfo.onSelect) {
      if (index || typeof index === "string") {
        menuContextInfo.onSelect(index);
      } else {
        console.error(
          "Warning: The attribute  'index'  of  MenuItem  is not string"
        );
      }
    }
  }

  return (
    <li className={classes} style={style} key={index} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";
export default MenuItem;
