// const path = require("path");
// const custom = require("./webpack.config");

module.exports = {
  stories: ["../src/**/*.stories.[tj]sx"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    // {
    //   name: "@storybook/addon-storysource",
    //   options: {
    //     rule: {
    //       // test: [/\.stories\.jsx?$/], This is default
    //       include: [path.resolve(__dirname, "../stories")], // 找到自己存放stories的文件夹
    //     },
    //     loaderOptions: {
    //       prettierConfig: { printWidth: 80, singleQuote: false },
    //     },
    //   },
    // },
  ],

  //采用新建webpack.config.js去新增webpack配置而不在这里修改
  // webpackFinal: (config) => {
  //   return {
  //     ...config,
  //     module: { ...config.module, rules: custom.module.rules },
  //   };
  // },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [["react-app", { flow: false, typescript: true }]],
            // presets: [require.resolve('babel-preset-react-app')]
          },
        },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => {
              if (prop.parent) {
                return !prop.parent.fileName.includes("node_modules");
              }

              return true;
            },
          },
        },
      ],
    });

    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
