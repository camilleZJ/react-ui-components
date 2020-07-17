import React from "react";
import classNames from "classnames";
import { InputProps } from "./InputProps";

/**
 *
 *
 */
export const Input: React.FC<InputProps> = (props) => {
  //此处export是为了storybook使用的
  const { size, disabled, prepand, append, icon } = props;

  const classes = classNames("input-con", {});

  return (
    <div>
      <label htmlFor="input"></label>
      <input id="input" />
    </div>
  );
};

export default Input;
