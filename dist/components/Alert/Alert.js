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
import React, { useState } from "react";
import classnames from "classnames";
import Icon from "../Icon";
import Transition from "../Transition";
import { AlertIconInfo } from "./AlertProps";
/**
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 引用方法
 * ~~~js
 * import { Alert } from 'react-ui-components-pkg'
 * ~~~
 */
export var Alert = function (props) {
    var _a;
    var _b = useState(true), isShow = _b[0], setIsShow = _b[1];
    var title = props.title, description = props.description, type = props.type, onClose = props.onClose, closable = props.closable, showIcon = props.showIcon, center = props.center;
    var classes = classnames("alert-con", (_a = {},
        _a["alert-" + type] = type,
        _a["alert-center"] = center,
        _a));
    var titleClasses = classnames("alert-title", {
        "bold-title": description,
    });
    var closeAlert = function (e) {
        e.preventDefault();
        setIsShow(false);
        if (onClose) {
            onClose();
        }
    };
    var iconHtml = function () {
        var key = type;
        var size = description ? (center ? "1x" : "2x") : "1x";
        return React.createElement(Icon, __assign({}, AlertIconInfo[key], { size: size }));
    };
    var contentHtml = function () {
        if (center && description) {
            return (React.createElement("div", null,
                React.createElement("header", { className: "" },
                    showIcon && React.createElement("p", { className: "alert-icon" }, iconHtml()),
                    React.createElement("span", { className: titleClasses }, title)),
                React.createElement("p", { className: "alert-desc" }, description)));
        }
        else {
            return (React.createElement(React.Fragment, null,
                showIcon && React.createElement("p", { className: "alert-icon" }, iconHtml()),
                React.createElement("div", null,
                    React.createElement("span", { className: titleClasses }, title),
                    description && React.createElement("p", { className: "alert-desc" }, description))));
        }
    };
    return (React.createElement(Transition, { in: isShow, timeout: 300, animation: "zoom-in-top" },
        React.createElement("div", { className: classes },
            contentHtml(),
            closable && (React.createElement("span", { className: "alert-close", onClick: closeAlert },
                React.createElement(Icon, { icon: "times" }))))));
};
Alert.defaultProps = {
    type: "default",
    closable: true,
    center: false,
    showIcon: false,
};
export default Alert;
