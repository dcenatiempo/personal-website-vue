import Vue from 'vue';

const viewport = { w: 0, h: 0, change: '0-0' };

function resizeFinished() {
  getWindowSize();
}

function getWindowSize() {
  let h = Math.floor(window.innerHeight);
  let w = Math.floor(window.innerWidth);
  viewport.h = h;
  viewport.w = w;
  viewport.change = `${h}-${w}`;
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
