import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import Select from "./Select";
import Option from "./Option";
import { SelectProps } from "./SelectProps";

// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// library.add(fas);
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
  multiple: true,
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
      <Option value="chengdu" />
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

    expect(
      wraper.container.querySelector(".select-dropdown")
    ).not.toBeInTheDocument();

    fireEvent.click(inputElement);
    expect(selectConElement).toHaveClass("menu-is-open");
    const dropdown = wraper.getByText("shanghai").parentElement as HTMLElement;
    expect(dropdown).toBeInTheDocument();
    expect(dropdown.querySelectorAll(":scope >li").length).toEqual(4);
    expect(wraper.getByText("shenzhen")).toHaveClass("is-disabled");
    expect(defaultProps.onVisibleChange).toHaveBeenCalledWith(true);

    const selectElement = wraper.getByText("chengdu");
    fireEvent.click(selectElement);
    expect(selectElement).toHaveClass("is-selected");
    expect(selectConElement).not.toHaveClass("menu-is-open");
    expect(dropdown).not.toBeVisible();
    expect(inputElement.value).toEqual("chengdu");
    expect(defaultProps.onVisibleChange).toHaveBeenCalledWith(false);
  });

  it("should render correct select when select is set to disabled", () => {
    cleanup();
    wraper = render(GenerateSelect(disabledProps));
    inputElement = wraper.queryByPlaceholderText("请选择") as HTMLInputElement;
    selectConElement = wraper.container.querySelector(
      ".select-con"
    ) as HTMLElement;

    expect(selectConElement).toHaveClass("is-disabled");
    expect(inputElement).toHaveAttribute("disabled");
    fireEvent.click(inputElement);
    expect(
      wraper.container.querySelector(".select-dropdown")
    ).not.toBeInTheDocument();
  });

  it("should render correct select width default values", () => {
    cleanup();
    wraper = render(GenerateSelect(testProps));
    inputElement = wraper.container.querySelector(
      "input[name='select-name']"
    ) as HTMLInputElement;
    selectConElement = wraper.container.querySelector(
      ".select-con"
    ) as HTMLElement;

    expect(inputElement.value).toEqual("");
    expect(inputElement.placeholder).toEqual("");

    const tagsConElement = wraper.container.querySelector(".selected-tags-con");
    expect(tagsConElement).toBeInTheDocument();
    expect(tagsConElement?.children.length).toEqual(2);

    fireEvent.click(inputElement);
    const dropdown = wraper.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
    // expect(
    //   wraper.container.querySelector(".select-dropdown")
    // ).toBeInTheDocument();
    // const liEle = wraper.getByText("chengdu");
    // expect(liEle).toHaveClass("is-selected");
    // expect(wraper.getByText("beijing")).toHaveClass("is-selected");
    const nodes = dropdown.getElementsByClassName("is-selected");
    expect(nodes.length).toEqual(2);
    expect(nodes[0].textContent).toContain("beijing");
    expect(nodes[1].textContent).toContain("chengdu");

    fireEvent.click(nodes[0]);
    expect(dropdown).toBeInTheDocument();
    const newNodes = dropdown.getElementsByClassName("is-selected");
    expect(newNodes.length).toEqual(1);
    expect(newNodes[0].textContent).toContain("chengdu");
    expect(tagsConElement?.children.length).toEqual(1);
  });

  it("should render correct select when select is set to multiple", () => {
    cleanup();
    wraper = render(GenerateSelect(multipleProps));
    inputElement = wraper.container.querySelector(
      "input[name='select-name']"
    ) as HTMLInputElement;
    selectConElement = wraper.container.querySelector(
      ".select-con"
    ) as HTMLElement;

    expect(selectConElement).toHaveClass("is-multiple");

    const tagsConElement = wraper.container.querySelector(".selected-tags-con");
    expect(tagsConElement).toBeInTheDocument();
    expect(tagsConElement?.children.length).toEqual(0);

    fireEvent.click(inputElement);
    const dropdown = wraper.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown.getElementsByClassName(".is-selected").length).toEqual(0);

    const ele1 = dropdown.children[0];
    const ele2 = dropdown.children[1];
    //add
    fireEvent.click(ele1);
    expect(ele1).toHaveClass("is-selected");
    expect(multipleProps.onChange).toHaveBeenCalledWith("shanghai", [
      "shanghai",
    ]);
    fireEvent.click(ele2);
    expect(ele2).toHaveClass("is-selected");
    expect(tagsConElement?.children.length).toEqual(2);

    //delete
    fireEvent.click(ele1);
    expect(ele1).not.toHaveClass("is-selected");
    expect(multipleProps.onChange).toHaveBeenCalledWith("shanghai", [
      "shanghai",
    ]);
    expect(tagsConElement?.children.length).toEqual(1);

    fireEvent.click(wraper.getByText("times"));
    expect(tagsConElement?.children.length).toEqual(0);
    expect(dropdown.getElementsByClassName(".is-selected").length).toEqual(0);
  });
});
