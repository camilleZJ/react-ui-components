import React, { ReactElement, InputHTMLAttributes } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type InputSize = "lg" | "sm";
// interface InputDefaultProps {
//   size?: InputSize;
//   disabled?: boolean;
//   prepand?: string | ReactElement;
//   append?: string | ReactElement;
//   icon?: IconProp;
// }
// type InputHtmlProps = InputDefaultProps & InputHTMLAttributes<HTMLElement>
// export type InputProps = Partial<InputHtmlProps>

//extends InputHTMLAttributes<HTMLElement>会报错，因为input本身存在size:number,此处覆盖但是类型不匹配
//解决：修改自定义的size属性名，或使用typescript的Omit来忽略input本身的size属性
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  size?: InputSize;
  disabled?: boolean;
  prepand?: string | ReactElement;
  append?: string | ReactElement;
  icon?: IconProp;
}
