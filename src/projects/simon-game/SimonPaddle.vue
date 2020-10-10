<template>
  <svg class="simon-paddle" viewBox="0 0 230 230">
    <path
      :fill="lightOn ? paddle.colorOn : paddle.colorOff"
      :d="paddle.path"
      @click="onClick"
    />
  </svg>
</template>

<script>
const clicky =
  'http://res.cloudinary.com/dcenatiempo/video/upload/v1499727069/click_rnmyzb.wav';
const buzzer =
  'http://res.cloudinary.com/dcenatiempo/video/upload/v1499571473/buzzer_cogzhf.m4a';
function playSound(sound) {
  if (sound) {
    const audio = new Audio(sound);
    audio.play();
    return audio;
  }
}
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
export default {
  props: {
    paddle: {
      type: Object,
      required: true,
      validator: paddle =>
        ['idx', 'key', 'sound', 'colorOff', 'colorOn', 'path'].every(
          key => key in paddle
        ),
    },
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      lightOn: false,
    };
  },
  methods: {
    buzz(ms) {
      const vm = this;
      let audio = playSound(buzzer);
      this.lightOn = true;
      return sleep(ms).then(() => {
        vm.lightOn = false;
        audio.pause();
      });
    },
    play(ms, pause = false) {
      const vm = this;
      let audio = playSound(this.paddle.sound);
      this.lightOn = true;
      return sleep(ms).then(() => {
        vm.lightOn = false;
        if (pause) audio.pause();
      });
    },
    lightUp(ms) {
      const vm = this;
      this.lightOn = true;
      return sleep(ms).then(() => {
        vm.lightOn = false;
      });
    },
    onClick() {
      this.$emit('click');
      playSound(clicky);

      // not player's turn
      if (this.disabled) return;

      // correct paddle pressed
      if (this.active) {
        this.play(600);
        return;
      }

      // wrong paddle pressed in strict mode...
      if (this.strictMode) {
        this.buzz(2500)
          .then(() => sleep(800))
          .finally(() => {
            this.$emit('strict-buzzer-finished');
          });
        return;
      }

      // wrong paddle pressed NOT in strict mode...
      this.buzz(1000);
    },
  },
};
</script>

<style lang="scss">
.simon-paddle {
  height: 100%;
  width: 100%;
}
</style>
