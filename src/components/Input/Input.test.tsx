import React from "react";
import { render, RenderResult, fireEvent } from "@testing-library/react";
import Input from "./index";
import { InputProps } from "./InputProps";

const testProps: InputProps = {
  onChange: jest.fn(),
  placeholder: "test-input",
};

let wrapper: RenderResult;
describe("test Input component", () => {
  it("should render the correct default Input", () => {
    wrapper = render(<Input {...testProps} />);
    const inputNode = wrapper.getByPlaceholderText(
      "test-input"
    ) as HTMLInputElement;
    expect(inputNode).toBeInTheDocument();

    fireEvent.change(inputNode, { target: { value: "a" } });
    expect(testProps.onChange).toHaveBeenCalled();
    expect(inputNode.value).toEqual("a");
  });

  it("should render the disabled Input on disabled property", () => {
    wrapper = render(<Input placeholder="disabled" disabled />);

    const inputNode = wrapper.getByPlaceholderText(
      "disabled"
    ) as HTMLInputElement;
    expect(inputNode).toBeInTheDocument();
    expect(inputNode.disabled).toBeTruthy();
  });

  it("should render different input sizes on size property", () => {
    wrapper = render(<Input placeholder="sizes" size="lg" />);
    expect(wrapper.getByPlaceholderText("sizes")).toBeInTheDocument();

    const testContainer = wrapper.container.querySelector(".input-wrapper");
    expect(testContainer).toHaveClass("input-size-lg");
  });

  it("should render prepend and append element on prepand/append property", () => {
    const { container, queryByText } = render(
      <Input placeholder="pend" prepend="https://" append=".com" />
    );
    const testContainer = container.querySelector(".input-wrapper");
    expect(testContainer).toHaveClass(
      "input-group input-group-append input-group-prepend"
    );

    expect(queryByText("https://")).toBeInTheDocument();
    expect(queryByText(".com")).toBeInTheDocument();

    // expect(
    //   container.querySelector(".input-group-prepend-con")?.textContent
    // ).toEqual("https://");
    // expect(
    //   container.querySelector(".input-group-append-con")?.textContent
    // ).toEqual("https://");
  });
});
