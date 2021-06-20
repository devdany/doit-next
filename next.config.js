const withImages = require('next-images');
const Dotenv = require('dotenv-webpack');

module.exports = withImages({
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  ignoreBuildErrors: true,
  webpack: (config) => {
    config.plugins.push(new Dotenv({ silent: true }));
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
});
