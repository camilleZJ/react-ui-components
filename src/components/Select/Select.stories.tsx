import React from "react";
import { action } from "@storybook/addon-actions";
import { Select } from "./Select";
import { Option } from "./Option";

export default {
  title: "Select 选择器",
  component: Select,
};

export const defaultSelect = () => {
  return (
    <Select
      onVisibleChange={action("onVisibleChange")}
      onChange={action("onChange")}
      name="foots"
      placeholder="请选择你欢喜的食物"
    >
      <Option value="选项1">黄金糕</Option>
      <Option value="选项2">双皮奶</Option>
      <Option value="选项3" disabled>
        蚵仔煎
      </Option>
      <Option value="龙须面" />
      <Option value="选项5" label="北京烤鸭" />
    </Select>
  );
};
defaultSelect.story = {
  name: "Select",
};

export const DisabledSelect = () => {
  return (
    <Select disabled placeholder="禁用啦！">
      <Option value="shanghai" label="上海" />
      <Option value="chengdu" label="成都" />
      <Option value="beijing" label="北京" />
    </Select>
  );
};
DisabledSelect.story = {
  name: "被禁用的 Select",
};

export const MultipleSelect = () => {
  return (
    <Select
      multiple
      name="multiple-select"
      placeholder="支持多选哦！"
      onVisibleChange={action("onVisibleChange")}
      onChange={action("onChange")}
    >
      <Option value="选项1">黄金糕</Option>
      <Option value="选项2">双皮奶</Option>
      <Option value="选项3" disabled>
        蚵仔煎
      </Option>
      <Option value="龙须面" />
      <Option value="选项5" label="北京烤鸭" />
    </Select>
  );
};
MultipleSelect.story = {
  name: "支持多选的 Select",
};
