import React, { FC, useRef, useState, ChangeEvent } from "react";
import axios from "axios";
import { UploadProps, UploadFile } from "./UploadProps";
import Button from "../Button";
import UploadList from "./UploadList";

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
          return { ...file, updateObj };
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
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          console.log("onUploadProgress", e);
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            //修改上传进度

            updateFileList(_file, {
              percent: percentage,
              status: "uploading",
            });

            _file.percent = percentage;
            _file.status = "uploading";
            if (onProgress) {
              onProgress(percentage, _file);
            }
          }
        },
      })
      .then((resp) => {
        updateFileList(_file, {
          status: "success",
          response: resp.data,
        });

        // (_file.response = resp.data), (_file.status = "success");

        if (onSuccess) {
          onSuccess(resp, _file);
        }
        if (onChange) {
          onChange(_file);
        }
      })
      .catch((error) => {
        updateFileList(_file, {
          status: "error",
          error,
        });

        // (_file.error = error), (_file.status = "error");

        if (onError) {
          onError(error, _file);
        }
        if (onChange) {
          onChange(_file);
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

  return (
    <div className="upload-conponent">
      <Button btnType="primary" onClick={handleClick}>
        click to upload
      </Button>
      <input
        className="file-input"
        type="file"
        ref={fileInput}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

export default Upload;
