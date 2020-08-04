import "@testing-library/jest-dom/extend-expect";
import React from "react";
import axios from "axios";
import {
  render,
  RenderResult,
  fireEvent,
  wait,
  createEvent,
} from "@testing-library/react";
import { Upload } from "./Upload";
import { UploadProps } from "./UploadProps";

jest.mock("../Icon/icon.tsx", () => {
  return ({ icon, onClick }) => {
    return <span onClick={onClick}>{icon}</span>;
  };
});
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
  action: "fakeurl.com",
  drag: true,
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
};

//创建新的 File 对象实例:new File(bits, name[, options]); bits： UTF-8 编码的文件内容, options:type、lastModified
const testFile = new File(["xyz"], "test.png", { type: "image/png" });

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;

describe("test upload component", () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>click to upload</Upload>);
    fileInput = wrapper.container.querySelector(
      ".file-input"
    ) as HTMLInputElement;
    uploadArea = wrapper.queryByText("click to upload") as HTMLElement;
  });

  it("upload process should works fine", async () => {
    //以下是两种mockaxios post请求返回的结果
    //方式1
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({ data: "cool" });
    // });
    //方式2
    mockedAxios.post.mockResolvedValue({ data: "cool" });

    const { queryByText } = wrapper;
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    // expect(queryByText("spinner")).toBeInTheDocument();
    await wait(() => {
      expect(queryByText("test.png")).toBeInTheDocument();
    });
    expect(queryByText("check-circle")).toBeInTheDocument();
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      { data: "cool" },
      expect.objectContaining({
        status: "success",
        response: "cool",
      })
    );
    expect(testProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
        response: "cool",
        raw: testFile,
      })
    );

    //remove the uploaded file
    const removeElement = queryByText("times") as HTMLElement;
    expect(removeElement).toBeInTheDocument();
    fireEvent.click(removeElement);
    expect(queryByText("test.png")).not.toBeInTheDocument();
    //像是uid是变动的测试的时候只想测试部分属性：expect.objectContaining
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: "success",
        name: "test.png",
      })
    );
  });

  it("drag and drop files should works fine", async () => {
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass("is-dragger");
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("is-dragger");

    //报错：fireEvent.drop不包含event.dataTransfer
    // fireEvent.drop(uploadArea, { dataTransfer: { files: [testFile] } });
    const mockDropEvent = createEvent.drop(uploadArea);
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile],
      },
    });
    fireEvent(uploadArea, mockDropEvent); //先触发uploadArea再触发mockDropEvent

    await wait(() => {
      expect(wrapper.queryByText("test.png")).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      { data: "cool" },
      expect.objectContaining({
        raw: testFile,
        name: "test.png",
        status: "success",
      })
    );
  });
});
