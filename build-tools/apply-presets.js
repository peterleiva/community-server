const path = require('path');
const { merge } = require('webpack-merge');

/**
 * Dynamically loads a presets module
 *
 * @param {import('webpack').Configuration & {presets: string | string[]}} env
 */
module.exports = function (env) {
  const presets = env.presets || [];
  const mergedPresets = [presets].flat();

  const presetsConfig = mergedPresets.map(name => {
    const presetPath = path.resolve(__dirname, 'presets', `webpack.${name}`);

    try {
      require.resolve(presetPath);
      return require(presetPath)(env);
    } catch (error) {
      console.error(
        `Failed to load ${name} preset: Preset ${presetPath}.js doesn't exists`
      );

      console.error(error);

      return {};
    }
  });
  return merge({}, ...presetsConfig);
};
