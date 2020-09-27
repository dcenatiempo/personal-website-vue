export default {
  target: 'static',
  srcDir: 'src/',
  css: ['assets/css/normalize.css', 'assets/css/global.scss'],
  plugins: ['~/plugins/BaseComponents/index.js'],
  storybook: {
    addons: ['@storybook/addon-docs', '@storybook/addon-controls'],
  },
};
