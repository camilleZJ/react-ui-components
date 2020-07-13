import { CSSProperties, createContext } from "react";

//Menu FC
export type MenuMode = "horizontal" | "vertical";
export type selectFunc = (selectedIndex: string) => void;
export interface MenuProps {
  //ul标签一般只用到class、style属性

  className?: string;
  mode?: MenuMode;
  defaultIndex?: string;
  onSelect?: selectFunc;
  style?: CSSProperties;
  // children?: React.ReactNode; //默认有这个属性设置
}

//Menu context
export interface IMenuContext {
  index: string;
  onSelect?: selectFunc;
  // mode?: MenuMode;
  // defaultOpenSubMenus?: string[];
}

export const menuContext = createContext<IMenuContext>({
  index: "0",
});

//MenuItem FC
export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  // children?: React.ReactNode; //默认有这个属性设置
}

//SubMenu FC
export interface SubMenuProps {
  title?: string;
  index?: string;
  className?: string;
  style?: CSSProperties;
}
