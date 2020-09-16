var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useState, useRef, useEffect, } from "react";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
import Input from "../Input";
import Transition from "../Transition";
import Icon from "../Icon";
import { SelectContext, } from "./SelectProps";
/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'react-ui-components-pkg'
 * // 然后可以使用 <Select> 和 <Select.Option>
 * ~~~
 */
export var Select = function (props) {
    var defaultValue = props.defaultValue, placeholder = props.placeholder, disabled = props.disabled, multiple = props.multiple, name = props.name, onChange = props.onChange, onVisibleChange = props.onVisibleChange, children = props.children;
    var _a = useState(false), menuOpen = _a[0], setMenuToggle = _a[1];
    var containerRef = useRef(null);
    var input = useRef(null);
    var tagsCon = useRef(null);
    var containerWidth = useRef(0);
    var _b = useState(typeof defaultValue === "string" ? defaultValue : ""), value = _b[0], setValue = _b[1];
    var _c = useState(Array.isArray(defaultValue) ? defaultValue : []), selectedValues = _c[0], setSelectedValues = _c[1];
    var _d = useState([]), tagInfo = _d[0], setTagInfo = _d[1];
    var classes = classNames("select-con", {
        "menu-is-open": menuOpen,
        "is-disabled": disabled,
        "is-multiple": multiple,
    });
    useEffect(function () {
        if (input.current) {
            input.current.focus();
            if (multiple && selectedValues.length > 0) {
                input.current.placeholder = "";
            }
            else if (placeholder) {
                input.current.placeholder = placeholder;
            }
        }
    }, [selectedValues, multiple, placeholder]);
    useEffect(function () {
        var showTag = [];
        var tagsInfo = React.Children.map(children, function (child) {
            var _a;
            var childElement = child;
            var _b = childElement.props, optionValue = _b.value, label = _b.label, optionsChildren = _b.children;
            if (Array.isArray(defaultValue)) {
                if (defaultValue.includes(optionValue)) {
                    showTag.push(optionsChildren || (label ? label : optionValue));
                }
            }
            else if (typeof defaultValue === "string") {
                if (optionValue === defaultValue) {
                    showTag.push(optionsChildren || (label ? label : optionValue));
                }
            }
            return _a = {},
                _a[optionValue] = optionsChildren || (label ? label : optionValue),
                _a;
        });
        if (showTag.length > 0) {
            multiple ? setSelectedValues(showTag) : setValue(showTag[0]);
        }
        if (tagsInfo) {
            setTagInfo(tagsInfo);
        }
    }, [children, defaultValue]);
    useEffect(function () {
        if (containerRef.current) {
            containerWidth.current = containerRef.current.getBoundingClientRect().width;
        }
    });
    useEffect(function () {
        if (tagsCon.current && input.current) {
            var inittagsConHeight = tagsCon.current.getBoundingClientRect().height;
            var tagsConHeight = inittagsConHeight < 38 ? 38 : inittagsConHeight;
            input.current.style.height = tagsConHeight + "px";
            tagsCon.current.style.marginTop =
                (tagsConHeight - inittagsConHeight) / 2 + "PX";
        }
    }, [selectedValues]);
    var hideOptionList = function () {
        setMenuToggle(false);
        if (onVisibleChange && menuOpen) {
            onVisibleChange(false);
        }
    };
    useClickOutside(containerRef, hideOptionList);
    var handleOptionClick = function (value, hasSelected, isTag) {
        if (isTag === void 0) { isTag = false; }
        var tag = value;
        if (!isTag) {
            var showTag = "";
            for (var _i = 0, tagInfo_1 = tagInfo; _i < tagInfo_1.length; _i++) {
                var item = tagInfo_1[_i];
                showTag = item[value];
                if (showTag) {
                    break;
                }
            }
            tag = showTag || value;
        }
        // click again to remove selected when is multiple mode
        if (multiple) {
            setValue("");
            //hasSelected: true已经选中  再次点击则是删除
            if (hasSelected) {
                //删除已选择的
                setSelectedValues(function (prevValues) {
                    return prevValues.filter(function (v) { return v !== tag; });
                });
            }
            else {
                //新增选中项
                setSelectedValues(function (prevValues) {
                    return __spreadArrays(prevValues, [tag]);
                });
            }
        }
        else {
            setValue(tag);
            hideOptionList();
        }
        if (onChange) {
            onChange(value, [value]);
        }
    };
    var passedContext = {
        onSelect: handleOptionClick,
        multiple: multiple,
        selectedValues: multiple ? selectedValues : [value],
    };
    var handleClick = function (event) {
        event.preventDefault();
        if (disabled) {
            return;
        }
        setMenuToggle(!menuOpen);
        if (onVisibleChange) {
            onVisibleChange(!menuOpen);
        }
    };
    var generateOptions = function () {
        var options = React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "Option") {
                return React.cloneElement(childElement, { index: "select-" + i });
            }
            else {
                console.error("Warning: Select has a child which is not a Option component");
            }
        });
        return options;
    };
    return (React.createElement("div", { className: classes, ref: containerRef },
        React.createElement("div", { className: "select-input", onClick: handleClick },
            React.createElement(Input, { placeholder: placeholder, name: name, disabled: disabled, value: (value === null || value === void 0 ? void 0 : value.toString()) || "", icon: "angle-down", readOnly: true, ref: input })),
        React.createElement(SelectContext.Provider, { value: passedContext },
            React.createElement(Transition, { in: menuOpen, animation: "zoom-in-top", timeout: 300 },
                React.createElement("ul", { className: "select-dropdown", "data-testid": "dropdown" }, generateOptions()))),
        multiple && (React.createElement("div", { className: "selected-tags-con", style: {
                maxWidth: containerWidth.current - 32,
            }, ref: tagsCon }, selectedValues.map(function (value, index) {
            return (React.createElement("span", { className: "selected-tag", key: index },
                value,
                React.createElement(Icon, { icon: "times", onClick: function () { return handleOptionClick(value, true, true); } })));
        })))));
};
Select.defaultProps = {
    placeholder: "请选择",
    name: "select-name",
    multiple: false,
    disabled: false,
};
export default Select;
