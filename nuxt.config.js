export default {
  target: 'static',
  srcDir: 'src/',
  css: ['assets/css/normalize.css', 'assets/css/global.scss'],
  plugins: [],
  storybook: {
    addons: ['@storybook/addon-docs', '@storybook/addon-controls'],
  },
};
