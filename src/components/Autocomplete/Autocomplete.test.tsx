import React from "react";
import { config } from "react-transition-group";
import { render, RenderResult, fireEvent, wait } from "@testing-library/react";
import Autocomplete from "./Autocomplete";
import { AutocompleteProps } from "./AutocompleteProps";

config.disabled = true; //设置为true=》所有的异步性都会变为同步，即直接发生所以会感受不到动画

const testArray = [
  { value: "ab", number: 11 },
  { value: "abc", number: 1 },
  { value: "b", number: 4 },
  { value: "c", number: 15 },
];
const testProps: AutocompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};

let wrapper: RenderResult, inputNode: HTMLInputElement;
describe("", () => {
  beforeEach(() => {
    wrapper = render(<Autocomplete {...testProps} />);
    inputNode = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
  });

  it("test basic AutoComplete behavior", async () => {
    //input change
    fireEvent.change(inputNode, { target: { value: "a" } }); //change inputNode节点使其value改为a
    await wait(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    expect(
      wrapper.container.querySelectorAll(".suggestion-item").length
    ).toEqual(2);

    fireEvent.click(wrapper.getByText("ab"));
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    expect(inputNode.value).toBe("ab");
  });

  it("should provide keyboard support", async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      //这个是异步操作，所有等待操作完成才能去获取：wrapper.queryByText("ab")
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });

    const firstItem = wrapper.queryByText("ab");
    const secondItem = wrapper.queryByText("abc");
    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstItem).toHaveClass("is-active");

    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(secondItem).toHaveClass("is-active");

    // arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 });
    expect(firstItem).toHaveClass("is-active");

    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(firstItem).not.toBeInTheDocument();
  });

  it("click outside should hide the dropdown", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });

    fireEvent.click(document);
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });

  it("renderOption should generate the right template", () => {});
  it("async fetchSuggestions should works fine", () => {});
});
