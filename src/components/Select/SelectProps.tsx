import { createContext } from "react";

export interface SelectProps {
  /** 指定默认选中的条目 可以是是字符串或者字符串数组 */
  defaultValue?: string | string[];
  /** 选择框默认文字 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否支持多选 */
  multiple?: boolean;
  /** select input 的 name 属性 */
  name?: string;
  /** 选中值发生变化时触发 */
  onChange?: (selectedValue: string, selectedValues: string[]) => void;
  /** 下拉框出现/隐藏时触发，出现则为 true，隐藏则为 false */
  onVisibleChange?: (visible: boolean) => void;
}

export interface OptionProps {
  /** 默认根据此属性值进行筛选，该值不能相同  option 唯一标识 */
  value: string;
  /** 选项的标签，若不设置则默认与 value 相同 */
  label?: string;
  /** 是否禁用该选项 */
  disabled?: boolean;
}

export interface ExOptionProps {
  index?: string;
  children?: React.ReactNode;
}

export interface OptionsContextProps {
  onSelect?: (
    value: string,
    // showTag: React.ReactNode | string,
    hasSelected: boolean
  ) => any;
  multiple?: boolean;
  selectedValues: any[];
}

export const SelectContext = createContext<OptionsContextProps>({
  selectedValues: [],
});
