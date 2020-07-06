module.exports = ({ config }) => {
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
      // {
      //   loader: require.resolve("react-docgen-typescript"),
      //   options: {
      //     shouldExtractLiteralValuesFromEnum: true, //enum展开而不是定义的enum对象名
      //     propFilter: (prop) => {
      //       if (prop.parent) {
      //         return !prop.parent.fileName.includes("node_modules");  //react原生模型都来自node_modules，所以过滤掉这里的即可
      //       }
      //     },
      //   },
      // },
    ],
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
