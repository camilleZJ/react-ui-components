/// <reference types="react" />
import { ThemeProps } from "../Icon/icon";
export declare type ProgressType = "line" | "circle";
export declare type ProgressStatus = "success" | "exception";
export interface ProgressProps {
    /** 进度百分比 */
    percent: number;
    /** 进度条高度（只在 type=line 时可用），单位 px */
    strokeHeight?: number;
    /** 是否显示进度条文字内容 */
    showText?: boolean;
    /** 进度条的样式 */
    styles?: React.CSSProperties;
    /** 进度条色彩主题 */
    theme?: ThemeProps;
    /** 进度条类型 */
    type?: ProgressType;
    /** 环形进度条画布宽度（只在 type=circle 时可用），单位 px */
    width?: number;
}
