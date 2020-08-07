import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { Progress } from "./Progress";
import { ProgressProps } from "./ProgressProps";

const testProps: ProgressProps = {
  percent: 70,
  theme: "success",
  showText: false,
  strokeHeight: 10,
};

let wrapper: RenderResult;
describe("test Progress component", () => {
  //   beforeEach(() => {
  //     wrapper = render(<Progress {...testProps} />);
  //   });

  it("should render the correct default progress", () => {
    // cleanup();
    wrapper = render(<Progress percent={50} />);
    const progressBar = wrapper.container.querySelector(
      ".progress-bar"
    ) as HTMLDivElement;
    expect(progressBar).toBeInTheDocument();
    expect(wrapper.queryByText("50%")).toBeInTheDocument();
    expect(progressBar.querySelector(".progress-bar-outer")).toHaveClass(
      "line-progress-bar"
    );

    const innerBar = progressBar.querySelector(
      ".progress-bar-inner"
    ) as HTMLDivElement;
    expect(innerBar).toHaveClass("color-primary");
    expect(innerBar.style.width).toEqual("50%");
  });

  it("should render circle progress when type set to circle", () => {
    // cleanup();
    wrapper = render(<Progress percent={70} type="circle" />);
    const progressBar = wrapper.container.querySelector(
      ".circle-progress-bar"
    ) as HTMLDivElement;
    expect(progressBar).toBeInTheDocument();
    expect(progressBar.querySelector(".right-bar")).toBeInTheDocument();

    const leftBar = progressBar.querySelector(".left-bar") as HTMLDivElement;
    expect(leftBar.style.transform).toBe("rotate(252deg)");
  });

  it("should render the correct component based on different props", () => {
    // cleanup();
    wrapper = render(<Progress {...testProps} />);
    const bar = wrapper.container.querySelector(
      ".progress-bar-outer"
    ) as HTMLElement;
    expect(bar.style.height).toBe("10px");
    expect(bar.querySelector(".progress-bar-inner")).toHaveClass(
      "color-success"
    );
    expect(bar.querySelector(".inner-text")).not.toBeInTheDocument();
  });
});
