import React, { FC } from "react";
import classNames from "classnames";
import { InputProps } from "./InputProps";
import Icon from "../Icon";

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * import { Input } from 'antd-components';
 * ~~~
 *
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: FC<InputProps> = (props) => {
  //此处export是为了storybook使用的
  // const [inputValue, setInputValue] = useState(value);

  const { size, disabled, prepend, append, icon, style, ...restProps } = props;
  const cnames = classNames("input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });

  //非受控组件转为受控组件：值有组件的state管理，从undefined变为有意思的值会报错
  //报错：A component is changing an uncontrolled input of type undefined to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa).
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }

    return value;
  };
  if ("value" in props) {
    //value和defaultValue不允许同时存在
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  return (
    <div className={cnames} style={style}>
      {prepend && <div className="input-group-prepend-con">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input className="input-inner" disabled={disabled} {...restProps} />
      {append && <div className="input-group-append-con">{append}</div>}
    </div>
  );
};

export default Input;
