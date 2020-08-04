import React from "react";
import { action } from "@storybook/addon-actions";

//注意以下组件一定要双重export，否则storybook读取不到props，会显示：No propTypes defined!
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import Submenu from "./Submenu";

export default {
  title: "Menu 导航菜单",
  component: Menu,
};

export const defaultMenu = () => {
  return (
    <Menu defaultIndex="0" onSelect={action("clicked")}>
      <MenuItem>Navigation One</MenuItem>
      <MenuItem disabled>disabled Navigation</MenuItem>
      <Submenu title="Navigation-Submenu">
        <MenuItem>Navigation Three-One</MenuItem>
        <MenuItem disabled>disabled Navigation Three-Two</MenuItem>
      </Submenu>
      <MenuItem>Navigation Two</MenuItem>
    </Menu>
  );
};
defaultMenu.story = {
  name: "Menu", //和export default导出组件同名才能显示组件的注释说明
};

export const verticalMenu = () => {
  return (
    <Menu defaultIndex="0" onSelect={action("clicked")} mode="vertical">
      <MenuItem>Navigation One</MenuItem>
      <MenuItem disabled>disabled Navigation</MenuItem>
      <Submenu title="Navigation-Submenu">
        <MenuItem>Navigation Three-One</MenuItem>
        <MenuItem disabled>disabled Navigation Three-Two</MenuItem>
      </Submenu>
      <MenuItem>Navigation Two</MenuItem>
    </Menu>
  );
};
verticalMenu.story = {
  name: "垂直 Menu",
};

export const defaultOpenVerticalMenu = () => {
  return (
    <Menu
      defaultIndex="0"
      onSelect={action("clicked")}
      mode="vertical"
      defaultOpenSubMenus={["2"]}
    >
      <MenuItem>Navigation One</MenuItem>
      <MenuItem disabled>disabled Navigation</MenuItem>
      <Submenu title="Navigation-Submenu">
        <MenuItem>Navigation Three-One</MenuItem>
        <MenuItem disabled>disabled Navigation Three-Two</MenuItem>
      </Submenu>
      <MenuItem>Navigation Two</MenuItem>
    </Menu>
  );
};
defaultOpenVerticalMenu.story = {
  name: "默认展开 垂直 Menu",
};
