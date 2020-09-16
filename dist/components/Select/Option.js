import React, { useContext } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import { SelectContext } from "./SelectProps";
export var Option = function (props) {
    var value = props.value, label = props.label, disabled = props.disabled, children = props.children;
    var showTag = children || (label ? label : value);
    var context = useContext(SelectContext);
    var isSelected = context.selectedValues.includes(showTag);
    var classes = classNames("select-item", {
        "is-disabled": disabled,
        "is-selected": isSelected,
    });
    var handleClick = function (e) {
        e.preventDefault();
        if (!disabled && context.onSelect) {
            context.onSelect(value, isSelected);
        }
    };
    return (React.createElement("li", { className: classes, key: value, onClick: handleClick },
        showTag,
        context.multiple && isSelected && React.createElement(Icon, { icon: "check" })));
};
Option.displayName = "Option";
export default Option;
