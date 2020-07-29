import { ThemeProps } from "../Icon/icon";

export interface ProgressProps {
  /** 进度百分比 */
  percent: number;
  /** 进度条高度，单位 px */
  strokeHeight?: number;
  /** 是否显示进度数值 */
  showText?: boolean;
  /** 进度条的样式 */
  styles?: React.CSSProperties;
  /** 进度条色彩主题 */
  theme?: ThemeProps;
}
