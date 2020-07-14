// export { Menu as default } from "./Menu";
import { FC } from "react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import SubMenu from "./Submenu";
import { MenuProps, MenuItemProps, SubMenuProps } from "./MenuProps";

//将MenuItem封装到Menu上:Menu.Item，但是之前Menu的属性上并没有Item属性，此处处理
interface TransMenuProps {
  Item: FC<MenuItemProps>;
  SubMenu: FC<SubMenuProps>;
}

export type IMenuComponent = FC<MenuProps> & TransMenuProps;

const TransMenu = Menu as IMenuComponent;
TransMenu.Item = MenuItem; //将MenuItem封装到Menu上
TransMenu.SubMenu = SubMenu;

export default TransMenu;
