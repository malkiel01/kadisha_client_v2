// webpack.config.js

const path = require('path');

module.exports = {
    // ...
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    // ...
    resolve: {
      alias: {
        'sass': require.resolve('sass'),
      },
      fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
      },
    },
  }