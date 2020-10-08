export default {
  mode: 'spa',
  target: 'static',
  srcDir: 'src/',
  css: ['assets/css/normalize.css', 'assets/css/global.scss'],
  plugins: [
    '~/plugins/BaseComponents/index.js',
    { src: '~/plugins/Viewport/index.js', mode: 'client' },
  ],
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {
        href: 'https://fonts.googleapis.com/css?family=Averia+Libre:700',
        rel: 'stylesheet',
      },
    ],
  },
  storybook: {
    addons: ['@storybook/addon-docs', '@storybook/addon-controls'],
  },
};
