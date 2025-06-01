const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // More aggressive source map exclusion
      webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
        if (rule.enforce === 'pre' && rule.use) {
          return {
            ...rule,
            exclude: [
              ...(Array.isArray(rule.exclude) ? rule.exclude : rule.exclude ? [rule.exclude] : []),
              /node_modules\/firebase/,
              /node_modules\/@firebase/,
              /\.map$/,
            ]
          };
        }
        return rule;
      });

      // Suppress warnings completely
      webpackConfig.ignoreWarnings = [
        ...(webpackConfig.ignoreWarnings || []),
        /Failed to parse source map/,
        /node_modules\/firebase.*\.js\.map/,
        /node_modules\/@firebase.*\.js\.map/,
      ];

      // Additional stats configuration to reduce warnings
      if (!webpackConfig.stats) {
        webpackConfig.stats = {};
      }
      webpackConfig.stats.warnings = false;
      webpackConfig.stats.warningsFilter = [
        /Failed to parse source map/,
        /node_modules\/firebase/,
        /node_modules\/@firebase/,
      ];

      return webpackConfig;
    },
  },
  // Also suppress dev server warnings
  devServer: {
    client: {
      logging: 'warn',
      overlay: {
        warnings: false,
      },
    },
  },
};
