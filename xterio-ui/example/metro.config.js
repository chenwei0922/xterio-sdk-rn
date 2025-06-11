const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');
const { getConfig } = require('react-native-builder-bob/metro-config');
const { withNativeWind } = require('nativewind/metro');

const root = path.resolve(__dirname, '..');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = getDefaultConfig(__dirname);
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith('xterio-icons')) {
    // Logic to resolve the module name to a file path...
    // NOTE: Throw an error if there is no resolution.
    // console.log('///', context, moduleName)
    return {
      filePath: path.resolve(
        __dirname,
        './node_modules/xterio-icons/dist/xterio-icons-rn.js'
      ),
      type: 'sourceFile',
    };
  }
  // Ensure you call the default resolver.
  return context.resolveRequest(context, moduleName, platform);
};

const nativeWindConfig = withNativeWind(config, { input: './global.css' });

module.exports = getConfig(nativeWindConfig, {
  root,
  project: __dirname,
});
