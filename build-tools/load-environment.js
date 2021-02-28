const path = require('path');

/**
 * Lazy load webpack env configuration, whether production or development
 *
 * @throws "Webpack environment not load"
 * @param {import('webpack').Configuration} env webpack environment
 * @return {import('webpack').Configuration}
 */
module.exports = function (env) {
  const configPath = path.resolve(__dirname, `webpack.${env.mode}`);

  try {
    require.resolve(configPath);
    return require(configPath)(env);
  } catch (error) {
    console.error(
      'Webpack environment not loaded: Webpack environment configuration ' +
        `"${configPath}".ts doesn't exists`
    );
  }
};
