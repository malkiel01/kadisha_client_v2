// webpack.config.js

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
    },
  };
  