import React, { useState } from "react";
import classNames from "classnames";
import { menuContext, } from "./MenuProps";
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ~~~js
 * import { Menu } from 'react-ui-components-pkg'
 * //然后可以使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 * ~~~
 */
export var Menu = function (props) {
    var children = props.children, className = props.className, mode = props.mode, style = props.style, defaultIndex = props.defaultIndex, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentIndex = _a[0], setActive = _a[1];
    var classes = classNames("menu-con", className, {
        "mode-vertical": mode === "vertical",
        "mode-horizontal": mode !== "vertical",
    });
    function handleClick(index) {
        setActive(index);
        if (onSelect) {
            //用户自定义切换函数来获取选中的index
            onSelect(index);
        }
    }
    var passedContext = {
        index: currentIndex ? currentIndex : "0",
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    //设置menu的children只能为MenuItem|SubMenu
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                // return child;
                // const userItemIndex = childElement.props.index; //item或SubMenu上存在自定义index
                // const itemIndex = userItemIndex
                //   ? userItemIndex.toString()
                //   : index.toString();
                return React.cloneElement(childElement, { index: index.toString() }); //添加默认index为索引 => index就变为非必传属性
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(menuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: "0",
    mode: "horizontal",
    defaultOpenSubMenus: [],
};
export default Menu;
