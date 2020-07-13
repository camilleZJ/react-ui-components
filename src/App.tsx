import React from "react";

import { ButtonSize, ButtonType } from "./components/Button/ButtonProps";
import { Button } from "./components/Button/Button";

import Menu from "./components/Menu";

function App() {
  return (
    <article className="App">
      <section className="btn-con">
        <Button
          btnType={ButtonType.Danger}
          size={ButtonSize.Small}
          onClick={() => {
            alert("hello");
          }}
        >
          danger button
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          primary button
        </Button>
        <Button btnType={ButtonType.Link} href="www.baidu.com">
          link button
        </Button>
        <Button btnType={ButtonType.Link} href="www.baidu.com" disabled={true}>
          link button
        </Button>
        <Button disabled={true}>disabled button</Button>
      </section>

      <section className="menu-con">
        <Menu>
          <Menu.Item>default menu1</Menu.Item>
          <Menu.Item>default menu2</Menu.Item>
          <Menu.Item>default menu3</Menu.Item>
          <Menu.Item>default menu4</Menu.Item>
        </Menu>

        <Menu
          onSelect={(index) => console.log(index)}
          mode="vertical"
          defaultIndex="1"
          style={{ color: "red" }}
        >
          <Menu.Item index="2">menu1</Menu.Item>
          <Menu.Item index="3" style={{ color: "yellow" }}>
            menu2
          </Menu.Item>
          <Menu.Item index="4" disabled>
            menu3
          </Menu.Item>
          <Menu.Item index="5">menu4</Menu.Item>
        </Menu>
      </section>

      <section className="input-con"></section>
    </article>
  );
}

export default App;
