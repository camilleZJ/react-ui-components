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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from "react";
import axios from "axios";
// import Button from "../Button";
import UploadList from "./UploadList";
import Dragger from "./Dargger";
/**
 * 通过点击或者拖拽上传文件控件
 * ### 引用方法
 * ~~~js
 * import { Upload } from 'react-ui-components-pkg'
 * ~~~
 */
export var Upload = function (props) {
    var action = props.action, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, beforeUpload = props.beforeUpload, onChange = props.onChange, defaultFileList = props.defaultFileList, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag, listType = props.listType;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = "";
        }
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                dealUpload(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFlie) {
                        dealUpload(processedFlie);
                    });
                }
                else if (result !== false) {
                    dealUpload(file);
                }
            }
        });
    };
    //更新上传文件的状态status和上传进度percent
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var dealUpload = function (file) {
        var fr = new FileReader();
        fr.onload = function (evt) {
            var _a, _b;
            post(file, ((_b = (_a = evt === null || evt === void 0 ? void 0 : evt.target) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.toString()) || "");
        };
        fr.onerror = function (event) {
            alert("Failed to read file!\n\n" + fr.error);
            fr.abort();
            post(file);
        };
        fr.readAsDataURL(file);
    };
    var post = function (file, thumbnail) {
        if (thumbnail === void 0) { thumbnail = ""; }
        var _file = {
            uid: Date.now() + "upload-file",
            status: "ready",
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
            thumbnail: thumbnail,
        };
        // setFileList([...fileList, _file]);
        setFileList(function (prevList) {
            return __spreadArrays(prevList, [_file]);
        });
        var formData = new FormData();
        formData.append(name || "file", file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            headers: __assign(__assign({}, headers), { "Content-Type": "multipart/form-data" }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    //修改上传进度
                    var updateObj = {
                        percent: percentage,
                        status: "uploading",
                    };
                    updateFileList(_file, updateObj);
                    if (onProgress) {
                        onProgress(percentage, __assign(__assign({}, _file), updateObj));
                    }
                }
            },
        })
            .then(function (resp) {
            var updateObj = {
                status: "success",
                response: resp.data,
            };
            updateFileList(_file, updateObj);
            var newFile = __assign(__assign({}, _file), updateObj);
            if (onSuccess) {
                onSuccess(resp, newFile);
            }
            if (onChange) {
                onChange(newFile);
            }
        })
            .catch(function (error) {
            var updateObj = {
                status: "error",
                error: error,
            };
            updateFileList(_file, updateObj);
            var newFile = __assign(__assign({}, _file), updateObj);
            if (onError) {
                onError(error, newFile);
            }
            if (onChange) {
                onChange(newFile);
            }
        });
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    return (React.createElement("div", { className: "upload-component" },
        React.createElement("div", { className: "upload-input", onClick: handleClick, style: { display: "inline-block" } },
            drag ? (React.createElement(Dragger, { onFile: function (files) { return uploadFiles(files); } }, children)) : (children),
            React.createElement("input", { className: "file-input", type: "file", ref: fileInput, onChange: handleFileChange, style: { display: "none" }, accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, type: listType, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: "file",
    listType: "text",
};
export default Upload;
