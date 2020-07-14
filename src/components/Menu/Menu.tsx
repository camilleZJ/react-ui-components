import React, { FC, useState } from "react";
import classNames from "classnames";
import {
  MenuProps,
  IMenuContext,
  menuContext,
  MenuItemProps,
} from "./MenuProps";

export const Menu: FC<MenuProps> = (props) => {
  const {
    children,
    className,
    mode,
    style,
    defaultIndex,
    onSelect,
    defaultOpenSubMenus,
  } = props;
  const [currentIndex, setActive] = useState(defaultIndex);

  const classes = classNames("menu-con", className, {
    "mode-vertical": mode === "vertical",
    "mode-horizontal": mode !== "vertical",
  });

  function handleClick(index: string) {
    setActive(index);

    if (onSelect) {
      //用户自定义切换函数来获取选中的index
      onSelect(index);
    }
  }

  const passedContext: IMenuContext = {
    index: currentIndex ? currentIndex : "0", //因为初始值defaultIndex为可选参数，可能为undefined，所以useState(defaultIndex)获取的初始值可能也是undefined
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  //设置menu的children只能为MenuItem|SubMenu
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        // return child;
        return React.cloneElement(childElement, { index: index.toString() }); //添加默认index为索引 => index就变为非必传属性
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
  };

  return (
    <ul className={classes} style={style}>
      <menuContext.Provider value={passedContext}>
        {renderChildren()}
      </menuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: [],
};

export default Menu;
