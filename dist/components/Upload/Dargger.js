import React, { useState } from "react";
import classNames from "classnames";
export var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var classes = classNames("uploader-dragger", {
        "is-dragger": dragOver,
    });
    var handleDrag = function (event, over) {
        event.preventDefault();
        setDragOver(over);
    };
    var handleDrop = function (event) {
        event.preventDefault();
        setDragOver(false);
        // console.log("dataTansfer: ", event.dataTransfer);
        onFile(event.dataTransfer.files);
    };
    return (React.createElement("div", { className: classes, onDragOver: function (e) { return handleDrag(e, true); }, onDragLeave: function (e) { return handleDrag(e, false); }, onDrop: handleDrop }, children));
};
export default Dragger;
