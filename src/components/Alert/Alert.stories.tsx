import React from "react";
import { action } from "@storybook/addon-actions";
// import { storiesOf } from "@storybook/react";
import { Alert } from "./Alert";

export default {
  title: "Alert 警告",
  component: Alert,
};

export const DefaultAlert = () => {
  return <Alert title="this is alert!" />;
};
DefaultAlert.story = {
  name: "Alert",
};

export const AlertWithTypes = () => {
  return (
    <>
      <Alert title="this is Success" type="success" />
      <Alert title="this is Danger!" type="danger" />
      <Alert closable={false} title="this is Warning!" type="warning" />
    </>
  );
};
AlertWithTypes.story = {
  name: "不同类型的 Alert",
};

export const AlertWithDesc = () => {
  return (
    <Alert
      title="提示标题欧亲"
      description="this is a long description"
      onClose={action("close Alert Component")}
    />
  );
};
AlertWithDesc.story = {
  name: "添加描述的 Alert",
};

export const AlertWithIcon = () => {
  return (
    <>
      <Alert title="成功提示" type="success" showIcon />
      <Alert title="消息提示" type="default" showIcon />
      <Alert title="警告提示" type="warning" showIcon />
      <Alert title="错误提示" type="danger" showIcon />

      <Alert
        title="成功提示"
        type="success"
        showIcon
        description="this is Success"
      />
      <Alert
        title="消息提示"
        type="default"
        showIcon
        description="this is Default"
      />
      <Alert
        title="警告提示"
        type="warning"
        showIcon
        description="this is Warning"
      />
      <Alert
        title="错误提示"
        type="danger"
        showIcon
        description="this is Danger"
      />
    </>
  );
};
AlertWithIcon.story = {
  name: "带有 icon 的 Alert",
};

export const AlertWithCenter = () => {
  return (
    <>
      <Alert title="消息提示" type="default" center />
      <Alert title="消息提示" type="default" showIcon center />
      <Alert
        title="消息提示"
        type="default"
        description="this is a long description"
        showIcon
        center
      />
    </>
  );
};
AlertWithCenter.story = {
  name: "文字居中的 Alert",
};

// storiesOf("Alert 警告", module)
//   .add("Alert", DefaultAlert)
//   .add("不同类型的 Alert", AlertWithTypes)
//   .add("添加描述的 Alert", AlertWithDesc)
//   .add("带有 icon 的 Alert", AlertWithIcon)
//   .add("文字居中的 Alert", AlertWithCenter);
