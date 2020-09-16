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
import React from "react";
/**
 * 展示操作的当前进度。
 * ### 引用方法
 * ~~~js
 * import { Progress } from 'react-ui-components-pkg'
 * ~~~
 */
export var Progress = function (props) {
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme, type = props.type, width = props.width;
    var circleHtml = function () {
        var sty = __assign({ width: width + "px" }, styles);
        var circle_sty = percent >= 50
            ? { clip: "auto" }
            : {
                clip: "rect(0, " + width + "px, " + width + "px, " + width / 2 + "px)",
            };
        return (React.createElement("div", { className: "progress-bar", style: sty },
            React.createElement("div", { className: "progress-bar-outer " + type + "-progress-bar circle-color-" + theme, style: { width: width + "px", height: width + "px" } },
                React.createElement("div", { className: "progress-bar-inner-con", style: circle_sty },
                    React.createElement("div", { className: "progress-bar-inner left-bar", style: {
                            clip: "rect(0, " + width / 2 + "px, " + width + "px, 0)",
                            transform: "rotate(" + (18 / 5) * percent + "deg)",
                        } }),
                    percent >= 50 && (React.createElement("div", { className: "progress-bar-inner right-bar", style: {
                            clip: "rect(0, " + width + "px, " + width + "px, " + width / 2 + "px)",
                        } }))),
                showText && React.createElement("span", { className: "inner-text" }, percent + "%"))));
    };
    var lineHtml = function () {
        return (React.createElement("div", { className: "progress-bar", style: styles },
            React.createElement("div", { className: "progress-bar-outer " + type + "-progress-bar", style: { height: strokeHeight + "px" } },
                React.createElement("div", { className: "progress-bar-inner color-" + theme, style: { width: percent + "%" } }, showText && React.createElement("span", { className: "inner-text" }, percent + "%")))));
    };
    return (React.createElement(React.Fragment, null,
        type === "line" && lineHtml(),
        type === "circle" && circleHtml()));
};
Progress.defaultProps = {
    strokeHeight: 13,
    showText: true,
    theme: "primary",
    type: "line",
    width: 126,
};
export default Progress;
