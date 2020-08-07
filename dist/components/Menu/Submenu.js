var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useContext } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import { menuContext } from "./MenuProps";
import Transition from "../Transition";
export var SubMenu = function (props) {
    var index = props.index, title = props.title, children = props.children, className = props.className, style = props.style;
    var menuContextInfo = useContext(menuContext);
    var openedSubmenus = menuContextInfo.defaultOpenSubMenus; //defaultOpenSubMenus是一个可选参数，这里断言以便安全使用数组的includes方法
    var isOpend = index && menuContextInfo.mode === "vertical"
        ? openedSubmenus.includes(index)
        : false; //垂直排列才存在默认展开
    var _a = useState(isOpend), menuOpen = _a[0], setOpen = _a[1];
    var classes = classNames("menu-item submenu-item", className, {
        "is-active": menuContextInfo.index === index,
        "is-opened": menuOpen,
        "is-vertical": menuContextInfo.mode === "vertical",
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvent = menuContextInfo.mode === "vertical"
        ? {
            onClick: handleClick,
        }
        : {};
    var hoverEvents = menuContextInfo.mode !== "vertical"
        ? {
            onMouseEnter: function (e) { return handleMouse(e, true); },
            onMouseLeave: function (e) { return handleMouse(e, false); },
        }
        : {};
    function renderChildren() {
        var subMenuClasses = classNames("submenu-con", {
            "menu-opened": menuOpen,
        });
        var childrenComponents = React.Children.map(children, function (child, childIndex) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "MenuItem") {
                return React.cloneElement(childElement, {
                    index: index + "-" + childIndex,
                });
            }
            else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: "zoom-in-top" },
            React.createElement("ul", { className: subMenuClasses }, childrenComponents)));
    }
    return (React.createElement("li", __assign({ key: index, className: classes, style: style }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvent),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
