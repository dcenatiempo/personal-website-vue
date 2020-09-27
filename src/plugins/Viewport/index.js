import Vue from 'vue';

const viewport = { w: 0, h: 0 };

function resizeFinished() {
  getWindowSize();
}

function getWindowSize() {
  viewport.h = Math.floor(window.innerHeight);
  viewport.w = Math.floor(window.innerWidth);
}

let timout;
window.onresize = () => {
  clearTimeout(timout);
  timout = setTimeout(resizeFinished, 20);
};

getWindowSize();

Vue.use({
  install(Vue) {
    Vue.prototype.$viewport = viewport;
  },
});
