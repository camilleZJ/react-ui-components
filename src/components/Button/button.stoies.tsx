import React from "react";
import { action } from "@storybook/addon-actions";
// import { widthInfo } from "@storybook/addon-info";
import Button from "./index";

import { storiesOf } from "@storybook/react";
storiesOf("Button", module)
  // .addDecorator(widthInfo)
  // .addParameters({
  //   info: {
  //     //支持markdown
  //     text: `
  //     this is a very nice component
  //     ## this is a header
  //     ~~~js
  //     const a = 'hello'
  //     ~~~
  //     `,
  //     inline: true,
  //   },
  // })
  .add(
    //要想注释可以显示出来，story就需要作为主体story，命名和组件相同，即修改默认 button为Button
    "默认 button",
    defaultButton
    // {info: { inline: false },}
  )
  .add("不同尺寸 button", buttonWidthSize)
  .add("不同类型 button", buttonWithType);

// export default {
//   title: "Button",
//   component: Button,
//   includeStories: ["buttonWidthSize", "buttonWithType"], //配置要导出哪些组件，添加这个配置下面的export就不会都export
//   excludeStories: ["defaultButton"], //排除哪些组件不被export
// //   decorators: [ ... ],
// //   parameters: { ... }
// };

export const defaultButton = () => {
  return <Button onClick={action("clicked")}>default button</Button>;
};

export const buttonWidthSize = () => {
  return (
    <>
      <Button size="lg">large button</Button>;
      <Button size="small">small button</Button>;
    </>
  );
};

export const buttonWithType = () => {
  return (
    <>
      <Button btnType="primary">primary button</Button>;
      <Button btnType="danger">danger button</Button>;
      <Button btnType="link" href="baidu.com">
        link button
      </Button>
      ;
    </>
  );
};
buttonWithType.story = {
  name: "不同类型 button",
  // decorators: [ ... ],
  // parameters: { ... }
};
// 不修改导出组件名字，默认解析规则:
// name -> 'Name'
// someName -> 'Some Name'
// someNAME -> 'Some NAME'
// some_custom_NAME -> 'Some Custom NAME'
// someName1234 -> 'Some Name 1234'
// someName1_2_3_4 -> 'Some Name 1 2 3 4'
