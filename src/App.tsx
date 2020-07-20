import React, { useState } from "react";
// import { ButtonSize, ButtonType } from "./components/Button/ButtonProps";
import { Button } from "./components/Button/Button";
import Menu from "./components/Menu";
import Input from "./components/Input";
import AutoComplete from "./components/AutoComplete";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Icon from "./components/Icon";

library.add(fas);

function App() {
  const [inputValue, setInputValue] = useState("lg input");

  const lakers = [
    "bradley",
    "pope",
    "cook",
    "cousins",
    "james",
    "AD",
    "green",
    "howard",
    "kuzma",
    "mcGee",
    "rando",
  ];

  const handleFetch = (query: string) => {
    const results = lakers.filter((name) => {
      return name.includes(query);
    });

    return results;
  };

  const handleSelect = (item: string) => {
    console.log("selected：" + item);
  };

  const renderOptions = (item: string) => {
    return <h2>Name: {item}</h2>;
  };

  // function appendCom() {
  //   return <button className="btn"> append</button>;
  // }

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

      <section className="input-con">
        <Input
          size="lg"
          value={inputValue}
          placeholder="please input content"
          append=".com"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Input
          size="sm"
          placeholder="sm input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Input disabled value="disabled button" prepend="https://" />
        {/* <Input placeholder="input" prepend="https://" append={appendCom()} /> */}
      </section>

      <section className="autoComplete-con">
        <AutoComplete
          fetchSuggestions={handleFetch}
          onSelect={handleSelect}
          renderOptions={renderOptions}
        />
      </section>

      <section className="upload-con"></section>
    </article>
  );
}

export default App;
