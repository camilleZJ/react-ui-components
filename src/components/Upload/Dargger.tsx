import React, { FC, useState, DragEvent } from "react";
import classNames from "classnames";
import { DraggerProps } from "./UploadProps";

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);
  const classes = classNames("uploader-dragger", {
    "is-dragger": dragOver,
  });

  const handleDrag = (event: DragEvent<HTMLElement>, over: boolean) => {
    event.preventDefault();
    setDragOver(over);
  };

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setDragOver(false);
    // console.log("dataTansfer: ", event.dataTransfer);

    onFile(event.dataTransfer.files);
  };

  return (
    <div
      className={classes}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
