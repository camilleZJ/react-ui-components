import React, { FC, useState } from "react";
import classNames from "classnames";
import {
  MenuProps,
  IMenuContext,
  menuContext,
  MenuItemProps,
} from "./MenuProps";

/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ~~~js
 * import { Menu } from 'react-ui-components-pkg'
 * //然后可以使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 * ~~~
 */
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

        // const userItemIndex = childElement.props.index; //item或SubMenu上存在自定义index
        // const itemIndex = userItemIndex
        //   ? userItemIndex.toString()
        //   : index.toString();
        return React.cloneElement(childElement, { index: index.toString() }); //添加默认index为索引 => index就变为非必传属性
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
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
