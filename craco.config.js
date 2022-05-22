const port = process.env.BLOCKLET_PORT || process.env.PORT || 3000;
const eslint = require('./.eslintrc.js');

module.exports = {
  devServer: {
    port,
    client: {
      // If you want to development this blocklet without blocklet-server, you can delete next line, otherwise the hot reload will be failed.
      // webSocketURL: 'wss://0.0.0.0/ws',
    },
  },
  eslint: {
    enable: true,
    mode: 'file',
    configure: eslint,
  },
  jest: {
    babel: {
      addPresets: true,
      addPlugins: true,
    },
  },
};
