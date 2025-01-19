module.exports = function override(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: false,  // Deshabilita el polyfill de buffer
    };
    return config;
  };
  