/*配置插件以及需要加载的文件 */
import { configure, addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import React from "react";

//引入图标库
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

//引入组件样式及storybook样式
import "../src/styles/index.scss";
import "./style.scss";

const wrapperStyle: React.CSSProperties = {
  padding: "20px 40px",
};

const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {stroyFn()}
  </div>
);

//TableComponent:对组件属性显示进行美化
// const Red = (props: any) => <span style={{ color: "red" }} {...props} />;

// propDefinitions: Array<{
//   property: string, // The name of the prop
//   propType: Object | string, // The prop type. TODO: info about what this object is...
//   required: boolean, // True if the prop is required
//   description: string, // The description of the prop
//   defaultValue: any // The default value of the prop
// }>
// const TableComponent = ({ propDefinitions }) => {
//   const props = propDefinitions.map(
//     ({ property, propType, required, description, defaultValue }) => {
//       return (
//         <tr key={property}>
//           <td>
//             {property}
//             {/* {required ? <Red>*</Red> : null} */}
//           </td>
//           <td>{propType.name}</td>
//           <td>{required || "-"}</td>
//           <td>{defaultValue || "-"}</td>
//           <td>{description}</td>
//         </tr>
//       );
//     }
//   );

//   return (
//     <table className="info-table">
//       <thead>
//         <tr>
//           <th>name</th>
//           <th>type</th>
//           <th>required</th>
//           <th>default</th>
//           <th>description</th>
//         </tr>
//       </thead>
//       <tbody>{props}</tbody>
//     </table>
//   );
// };

addDecorator(storyWrapper);
addDecorator(withInfo);
addParameters({
  info: {
    inline: true,
    header: false,
    styles: {
      // header: {
      //   h1: {
      //     marginRight: "20px",
      //     fontSize: "25px",
      //     display: "inline",
      //   },
      //   body: {
      //     paddingTop: 0,
      //     paddingBottom: 0,
      //   },
      //   h2: {
      //     display: "inline",
      //     color: "#999",
      //   },
      // },
      // infoBody: {
      //   backgroundColor: "#eee",
      //   padding: "0px 5px",
      //   lineHeight: "2",
      // },
    },
  },
});
// addParameters({ info: { inline: true, header: false, TableComponent } });

// configure(require.context("../src", true, /\.stories\.tsx$/), module);
const loaderFn = () => {
  const allExports = [require("../src/welcome.stories.tsx")];
  const req = require.context("../src/components", true, /\.stories\.tsx?$/);
  req.keys().forEach((fname) => allExports.push(req(fname)));
  return allExports;
};

configure(loaderFn, module);
