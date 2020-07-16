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

const testProps: MenuProps = {
  defaultIndex: "1",
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: MenuProps = {
  defaultIndex: "1",
  mode: "vertical",
};

const GenerateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index="1">active menu</MenuItem>
      <MenuItem index="2" disabled>
        disabled menu
      </MenuItem>
      <MenuItem index="3">normal menu</MenuItem>
    </Menu>
  );
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElment: HTMLElement;

describe("test Menu and MenuItem component in default(horizontal) mode", () => {
  //beforeEach每个测试用例执行之前执行的函数，可以把测试用例里公共的部分提取出来
  beforeEach(() => {
    wrapper = render(GenerateMenu(testProps));
    menuElement = wrapper.getByTestId("test-menu"); //获取data-testid="test-menu"所在的元素
    //或wrapper.container.getElementsByClassName  //wrapper.container是htmlElement，之后就可以调用如getElementsByClassName等
    activeElement = wrapper.getByText("active menu");
    disabledElment = wrapper.getByText("disabled menu");
  });

  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu-con test");
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);

    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElment).toHaveClass("menu-item is-disabled");
    // expect(disabledElment).toHaveAttribute("disabled");
  });

  it("click items should change active and call the right callback", () => {
    const thirdItem = wrapper.getByText("normal menu");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith(3); //回调函数接受参数3并被调用

    fireEvent.click(disabledElment);
    expect(disabledElment).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenNthCalledWith(2);
  });

  it("should show dropdown items when hover on subMenu", () => {});
  it("test Menu and MenuItem component in vertical mode", () => {});

  it("should render vertical mode when mode is set to vertical", () => {
    // cleanup();  //beforeEach中已经定义了wrapper，此处又定义了wrapper会报错，所以先cleanup()
    //那么在不同的测试用例之间为什么没有报错，是因为react testing library在每个测试用例结束后都会调用cleanup()清理干净

    // const wrapper = render(GenerateMenu(testVerProps));
    // expect(wrapper).toBeInTheDocument();
    // expect(wrapper).toHaveClass("mode-vertical");
  });

  it("should show dropdown items when click on subMenu for vertical mode", () => {});
  it("should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index", () => {});
});
