const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#122a4e',
      '@text-color': 'fade(@primary-color, 65%)',
      '@text-color-secondary': 'fade(#FFF, 50%)',
      '@text-color-inverse': '@black',
      '@heading-color': '#122a4e',
      '@layout-header-background': '#122a4e'
    },
  })
);
