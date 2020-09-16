import { FC } from "react";
import { MenuProps, MenuItemProps, SubMenuProps } from "./MenuProps";
interface TransMenuProps {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
}
export declare type IMenuComponent = FC<MenuProps> & TransMenuProps;
declare const TransMenu: IMenuComponent;
export default TransMenu;
