import React from "react";
import {
  render,
  RenderResult,
  wait,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import Select from "./Select";
import Option from "./Option";
import { SelectProps, OptionProps } from "./SelectProps";

jest.mock("../Icon/icon.tsx", () => {
  return ({ icon, onClick }) => {
    return <span onClick={onClick}>{icon}</span>;
  };
});

const defaultProps: SelectProps = {
  placeholder: "请选择",
  name: "select-name",
  multiple: false,
  disabled: false,
  onVisibleChange: jest.fn(),
};

const disabledProps: SelectProps = {
  placeholder: "请选择",
  name: "select-name",
  disabled: true,
};

const testProps: SelectProps = {
  placeholder: "请选择",
  name: "select-name",
  defaultValue: ["chengdu", "beijing"],
  multiple: false,
  disabled: false,
};

const multipleProps: SelectProps = {
  placeholder: "请选择",
  name: "select-name",
  multiple: true,
  disabled: false,
  onChange: jest.fn(),
};

const GenerateSelect = (props: SelectProps) => {
  return (
    <Select {...props}>
      <Option value="shanghai" />
      <Option value="beijing" />
      <Option value="chendu" />
      <Option value="shenzhen" disabled />
    </Select>
  );
};

const createStyleFile = () => {
  const cssFile = `
     .select-dropdown {
         display: none;
     }   
    
    .menu-is-open .select-dropdown {
        display: block;
    }   
    `;

  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;

  return style;
};

let wraper: RenderResult,
  inputElement: HTMLInputElement,
  selectConElement: HTMLElement;
describe("test Select component", () => {
  beforeEach(() => {
    wraper = render(GenerateSelect(defaultProps));
    wraper.container.append(createStyleFile());
    inputElement = wraper.queryByPlaceholderText("请选择") as HTMLInputElement;
    selectConElement = wraper.container.querySelector(
      ".select-con"
    ) as HTMLElement;
  });

  it("should render the correct default select", () => {
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveFocus();
    expect(inputElement).toHaveAttribute("readonly");
    expect(inputElement.name).toEqual("select-name");

    fireEvent.click(inputElement);
    expect(selectConElement).toHaveClass("menu-is-open");
    const dropdown = wraper.getByText("shanghai").parentElement as HTMLElement;
    expect(dropdown).toBeInTheDocument();
    expect(dropdown.querySelectorAll(":scope >li").length).toEqual(4);
    expect(wraper.getByText("shenzhen")).toHaveClass("is-disabled");
    expect(defaultProps.onVisibleChange).toHaveBeenCalledWith(true);

    const selectElement = wraper.getByText("chendu");
    fireEvent.click(selectElement);
    expect(selectElement).toHaveClass("is-selected");
    expect(dropdown).not.toBeInTheDocument();
    expect(selectConElement).not.toHaveClass("menu-is-open");
    expect(inputElement.value).toEqual("chendu");
    expect(defaultProps.onVisibleChange).toHaveBeenCalledWith(false);
  });

//   it("should render correct select when select is set to disabled", () => {
//     cleanup();
//     wraper = render(GenerateSelect(disabledProps));
//     inputElement = wraper.queryByPlaceholderText("请选择") as HTMLInputElement;
//     selectConElement = wraper.container.querySelector(
//       ".select-con"
//     ) as HTMLElement;

//     expect(selectConElement).toHaveClass("is-disabled");
//     expect(inputElement).toHaveAttribute("disabled");
//     fireEvent.click(inputElement);
//     expect(wraper.getByText("shanghai")).not.toBeInTheDocument();
//   });

  it("should render correct select width default values", () => {
    wraper = render(GenerateSelect(defaultProps));
  });

  it("should render correct select when select is set to multiple", () => {
    // "is-multiple": multiple,
  });
});
