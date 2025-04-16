const path = require('path');
const pkg = require('../package.json');

module.exports = {
  project: {
    ios: {
      automaticPodsInstallation: true,
    },
  },
  dependencies: {
    [pkg.name]: {
      root: path.join(__dirname, '..'),
      platforms: {
        // Codegen script incorrectly fails without this
        // So we explicitly specify the platforms with empty object
        ios: {},
        android: {},
      },
    },
    // '@xterio-sdk/rn-auth': {
    //   root: path.join(
    //     __dirname,
    //     '..',
    //     'node_modules',
    //     '@xterio-sdk',
    //     'rn-auth'
    //   ), // 从node_modules中查找
    //   platforms: {
    //     // Codegen script incorrectly fails without this
    //     // So we explicitly specify the platforms with empty object
    //     ios: {},
    //     android: {},
    //   },
    // },
  },
};
