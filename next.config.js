const withImages = require('next-images');
const Dotenv = require('dotenv-webpack');

module.exports = withImages({
  env: {
    GRAPHQL_WEBSOCKET_URL: process.env.GRAPHQL_WEBSOCKET_URL,
    GRAPHQL_URL: process.env.GRAPHQL_URL,
    ETHEREUM_PROVIDER_URL: process.env.ETHEREUM_PROVIDER_URL,
  },
  ignoreBuildErrors: true,
  webpack: (config) => {
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
});
