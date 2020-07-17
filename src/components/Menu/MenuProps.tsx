import { CSSProperties, createContext } from "react";

//Menu FC
export type MenuMode = "horizontal" | "vertical";
export type selectFunc = (selectedIndex: string) => void;
export interface MenuProps {
  //ul标签一般只用到class、style属性
  /**自定义类名 */
  className?: string;
  /**菜单类型 横向或者纵向 */
  mode?: MenuMode;
  /**默认 active 的菜单项的索引值 */
  defaultIndex?: string;
  /**点击菜单项触发的回掉函数 */
  onSelect?: selectFunc;
  /**自定义样式 */
  style?: CSSProperties;
  // children?: React.ReactNode; //默认有这个属性设置
  /**设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
}

//Menu context
export interface IMenuContext {
  index: string;
  onSelect?: selectFunc;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const menuContext = createContext<IMenuContext>({
  index: "0",
});

//MenuItem FC
export interface MenuItemProps {
  /**item 的唯一标志 */
  index?: string;
  /**是否禁用 */
  disabled?: boolean;
  /**自定义类名 */
  className?: string;
  /**自定义样式 */
  style?: CSSProperties;
  // children?: React.ReactNode; //默认有这个属性设置
}

//SubMenu FC
export interface SubMenuProps {
  /**子菜单项值 */
  title?: string;
  /**item 的唯一标志 */
  index?: string;
  /**自定义类名 */
  className?: string;
  /**自定义样式 */
  style?: CSSProperties;
}
