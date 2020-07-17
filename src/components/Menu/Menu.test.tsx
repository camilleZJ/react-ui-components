import React from "react";
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
  wait,
} from "@testing-library/react";
import Menu from "./Menu";
import Submenu from "./Submenu";
import MenuItem from "./MenuItem";
import { MenuProps } from "./MenuProps";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
  defaultOpenSubMenus: ["4"],
};

const GenerateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active menu</MenuItem>
      <MenuItem disabled>disabled menu</MenuItem>
      <MenuItem>normal menu</MenuItem>
      <Submenu title="dropdown">
        <MenuItem>hide submenu 1</MenuItem>
      </Submenu>
      <Submenu title="opened">
        <MenuItem>opened submenu 1</MenuItem>
      </Submenu>
    </Menu>
  );
};

let wrapper: RenderResult,
  wrapper2: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElment: HTMLElement;

const createStyleFile = () => {
  const cssFile: string = `
    .submenu-con {
      display: none;
    }
  
    .submenu-con.menu-opened {
      display: block;
    }
  `;

  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

describe("test Menu and MenuItem component in default(horizontal) mode", () => {
  //beforeEach每个测试用例执行之前执行的函数，可以把测试用例里公共的部分提取出来
  beforeEach(() => {
    wrapper = render(GenerateMenu(testProps));
    wrapper.container.append(createStyleFile()); //为引入css样式，测试只是部分需要没必要都导入，这里插入style标签插入部分样式
    menuElement = wrapper.getByTestId("test-menu"); //获取data-testid="test-menu"所在的元素
    //或wrapper.container.getElementsByClassName  //wrapper.container是htmlElement，之后就可以调用如getElementsByClassName等
    activeElement = wrapper.getByText("active menu");
    disabledElment = wrapper.getByText("disabled menu");
  });

  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu-con test");

    // expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    //:scope 属于 CSS 伪类，它表示作为选择器要匹配的参考点的元素。
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(5); //这里的:scope指menuElement本身

    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElment).toHaveClass("menu-item is-disabled");
  });

  it("click items should change active and call the right callback", () => {
    const thirdItem = wrapper.getByText("normal menu");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("2"); //回调函数接受参数2并被调用

    fireEvent.click(disabledElment);
    expect(disabledElment).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenNthCalledWith(1);
  });

  it("should show dropdown items when hover on subMenu", async () => {
    const dropdownItemElement = wrapper.queryByText("hide submenu 1");
    expect(dropdownItemElement).not.toBeVisible(); //display:none

    const dropdownElement = wrapper.getByText("dropdown");
    // expect(dropdownElement.parentNode).toBeInTheDocument();
    fireEvent.mouseEnter(dropdownElement);
    // expect(dropdownItemElement).toBeVisible();  //源代码中mouseEnter触发的代码：setTimeout(() => {setOpen(toggle);}, 300);断言是立马执行的  不会等300ms。所以received的结果是not visible
    //所以采用async await+wait，react-testing-lirary的wait解决异步问题
    await wait(() => {
      expect(dropdownItemElement).toBeVisible();
    });
    const ItemElement = wrapper.getByText("hide submenu 1");
    fireEvent.click(ItemElement); //注意：queryByText和getByText区别
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0");

    fireEvent.mouseLeave(dropdownElement);
    await wait(() => {
      expect(dropdownItemElement).not.toBeVisible();
    });
  });
});

describe("test Menu and MenuItem component in vertical mode", () => {
  beforeEach(() => {
    wrapper2 = render(GenerateMenu(testVerProps));
    wrapper2.container.append(createStyleFile());
  });

  it("should render vertical mode when mode is set to vertical", () => {
    //beforeEach中已经定义了wrapper，此处又定义了wrapper会报错，所以先cleanup()
    //那么在不同的测试用例之间为什么没有报错，是因为react testing library在每个测试用例结束后都会调用cleanup()清理干净
    // cleanup();
    // const wrapper = render(GenerateMenu(testVerProps));

    const element = wrapper2.getByTestId("test-menu");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("mode-vertical");
  });

  it("should show dropdown items when click on subMenu for vertical mode", () => {
    const itemElement = wrapper2.queryByText("hide submenu 1");
    expect(itemElement).not.toBeVisible();

    const dropdownTitle = wrapper2.getByText("dropdown");
    fireEvent.click(dropdownTitle);
    expect(itemElement).toBeVisible();
  });

  it("should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index", () => {
    expect(wrapper2.queryByText("opened submenu 1")).toBeVisible();
  });
});
