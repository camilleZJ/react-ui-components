import React from "react";
import { storiesOf } from "@storybook/react";
import { Progress } from "./Progress";

export const defaultLineProgress = () => {
  return (
    <div className="example-con">
      <Progress percent={0} />
      <Progress percent={70} />
      <Progress percent={70} strokeHeight={20} />
      <Progress percent={100} />
    </div>
  );
};
defaultLineProgress.story = {
  name: "Progress",
};

export const defaultCircleProgress = () => {
  return (
    <div className="example-inline-con">
      <Progress percent={0} type="circle" />
      <Progress percent={30} type="circle" />
      <Progress percent={70} type="circle" />
      <Progress percent={100} type="circle" />
    </div>
  );
};
defaultCircleProgress.story = {
  name: "环形进度条",
};

export const progressWithTheme = () => {
  return (
    <>
      <div className="example-con">
        <Progress percent={70} theme="primary" />
        <Progress percent={70} theme="danger" />
        <Progress percent={70} theme="success" />
        <Progress percent={70} theme="warning" />
        <Progress percent={70} theme="secondary" />
        <Progress percent={70} theme="info" />
        <Progress percent={70} theme="dark" />
        <Progress percent={70} theme="light" />
      </div>
      <div className="example-inline-con">
        <Progress percent={70} theme="primary" type="circle" />
        <Progress percent={70} theme="danger" type="circle" />
        <Progress percent={70} theme="success" type="circle" />
        <Progress percent={70} theme="warning" type="circle" />
        <Progress percent={70} theme="secondary" type="circle" />
        <Progress percent={70} theme="info" type="circle" />
        <Progress percent={70} theme="dark" type="circle" />
        <Progress
          percent={70}
          theme="light"
          type="circle"
          //   styles={{ backgroundColor: "#ccc" }}
        />
      </div>
    </>
  );
};
progressWithTheme.story = {
  name: "不同主题的 progress",
};

storiesOf("Progress 进度条", module)
  .add("Progress", defaultLineProgress)
  .add("环形进度条", defaultCircleProgress)
  .add("不同主题的 progress", progressWithTheme);
