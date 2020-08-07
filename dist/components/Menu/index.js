import Menu from "./Menu";
import MenuItem from "./MenuItem";
import SubMenu from "./Submenu";
var TransMenu = Menu;
TransMenu.Item = MenuItem; //将MenuItem封装到Menu上
TransMenu.SubMenu = SubMenu;
export default TransMenu;
