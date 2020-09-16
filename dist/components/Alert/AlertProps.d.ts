import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ThemeProps } from "../Icon/icon";
export declare type AlertType = "success" | "default" | "danger" | "warning";
export interface AlertProps {
    /** 标题，必选参数 */
    title: string;
    /** 描述 */
    description?: string;
    /** 类型 四种可选 针对四种不同的场景 */
    type?: AlertType;
    /** 关闭alert时触发的事件 */
    onClose?: () => void;
    /** 是否显示关闭图标 */
    closable?: boolean;
    /** 是否显示图标 */
    showIcon?: boolean;
    /** 文字是否居中 */
    center?: boolean;
}
interface IconConfigItem {
    icon: IconProp;
    theme?: ThemeProps;
}
export declare const AlertIconInfo: {
    [key: string]: IconConfigItem;
};
export {};
