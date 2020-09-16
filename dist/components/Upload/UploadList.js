import React from "react";
import Icon from "../Icon";
import Progress from "../Progress";
export var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove, type = props.type;
    var TextItem = function (file) {
        return (React.createElement("li", { className: "upload-list-item " + type + "-item", key: file.uid },
            React.createElement("span", { className: "file-name file-name-" + file.status },
                React.createElement(Icon, { icon: "file-alt", theme: "secondary" }),
                file.name),
            React.createElement("span", { className: "file-status" },
                (file.status === "uploading" || file.status === "ready") && (React.createElement(Icon, { icon: "spinner", spin: true, theme: "primary" })),
                file.status === "success" && (React.createElement(Icon, { icon: "check-circle", theme: "success" })),
                file.status === "error" && (React.createElement(Icon, { icon: "times-circle", theme: "danger" }))),
            React.createElement("span", { className: "file-actions" },
                React.createElement(Icon, { icon: "times", onClick: function () { return onRemove(file); } })),
            file.status === "uploading" && (React.createElement(Progress, { percent: file.percent || 0 }))));
    };
    var PictureItem = function (file) {
        return (React.createElement("li", { className: "upload-list-item " + type + "-item", key: file.uid }, dealPictureItem(file)));
    };
    var dealPictureItem = function (file) {
        if (file.status === "ready") {
            return (React.createElement("span", { className: "file-name file-name-" + file.status },
                file.thumbnail ? (React.createElement("img", { className: "thumbnail", src: file.thumbnail, alt: "file" })) : (React.createElement(Icon, { icon: "file-alt", theme: "secondary", size: "5x" })),
                React.createElement("span", null, file.name)));
        }
        var contentArr = [];
        if (file.status === "uploading") {
            contentArr.push(React.createElement("p", { className: "file-name file-name-" + file.status, key: "name" },
                React.createElement(Icon, { icon: "file-alt", theme: "secondary", size: "5x" }),
                React.createElement("p", { className: "uploading-con" },
                    React.createElement("span", null, file.name),
                    React.createElement(Progress, { percent: file.percent || 0 }))));
        }
        else {
            contentArr.push(React.createElement("span", { className: "file-name file-name-" + file.status, key: "name" },
                file.thumbnail ? (React.createElement("img", { className: "thumbnail", src: file.thumbnail, alt: "file" })) : (React.createElement(Icon, { icon: "file-alt", theme: "secondary", size: "5x" })),
                React.createElement("span", null, file.name)));
            if (file.status === "success") {
                contentArr.push(React.createElement("span", { className: "file-status success-status", key: "status" },
                    React.createElement(Icon, { icon: "check", theme: "light" })));
            }
            else if (file.status === "error") {
                contentArr.push(React.createElement("span", { className: "file-status danger-status", key: "status" },
                    React.createElement(Icon, { icon: "times", theme: "light" })));
            }
        }
        contentArr.push(React.createElement("span", { className: "file-actions", key: "actions" },
            React.createElement(Icon, { icon: "times", onClick: function () { return onRemove(file); } })));
        return contentArr;
    };
    return (React.createElement("ul", { className: "upload-list" }, fileList.map(function (file) {
        if (type === "picture") {
            return PictureItem(file);
        }
        else if (type === "text") {
            return TextItem(file);
        }
    })));
};
export default UploadList;
