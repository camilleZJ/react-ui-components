import React from "react";
import { action } from "@storybook/addon-actions";
// import { withInfo } from "@storybook/addon-info";
import { Button } from "./Button";
import { ButtonSize, ButtonType } from "./ButtonProps";

export const defaultButton = () => {
  return <Button onClick={action("default button")}>default button</Button>;
};

export const buttonWidthSize = () => {
  return (
    <>
      <Button onClick={action("lg default button")} size={ButtonSize.Large}>
        large default button
      </Button>
      <Button onClick={action("default button")}>default button</Button>
      <Button onClick={action("sm default button")} size={ButtonSize.Small}>
        small default button
      </Button>
    </>
  );
};
buttonWidthSize.story = {
  name: "不同尺寸 button",
};

export const buttonWithType = () => {
  return (
    <>
      {/* <Button onClick={action("default button")}>default button</Button> */}
      <Button btnType={ButtonType.Primary} onClick={action("primary button")}>
        primary button
      </Button>
      <Button btnType={ButtonType.Danger} onClick={action("danger button")}>
        danger button
      </Button>
      <Button
        btnType={ButtonType.Link}
        href="https://www.baidu.com/"
        onClick={action("link")}
      >
        link button
      </Button>
    </>
  );
};
buttonWithType.story = {
  name: "不同类型 button",
  // decorators: [],
  // parameters: {...},
};
// 不修改导出组件名字，默认解析规则:
// name -> 'Name'
// someName -> 'Some Name'
// someNAME -> 'Some NAME'
// some_custom_NAME -> 'Some Custom NAME'
// someName1234 -> 'Some Name 1234'
// someName1_2_3_4 -> 'Some Name 1 2 3 4'

export const buttonWithDiasbled = () => {
  return (
    <>
      <Button disabled onClick={action("disabled default button")}>
        disabled default button
      </Button>
      <Button
        disabled
        onClick={action("disabled primary button")}
        btnType={ButtonType.Primary}
      >
        disabled primary button
      </Button>
      <Button
        disabled
        onClick={action("disabled danger button")}
        btnType={ButtonType.Danger}
      >
        disabled danger button
      </Button>
      <Button
        disabled
        onClick={action("disabled link button")}
        btnType={ButtonType.Link}
        href="#"
      >
        disabled link button
      </Button>
    </>
  );
};
buttonWithDiasbled.story = {
  name: "禁用的 Button",
};

export default {
  title: "Button 按钮",
  component: Button,
  // includeStories: ["buttonWidthSize", "buttonWithType"], //配置要导出哪些组件，添加这个配置下面的export就不会都export
  // excludeStories: ["defaultButton"], //排除哪些组件不被export
  // decorators: [withInfo],
  //   parameters: {
  //     info: {
  //       // 支持markdown
  //       text: `
  //           this is a very nice component
  //           ## this is a header
  //           ~~~js
  //           const a = 'hello'
  //           ~~~
  //           `,
  //       inline: true,
  //       // header: true,
  //       // source: true,
  //     },
  //   },
};

// import { storiesOf } from "@storybook/react";
// storiesOf("Button", module)
//   // .addDecorator(widthInfo)
//   // .addParameters({
//   //   info: {
//   //     //支持markdown
//   //     text: `
//   //     this is a very nice component
//   //     ## this is a header
//   //     ~~~js
//   //     const a = 'hello'
//   //     ~~~
//   //     `,
//   //     inline: true,
//   //   },
//   // })
//   .add(
//     //要想注释可以显示出来，story就需要作为主体story，命名和组件相同，即修改默认 button为Button
//     "默认 button",
//     defaultButton
//     // {info: { inline: false },}
//   )
//   .add("不同尺寸 button", buttonWidthSize)
//   .add("不同类型 button", buttonWithType);
