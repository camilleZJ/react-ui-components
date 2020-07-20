import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Input from "./index";

export default {
  title: "Input 输入框",
  component: Input,
};

export const defaultInput = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
  );
};
defaultInput.story = {
  name: "Input",
};
