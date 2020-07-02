module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-links",
  ],

  //采用新建webpack.config.js去新增webpack配置而不在这里修改
  // webpackFinal: async (config) => {
  //   config.module.rules.push({
  //     test: /\.tsx?$/,
  //     loader: require.resolve("babel-loader"),
  //     options: {
  //       presets: [["react-app", { flow: false, typescript: true }]],
  //       // presets: [require.resolve('babel-preset-react-app')]
  //     },
  //   });
  //   config.resolve.extensions.push(".ts", ".tsx");
  //   return config;
  // },
};
