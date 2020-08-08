import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome", module).add(
  "Welcome",
  () => {
    return (
      <>
        <h2>欢迎来到 react-ui-components-pkg 组件库</h2>
        <p>
          基于React Hooks + typescript 为 Web 应用提供了基础的 UI
          组件，本组件库还将持续探索企业级应用的最佳 UI
          实践。欢迎提供精选组件作为必要的补充。
        </p>
        <h4>-安装试试</h4>
        <code>npm install react-ui-components-pkg --save</code>
        <h4>-使用</h4>
        <code>
          <pre>
            // 加载样式 <br />
            import 'react-ui-components-pkg/dist/index.css' <br />
          </pre>
          <pre
            dangerouslySetInnerHTML={{
              __html:
                " // 引入组件 <br />import { Button } from 'react-ui-components-pkg'",
            }}
          ></pre>
        </code>
      </>
    );
  },
  {
    info: {
      disable: true,
      // source: false,
      // text: `
      //   #### -安装试试
      //   ~~~js
      //   npm install react-ui-components-pkg --save
      //   ~~~

      //   #### -使用
      //   ~~~js
      //   // 加载样式
      //   import 'react-ui-components-pkg/dist/index.css'
      //   // 引入组件
      //   import { Button } from 'react-ui-components-pkg'
      //   ~~~
      // `,
      styles: {
        h4: {
          "line-height": "2",
        },
      },
    },
  }
);
