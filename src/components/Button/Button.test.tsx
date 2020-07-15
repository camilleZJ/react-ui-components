import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./index";
import { ButtonProps } from "./ButtonProps";

// test("our first react test case", () => {
//   //it和test都可以，都是测试用例的意思
//   const wrapper = render(<Button>Button</Button>);
//   const element = wrapper.queryByText("Button");
//   //   expect(element).toBeTruthy();
//   expect(element).toBeInTheDocument(); //组件是否在文档中即是否渲染出来
// });

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: "class",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("test Button component", () => {
  it("should render the correct default button", () => {
    const wrapper = render(<Button {...defaultProps}>button</Button>);
    const element = wrapper.getByText("button") as HTMLButtonElement; //as HTMLButtonElement目的：为了获取element.tag或了获取中tagName属性
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("should render the correct component based on different props", () => {
    const wrapper = render(<Button {...testProps}>button</Button>);
    const element = wrapper.getByText("button");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn-primary btn-lg class");
  });

  it("should render a link when btnType equals link and href is provided", () => {
    const wrapper = render(
      <Button btnType="link" href="http://www.baidu.com/">
        Link
      </Button>
    );
    const element = wrapper.getByText("Link") as HTMLAnchorElement; //as HTMLAnchorElement目的：element.href获取href属性
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn btn-link");
    expect(element.tagName).toEqual("A");
    expect(element).toHaveAttribute("href");
    expect(element.href).toEqual("http://www.baidu.com/");
  });

  it("should render disabled button when disabled set to true", () => {
    const { getByText } = render(
      <Button {...disabledProps}>disabled button</Button>
    );
    const element = getByText("disabled button") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    // expect(element).toHaveAttribute("disabled");
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
