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
import React, { useState, useEffect, useRef, } from "react";
import classNames from "classnames";
import Input from "../Input";
import Icon from "../Icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition";
/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 *
 * ~~~js
 * import { Autocomplete } from 'antd-components'
 * ~~~
 */
export var Autocomplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, renderOptions = props.renderOptions, value = props.value, restProps = __rest(props, ["fetchSuggestions", "onSelect", "renderOptions", "value"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1]; //input的value
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1]; //提示的下拉列表数据
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var _e = useState(false), showDropdown = _e[0], setShowDropdown = _e[1];
    useClickOutside(componentRef, function () {
        setSuggestions([]);
    });
    var debouncedValue = useDebounce(inputValue, 500);
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            var results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSuggestions(results);
                // setShowDropdown(true);
                if (results.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            // setSuggestions([]);
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
    }, [debouncedValue, fetchSuggestions]);
    //   const renderTemplate = (item: string) => {
    //     return renderOptions ? renderOptions(item) : item;
    //   };
    var renderTemplate = function (item) {
        return renderOptions ? renderOptions(item) : item.value;
    };
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        // setSuggestions([]);
        setShowDropdown(false);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var hightlight = function (index) {
        if (index < 0) {
            index = 0;
        }
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13: //回车
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38: //向上箭头
                hightlight(highlightIndex - 1);
                break;
            case 40: //向下箭头
                hightlight(highlightIndex + 1);
                break;
            case 27: //esc
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, nimation: "zoom-in-top", timeout: 300, onExited: function () {
                setSuggestions([]);
            } },
            React.createElement("ul", { className: "suggestion-list" }, suggestions.map(function (item, index) {
                var cnames = classNames("suggestion-item", {
                    "is-active": index === highlightIndex,
                });
                return (React.createElement("li", { className: cnames, key: index, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
            }))));
    };
    return (React.createElement("div", { className: "auto-complete-con", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue }, restProps, { onChange: handleChange, onKeyDown: handleKeyDown })),
        loading && (React.createElement("div", { className: "suggstions-loading-icon" },
            React.createElement(Icon, { icon: "spinner", spin: true }))),
        generateDropdown()));
};
export default Autocomplete;
