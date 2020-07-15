import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

export type ButtonSize = "lg" | "sm";
export type ButtonType = "primary" | "default" | "danger" | "link";
// export enum ButtonSize {
//   Large = "lg",
//   Small = "sm",
// }

// export enum ButtonType {
//   Primary = "primary",
//   Default = "default",
//   Danger = "danger",
//   Link = "link",
// }

//组件可以设置的属性
interface BaseButtonProps {
  /** 自定义类名 */
  className?: string;
  children?: React.ReactNode;
  /** 当btnType为link时，必填 */
  href?: string;
  /** 设置 Button 的类型 */
  btnType?: ButtonType;
  /** 设置 Button 的尺寸 */
  size?: ButtonSize;
  /** 设置 Button 的禁用 */
  disabled?: boolean;
}

//button标签原生的html属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
//连接a元素的html属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
//设置这些属性为可选属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
