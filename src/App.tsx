import React from "react";
// import { ButtonSize, ButtonType } from "./components/Button/ButtonProps";
import { Button } from "./components/Button/Button";
import Menu from "./components/Menu";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Icon from "./components/Icon";

library.add(fas);

function App() {
  return (
    <article className="App">
      <Icon icon="angle-down" theme="primary" size="6x" />

      <section className="btn-con">
        <Button
          btnType="danger"
          size="sm"
          onClick={() => {
            alert("hello");
          }}
        >
          danger button
        </Button>
        <Button btnType="primary" size="lg">
          primary button
        </Button>
        <Button btnType="link" href="www.baidu.com">
          link button
        </Button>
        <Button btnType="link" href="www.baidu.com" disabled={true}>
          link button
        </Button>
        <Button disabled={true}>disabled button</Button>
      </section>

      <section className="menus-con">
        <Menu>
          <Menu.Item>default menu1</Menu.Item>
          <Menu.Item disabled>default menu2</Menu.Item>
          <Menu.SubMenu title="sub-menu">
            <Menu.Item>default menu3-1</Menu.Item>
            <Menu.Item>default menu3-2</Menu.Item>
            <Menu.Item>default menu3-3</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item>default menu4</Menu.Item>
        </Menu>

        <Menu
          onSelect={(index) => console.log(index)}
          mode="vertical"
          defaultIndex="1"
          defaultOpenSubMenus={["3", "5"]}
          // style={{ color: "red" }}
        >
          <Menu.Item>menu1</Menu.Item>
          <Menu.Item>menu2</Menu.Item>
          <Menu.Item disabled>menu3</Menu.Item>
          <Menu.SubMenu title="sub-menu">
            <Menu.Item>menu5-1</Menu.Item>
            <Menu.Item disabled>menu5-2</Menu.Item>
            <Menu.Item>menu5-3</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item>menu6</Menu.Item>
          <Menu.SubMenu title="sub-menu">
            <Menu.Item>menu7-1</Menu.Item>
            <Menu.Item>menu7-2</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </section>

      <section className="input-con"></section>
    </article>
  );
}

export default App;
