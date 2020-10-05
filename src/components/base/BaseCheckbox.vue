<template>
  <span
    class="base-checkbox-input"
    :class="{ disabled, required, checked: localChecked }"
  >
    <input
      :id="id"
      type="checkbox"
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
  // breaks storybook
  // model: {
  //   prop: 'checked',
  //   event: 'change',
  // },
  props: {
    /**
Required to differenciate multiple inputs on the same page
*/
    id: { type: [Number, String], required: true },
    name: { type: String, default: '' },
    checked: {
      type: [Boolean, Number],
      default: false,
      validator: val => [true, false, 0, 1].includes(val),
    },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    label: { type: [String], default: 'my label' },
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
.base-checkbox-input {
  position: relative;
  display: flex;
  align-items: center;

  input[type='checkbox'] {
    position: absolute !important;
    opacity: 0;
    height: 0;
    width: 0;
  }

  input[type='checkbox'] + label {
    position: relative;
    display: flex;
    align-items: center;
  }

  input[type='checkbox'] + label::before {
    content: '';
    position: relative;
    display: inline-block;
    margin-right: 10px;
    width: 20px;
    height: 20px;
    background: rgba(200, 200, 200, 0.5);
  }

  &.checked {
    input[type='checkbox'] + label::before {
      background: #5ac5c9;
    }

    input[type='checkbox'] + label::after {
      content: '';
      position: absolute;
      top: 5px;
      left: 3px;
      border-left: 2px solid black;
      border-bottom: 2px solid black;
      height: 6px;
      width: 13px;
      transform: rotate(-45deg);
    }
  }

  input[type='checkbox']:focus + label::before {
    outline: #5d9dd5 solid 1px;
    box-shadow: 0 0px 8px #5e9ed6;
  }

  input[type='checkbox']:disabled + label {
    color: #575757;
  }

  input[type='checkbox']:disabled + label::before {
    background: #ddd;
  }
}
</style>
