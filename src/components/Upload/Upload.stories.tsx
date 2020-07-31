import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { Upload } from "./Upload";
import { UploadFile } from "./UploadProps";
import Icon from "../Icon";
import Button from "../Button";

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    //>50kb
    alert("file too big");
    return false;
  }

  return true;
};

// const renameUploadFile = (file: File) => {
//   const newFile = new File([file], "new_name.docx", { type: file.type });
//   return Promise.resolve(newFile);
// };

const defaultFileList: UploadFile[] = [
  {
    uid: "123",
    size: 1234,
    name: "hello.md",
    status: "uploading",
    percent: 30,
  },
  { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
  { uid: "121", size: 1234, name: "eyiha.md", status: "error", percent: 30 },
];

export const SimpleUpload = () => {
  return (
    <Upload
      action="https://run.mocky.io/v3/8030edf2-b85e-4866-baca-1374302140e9"
      onProgress={action("Progress:")}
      onSuccess={action("Success:")}
      onError={action("Error:")}
      onRemove={action("removed")}
      name="fileName"
      data={{ key: "value" }}
      headers={{ "X-Powered-By": "Camille" }}
      multiple
    >
      <Button btnType="primary">click to upload</Button>
    </Upload>
  );
};
SimpleUpload.story = {
  name: "Upload",
};

export const checkFileSizeUpload = () => {
  return (
    <Upload
      action="https://run.mocky.io/v3/8030edf2-b85e-4866-baca-1374302140e9"
      onChange={action("Changed:")}
      beforeUpload={checkFileSize}
      accept={".jpg"}
      //   beforeUpload={renameUploadFile}
    >
      <Button btnType="primary">不能传大于50Kb！</Button>
      <p>只能上传jpg文件，且不超过50kb</p>
    </Upload>
  );
};
checkFileSizeUpload.story = {
  name: "上传前检查文件大小",
};

export const uploadWithDefaultUploadList = () => {
  return (
    <Upload
      action="https://run.mocky.io/v3/8030edf2-b85e-4866-baca-1374302140e9"
      defaultFileList={defaultFileList}
      onRemove={action("removed")}
      onChange={action("Changed:")}
    >
      <Button btnType="primary">click to upload</Button>
    </Upload>
  );
};
uploadWithDefaultUploadList.story = {
  name: "带有默认上传列表的 Upload",
};

export const uploadWidthPreview = () => {
  return (
    <Upload action="https://run.mocky.io/v3/8030edf2-b85e-4866-baca-1374302140e9" >
      <Button btnType="primary">click to upload</Button>
    </Upload>
  );
};
uploadWidthPreview.story = {
  name: "缩略图列表",
};

export const dragToUpload = () => {
  return (
    <Upload
      action="https://run.mocky.io/v3/8030edf2-b85e-4866-baca-1374302140e9"
      name="fileName"
      multiple
      drag
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>点击或者拖动到此区域进行上传</p>
    </Upload>
  );
};
dragToUpload.story = {
  name: "拖动上传",
};

export default {
  title: "Upload 上传",
  component: Upload,
};

// storiesOf("Upload 上传", module)
//   .add("Upload", SimpleUpload)
//   .add("上传前检查文件大小", checkFileSizeUpload)
//   .add("带有默认上传列表的 Upload", uploadWithDefaultUploadList)
//   .add("缩略图列表", uploadWidthPreview)
//   .add("拖动上传", dragToUpload);
