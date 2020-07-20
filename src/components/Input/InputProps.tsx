import { ReactElement, InputHTMLAttributes } from "react";
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
  /**设置 input 大小，支持 lg 或 sm */

  size?: InputSize;
  /**是否禁用 Input */
  disabled?: boolean;
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;  //HTMLInputElement，若是HTMLElement则拿不到event.target.value的value
}
