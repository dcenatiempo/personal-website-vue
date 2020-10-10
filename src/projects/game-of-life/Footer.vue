<template>
  <footer class="footer">
    <button class="clear" title="Clear the board" @click="emitAction('clear')">
      X
    </button>
    <button
      class="random"
      title="Populate the board"
      @click="emitAction('randomize')"
    >
      ?
    </button>
    <button class="power" title="Start/Stop" @click="emitAction('toggleOn')">
      {{ on ? '◼' : '▶' }}
    </button>
    <div class="flex-col">
      Speed<input
        class="speed-slider slider"
        type="range"
        min="1"
        max="50"
        step="2"
        :value="settings.speed"
        @change="e => changeSetting(e, 'speed')"
      />
    </div>
    <div class="flex-col">
      Zoom
      <input
        class="zoom-slider slider"
        type="range"
        min="3"
        max="40"
        step="1"
        :value="settings.zoom"
        @change="e => changeSetting(e, 'zoom')"
      />
    </div>
    <div class="flex-col">
      Density
      <input
        class="density-slider slider"
        type="range"
        min="1"
        max="7"
        step="1"
        :value="settings.density"
        @change="e => changeSetting(e, 'density')"
      />
    </div>
    <div class="flex-col">
      {{ settings.rows }}
      Rows
      <input
        class="rows-slider slider"
        type="range"
        min="20"
        :max="viewport.h / 10 < 120 ? viewport.h / 10 : 120"
        step="1"
        :defaultValue="settings.rows"
        @change="e => changeSetting(e, 'rows')"
      />
    </div>
    <div class="flex-col">
      {{ settings.cols }} Columns
      <input
        class="cols-slider slider"
        type="range"
        min="20"
        :max="viewport.w / 10 < 120 ? viewport.w / 10 : 120"
        step="1"
        :value="settings.cols"
        @change="e => changeSetting(e, 'cols')"
      />
    </div>
    <div>
      Auto-Resize
      <input
        class="auto-fill"
        type="checkbox"
        :value="settings.autoFill"
        @change="e => changeSetting(e, 'autoFill')"
      />
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    settings: {
      type: Object,
      required: true,
      validator: setting =>
        ['speed', 'zoom', 'density', 'rows', 'cols', 'autoFill'].every(
          key => key in setting
        ),
    },
    viewport: {
      type: Object,
      required: true,
    },
    on: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changeSetting(e, setting) {
      const value = setting === 'autoFill' ? e.target.checked : +e.target.value;
      this.$emit('change-setting', { setting, value });
    },
    emitAction(action) {
      this.$emit('action', action);
    },
  },
};
</script>

<style lang="scss">
@import './vars';

.footer {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  padding: 0px;
  background: $header;

  button {
    text-align: center;
    cursor: pointer;
    height: 40px;
    width: 40px;
    background: $header;
    color: white;
    border: solid;
    border-width: 2px;
    border-radius: 100%;
    margin: 5px 5px;
    padding: 0;
  }

  .slider {
    width: 50px;
  }

  input[type='range'].slider {
    -webkit-appearance: none;
    width: 100%;
    margin-top: 10px;
    padding-right: 10px;

    &:focus {
      outline: none;
    }

    &::-webkit-slider-runnable-track {
      width: $slider-width;
      height: $slider-height;
      cursor: pointer;
      background: white;
      border-radius: 100%;
      border: none;
    }

    &::-webkit-slider-thumb {
      border: 2px solid white;
      height: $thumb-height;
      width: $thumb-width;
      border-radius: 4px;
      background: $header;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -$thumb-height/2;
    }

    &:focus::-webkit-slider-runnable-track {
      background: $alive;
    }

    &::-moz-range-track {
      width: $slider-width;
      height: $slider-height;
      cursor: pointer;
      background: #ebeced;
      border-radius: 0px;
      border: none;
    }

    &::-moz-range-thumb {
      border: 2px solid white;
      height: $thumb-height;
      width: $thumb-width;
      border-radius: 4px;
      background: #585859;
      cursor: pointer;
    }

    &::-ms-track {
      width: $slider-width;
      height: $slider-height;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }

    &::-ms-fill-lower {
      background: white;
      border: none;
      border-radius: 0px;
    }

    &::-ms-fill-upper {
      background: white;
      border: none;
      border-radius: 0px;
    }

    &::-ms-thumb {
      border: 2px solid white;
      width: $thumb-width;
      border-radius: 4px;
      background: $header;
      cursor: pointer;
      height: $thumb-height;
    }

    &:focus::-ms-fill-lower {
      background: $alive;
    }

    &:focus::-ms-fill-upper {
      background: $alive;
    }
  }

  input[type='checkbox'] {
    height: 20px;
    width: 20px;
  }
}
</style>
