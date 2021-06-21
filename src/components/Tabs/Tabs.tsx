import React, { FC } from "react";
import { TabsProps } from "./TabProps";
import classnames from "classnames";

/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 *
 * ~~~js
 * import { Tabs  } from 'react-ui-components-pkg'
 * ~~~
 */
export const Tabs: FC<TabsProps> = (props) => {
  return <div className="tabs-con"></div>;
};

Tabs.defaultProps = {
  defaultIndex: 0,
  type: "line",
};

export default Tabs;
