import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Input from "./index";

export default {
  title: "Input 输入框",
  component: Input,
};

const ControlledInput = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <Input
      value={inputValue}
      defaultValue={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export const DefaultInput = () => {
  return (
    <Input
      style={{ width: "300px" }}
      onChange={action("changed")}
      placeholder="default input"
    />
  );
};
DefaultInput.story = {
  name: "Input",
};

export const disabledInput = () => {
  return (
    <Input style={{ width: "300px" }} placeholder="disabled input" disabled />
  );
};
disabledInput.story = {
  name: "被禁用的 Input",
};

export const iconInput = () => {
  return (
    <Input
      placeholder="input with icon"
      style={{ width: "300px" }}
      icon="search"
    />
  );
};
iconInput.story = {
  name: "带图标的 Input",
};

export const sizeInput = () => {
  return (
    <>
      <Input placeholder="large size" style={{ width: "300px" }} size="lg" />
      <Input placeholder="small size" style={{ width: "300px" }} size="sm" />
    </>
  );
};
sizeInput.story = {
  name: "不同尺寸的 Input",
};

export const pendInput = () => {
  return (
    <>
      <Input
        placeholder="input with prepend text"
        style={{ width: "300px" }}
        prepend="https://"
      />
      <Input
        placeholder="input with append text"
        style={{ width: "300px" }}
        append=".com"
      />
    </>
  );
};
pendInput.story = {
  name: "带前后缀的 Input",
};
