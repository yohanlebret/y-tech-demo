// const { theme } = require('./package.json');

const {
  override,
  fixBabelImports,
  addWebpackModuleRule,
} = require('customize-cra');


module.exports = override(
  // fixBabelImports('import', {
  //   libraryName: 'antd-mobile',
  //   style: true,
  // }),
  addWebpackModuleRule({
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            // modifyVars: theme,
            javascriptEnabled: true,
          },
        },
      },
    ],
  }),
);
