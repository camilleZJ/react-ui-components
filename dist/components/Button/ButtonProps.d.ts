import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
export declare type ButtonSize = "lg" | "sm";
export declare type ButtonType = "primary" | "default" | "danger" | "link";
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
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
export {};
