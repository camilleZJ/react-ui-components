import React, { useContext } from "react";
import classNames from "classnames";
import { menuContext } from "./MenuProps";
var MenuItem = function (props) {
    var className = props.className, index = props.index, children = props.children, disabled = props.disabled, style = props.style;
    var menuContextInfo = useContext(menuContext);
    var classes = classNames("menu-item", className, {
        "is-disabled": disabled,
        "is-active": index === menuContextInfo.index,
    });
    function handleClick() {
        if (!disabled && menuContextInfo.onSelect) {
            if (index && typeof index === "string") {
                menuContextInfo.onSelect(index);
            }
            else {
                console.error("Warning: The attribute  'index'  of  MenuItem  is not string");
            }
        }
    }
    return (React.createElement("li", { className: classes, style: style, key: index, onClick: handleClick }, children));
};
MenuItem.displayName = "MenuItem";
export default MenuItem;
