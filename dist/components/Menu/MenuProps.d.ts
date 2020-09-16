import { CSSProperties } from "react";
export declare type MenuMode = "horizontal" | "vertical";
export declare type selectFunc = (selectedIndex: string) => void;
export interface MenuProps {
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
    /**设置子菜单的默认打开 只在纵向模式下生效 */
    defaultOpenSubMenus?: string[];
}
export interface IMenuContext {
    index: string;
    onSelect?: selectFunc;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const menuContext: import("react").Context<IMenuContext>;
export interface MenuItemProps {
    /**item 的唯一标志 */
    index?: string;
    /**是否禁用 */
    disabled?: boolean;
    /**自定义类名 */
    className?: string;
    /**自定义样式 */
    style?: CSSProperties;
}
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
