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
      '@text-color': 'fade(@white, 65%)',
      '@text-color-secondary': 'fade(@white, 45%)',
      '@text-color-inverse': '@black',
      '@heading-color': '@primary-color',
    },
  })
);
