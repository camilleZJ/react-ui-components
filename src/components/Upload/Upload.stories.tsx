import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { Upload } from "./Upload";
import { UploadFile } from "./UploadProps";

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
    />
  );
};
// SimpleUpload.story = {
//   name: "Upload",
// };

export const checkFileSizeUpload = () => {
  return (
    <Upload
      action="https://run.mocky.io/v3/8030edf2-b85e-4866-baca-1374302140e9"
      onChange={action("Changed:")}
      beforeUpload={checkFileSize}
      //   beforeUpload={renameUploadFile}
    />
  );
};
// checkFileSizeUpload.story={
//     name: "上传前检查文件大小"
// }

export const uploadWithDefaultUploadList = () => {
  return (
    <Upload
      action="https://run.mocky.io/v3/8030edf2-b85e-4866-baca-1374302140e9"
      defaultFileList={defaultFileList}
      onRemove={action("removed")}
      onChange={action("Changed:")}
    />
  );
};
// uploadWithDefaultUploadList.story={
//     name:"带有默认上传列表的 Upload"
// }

storiesOf("Upload 上传", module)
  .add("Upload", SimpleUpload)
  .add("上传前检查文件大小", checkFileSizeUpload)
  .add("带有默认上传列表的 Upload", uploadWithDefaultUploadList);

// export default {
//   title: "Upload 上传",
//   component: Upload,
// };
