import React, { FC, HTMLAttributes, AnchorHTMLAttributes } from "react";
import classnames from "classnames";

interface BaseButtonProps {
  className?: string;
  /** 设置 Botton 的禁用 */
  disabled?: boolean;
  /** 设置 Botton 的尺寸 */
  size?: string;
  /** 设置 Botton 的类型 */
  btnType?: string;
  children?: React.ReactNode;
  href?: string;
}

//##：高亮   ~~~js ..js代码..~~~
/**
 * 这是我们的第一个 Button 组件
 * ## Button Header
 * ~~~js
 * import {Button} from 'vikingship'
 * ~~~
 */
export const Button: FC<BaseButtonProps> = (props) => {
  const cla = classnames({
    size: props.size,
  });

  return (
    <button className={cla} type="button" onClick={() => {}}>
      button
    </button>
  );
};

export default Button;
