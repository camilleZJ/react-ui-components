import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Alert } from "./Alert";
import { AlertProps } from "./AlertProps";

const defaultProps: AlertProps = {
  title: "default alert",
  onClose: jest.fn(),
};

const typeProps: AlertProps = {
  title: "success alert",
  type: "success",
  closable: false,
};

const iconProps: AlertProps = {
  title: "danger alert",
  type: "danger",
  closable: false,
  showIcon: true,
  description: "this is a long description",
};

const centerProps: AlertProps = {
  title: "warning alert",
  type: "warning",
  closable: false,
  center: true,
};

describe("test alert component", () => {
  it("should render the correct default alert", () => {
    const wraper = render(<Alert {...defaultProps} />);
    const element = wraper.container.querySelector(".alert-con") as HTMLElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("alert-default");
    expect(element).not.toHaveClass("alert-center");

    const descElement = element.querySelector(".alert-desc") as HTMLElement;
    const iconElement = element.querySelector(".alert-icon") as HTMLElement;
    expect(descElement).not.toBeInTheDOM();
    expect(iconElement).not.toBeInTheDocument();

    const closeElement = element.querySelector(".alert-close") as HTMLElement;
    fireEvent.click(closeElement);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("should render the correct component based on different types", () => {
    const wraper = render(<Alert {...typeProps} />);
    const element = wraper.container.querySelector(
      ".alert-success"
    ) as HTMLElement;
    expect(element).toBeInTheDocument();

    const closeElement = element.querySelector(".alert-close");
    expect(closeElement).not.toBeInTheDocument();
  });

  it("should render alert with icon when showIcon set to true", () => {
    const wraper = render(<Alert {...iconProps} />);
    const element = wraper.container.querySelector(
      ".alert-danger"
    ) as HTMLElement;
    expect(element).toBeInTheDocument();

    const descElement = element.querySelector(".alert-desc");
    const iconElement = element.querySelector(".alert-icon");
    expect(descElement).toBeInTheDOM();
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the correct component  when center set to true", () => {
    const wraper = render(<Alert {...centerProps} />);
    const element = wraper.container.querySelector(
      ".alert-warning"
    ) as HTMLElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("alert-center");
  });
});
