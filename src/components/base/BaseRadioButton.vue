<template>
  <span
    class="base-radio-button"
    :class="{ disabled, required, checked: localChecked }"
  >
    <input
      :id="id"
      type="radio"
      :name="name"
      :checked="localChecked"
      :disabled="disabled"
      @click.prevent="onClick"
    />
    <label :for="id">
      {{ label }}
    </label>
  </span>
</template>

<script>
export default {
  props: {
    id: { type: [Number, String], required: true },
    name: { type: String, default: '' },
    checked: {
      type: [Boolean, Number],
      default: false,
      validator: val => [true, false, 0, 1].includes(val),
    },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    label: { type: [String], default: '' },
    returnType: {
      type: String,
      default: 'boolean',
      validator: val => ['boolean', 'binary'].includes(val),
    },
  },
  data() {
    return {
      localChecked: false,
    };
  },
  computed: {},
  watch: {
    checked(nextChecked) {
      if (nextChecked === this.localChecked) return;
      if (this.required && this.localChecked && !nextChecked) {
        this.emitChange();
      }
      this.localChecked = !!nextChecked;
    },
  },
  created() {
    this.localChecked = !!this.checked;
  },
  methods: {
    onClick() {
      if (this.disabled) return;
      if (this.required && this.localChecked) return;
      this.localChecked = !this.localChecked;
      this.emitChange();
    },
    formatReturn() {
      if (this.returnType === 'binary') return +this.localChecked;
      return this.localChecked;
    },
    emitChange() {
      this.$emit('change', this.formatReturn(this.localChecked));
    },
  },
};
</script>

<style lang="scss">
.base-radio-button {
  position: relative;

  input[type='radio'] {
    position: absolute !important;
    opacity: 0;
    height: 0;
    width: 0;

    + label {
      position: relative;
      display: inline-block;
      cursor: pointer;
      // margin-left: 20px; /* This will be adjusted */

      &::before {
        content: '';
        position: relative;
        display: inline-block;
        border-radius: 50%;
        border: 1px solid #6f686a;
        width: 18px;
        height: 18px;
        background: transparent;
      }

      &::after {
        content: '';
        position: absolute;
        display: inline-block;
        top: 4px;
        left: 4px;
        border-radius: 50%;
        width: 12px;
        height: 12px;
      }
    }

    &:focus {
      + label::before {
        box-shadow: 0 0px 8px red;
      }
    }
  }

  &.checked {
    input[type='radio'] + label::after {
      background: red;
    }
  }
}
</style>
