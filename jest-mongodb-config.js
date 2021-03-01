const path = require('path');
const { test: config } = require(path.resolve(
  __dirname,
  'src',
  'config',
  'database',
  'database.json'
));

module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: config.database,
    },
    binary: {
      version: '4.4.3',
      checkMD5: false,
    },
    autoStart: false,
  },
};
