import React, { FC, useRef, useState, ChangeEvent, Children } from "react";
import axios from "axios";
import { UploadProps, UploadFile } from "./UploadProps";
import Button from "../Button";
import UploadList from "./UploadList";
import Dragger from "./Dargger";

/**
 * 通过点击或者拖拽上传文件控件
 * ### 引用方法
 * ~~~js
 * import { Upload } from 'antd-components'
 * ~~~
 */
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    defaultFileList,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
    listType
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e, e.target);
    const files = e.target.files;
    if (!files) {
      return;
    }

    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);

    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFlie) => {
            post(processedFlie);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  //更新上传文件的状态status和上传进度percent
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    // setFileList([...fileList, _file]);
    setFileList((prevList) => {
      return [...prevList, _file];
    });

    const formData = new FormData();
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            //修改上传进度

            const updateObj: Partial<UploadFile> = {
              percent: percentage,
              status: "uploading",
            };
            updateFileList(_file, updateObj);
            if (onProgress) {
              onProgress(percentage, { ..._file, ...updateObj });
            }
          }
        },
      })
      .then((resp) => {
        const updateObj: Partial<UploadFile> = {
          status: "success",
          response: resp.data,
        };
        updateFileList(_file, updateObj);

        const newFile = { ..._file, ...updateObj };
        if (onSuccess) {
          onSuccess(resp, newFile);
        }
        if (onChange) {
          onChange(newFile);
        }
      })
      .catch((error) => {
        const updateObj: Partial<UploadFile> = {
          status: "error",
          error,
        };
        updateFileList(_file, updateObj);

        const newFile = { ..._file, ...updateObj };
        if (onError) {
          onError(error, newFile);
        }
        if (onChange) {
          onChange(newFile);
        }
      });
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };

  console.log(children);

  return (
    <div className="upload-component">
      {/* <Button btnType="primary" onClick={handleClick}>
        click to upload
      </Button> */}
      <div
        className="upload-input"
        onClick={handleClick}
        style={{ display: "inline-block" }}
      >
        {drag ? (
          <Dragger onFile={(files) => uploadFiles(files)}>{children}</Dragger>
        ) : (
          children
        )}
        <input
          className="file-input"
          type="file"
          ref={fileInput}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

Upload.defaultProps = {
  name: "file",
  listType: "text",
};

export default Upload;
