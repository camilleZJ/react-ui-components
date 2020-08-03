import React, { FC } from "react";
import { UploadListProps, UploadFile } from "./UploadProps";
import Icon from "../Icon";
import Progress from "../Progress";

export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove, type } = props;

  const TextItem = (file: UploadFile) => {
    return (
      <li className={`upload-list-item ${type}-item`} key={file.uid}>
        <span className={`file-name file-name-${file.status}`}>
          <Icon icon="file-alt" theme="secondary" />
          {file.name}
        </span>
        <span className="file-status">
          {(file.status === "uploading" || file.status === "ready") && (
            <Icon icon="spinner" spin theme="primary" />
          )}
          {file.status === "success" && (
            <Icon icon="check-circle" theme="success" />
          )}
          {file.status === "error" && (
            <Icon icon="times-circle" theme="danger" />
          )}
        </span>
        <span className="file-actions">
          <Icon icon="times" onClick={() => onRemove(file)} />
        </span>
        {file.status === "uploading" && (
          <Progress percent={file.percent || 0} />
        )}
      </li>
    );
  };

  const PictureItem = (file: UploadFile) => {
    return (
      <li className={`upload-list-item ${type}-item`} key={file.uid}>
        {dealPictureItem(file)}
      </li>
    );
  };

  const dealPictureItem = (file: UploadFile) => {
    if (file.status === "ready") {
      return (
        <span className={`file-name file-name-${file.status}`}>
          {file.thumbnail ? (
            <img className="thumbnail" src={file.thumbnail} alt="file" />
          ) : (
            <Icon icon="file-alt" theme="secondary" size="5x" />
          )}
          <span>{file.name}</span>
        </span>
      );
    }

    const contentArr = [];
    if (file.status === "uploading") {
      contentArr.push(
        <p className={`file-name file-name-${file.status}`} key="name">
          <Icon icon="file-alt" theme="secondary" size="5x" />
          <p className="uploading-con">
            <span>{file.name}</span>
            <Progress percent={file.percent || 0} />
          </p>
        </p>
      );
    } else {
      contentArr.push(
        <span className={`file-name file-name-${file.status}`} key="name">
          {file.thumbnail ? (
            <img className="thumbnail" src={file.thumbnail} alt="file" />
          ) : (
            <Icon icon="file-alt" theme="secondary" size="5x" />
          )}
          <span>{file.name}</span>
        </span>
      );

      if (file.status === "success") {
        contentArr.push(
          <span className="file-status success-status" key="status">
            <Icon icon="check" theme="light" />
          </span>
        );
      } else if (file.status === "error") {
        contentArr.push(
          <span className="file-status danger-status" key="status">
            <Icon icon="times" theme="light" />
          </span>
        );
      }
    }
    contentArr.push(
      <span className="file-actions" key="actions">
        <Icon icon="times" onClick={() => onRemove(file)} />
      </span>
    );

    return contentArr;
  };

  return (
    <ul className="upload-list">
      {fileList.map((file) => {
        if (type === "picture") {
          return PictureItem(file);
        } else if (type === "text") {
          return TextItem(file);
        }
      })}
    </ul>
  );
};

export default UploadList;
