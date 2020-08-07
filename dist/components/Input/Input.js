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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import classNames from "classnames";
import Icon from "../Icon";
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * import { Input } from 'antd-components';
 * ~~~
 *
 * 支持 HTMLInput 的所有基本属性
 */
export var Input = function (props) {
    //此处export是为了storybook使用的
    // const [inputValue, setInputValue] = useState(value);
    var _a;
    var size = props.size, disabled = props.disabled, prepend = props.prepend, append = props.append, icon = props.icon, style = props.style, restProps = __rest(props, ["size", "disabled", "prepend", "append", "icon", "style"]);
    var cnames = classNames("input-wrapper", (_a = {},
        _a["input-size-" + size] = size,
        _a["is-disabled"] = disabled,
        _a["input-group"] = prepend || append,
        _a["input-group-append"] = !!append,
        _a["input-group-prepend"] = !!prepend,
        _a));
    //非受控组件转为受控组件：值有组件的state管理，从undefined变为有意思的值会报错
    //报错：A component is changing an uncontrolled input of type undefined to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa).
    var fixControlledValue = function (value) {
        if (typeof value === "undefined" || value === null) {
            return "";
        }
        return value;
    };
    if ("value" in props) {
        //value和defaultValue不允许同时存在
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (React.createElement("div", { className: cnames, style: style },
        prepend && React.createElement("div", { className: "input-group-prepend-con" }, prepend),
        icon && (React.createElement("div", { className: "icon-wrapper" },
            React.createElement(Icon, { icon: icon, title: "title-" + icon }))),
        React.createElement("input", __assign({ className: "input-inner", disabled: disabled }, restProps)),
        append && React.createElement("div", { className: "input-group-append-con" }, append)));
};
export default Input;
