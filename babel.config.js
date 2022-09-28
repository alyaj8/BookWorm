module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    Plugins: ["react-native-reanimated/plugin"],
  };
};
