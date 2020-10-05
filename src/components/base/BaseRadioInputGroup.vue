<template>
  <fieldset class="base-radio-input-group">
    <template v-for="option in formattedOptions">
      <BaseRadioButton
        :id="id + '-' + option.key"
        :key="option.key"
        :name="id"
        :checked="isSelected(option)"
        :label="`${option.label}`"
        :required="required && isSelected(option) && localValue"
        :disabled="disabled"
        @change="onInput(option)"
      />
    </template>
  </fieldset>
</template>

<script>
import get from 'lodash/get';

export default {
  // model: {
  //   prop: 'value',
  //   event: 'change',
  // },
  props: {
    id: { type: [Number, String], required: true },
    options: { type: [Array], default: () => [] },
    value: { type: [Object, String, Number], default: null },
    labelExtractor: { type: [String, Function], default: item => item },
    keyExtractor: { type: [String, Function], default: item => item },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    returnType: {
      type: String,
      default: 'value',
      validator: type => ['key', 'value'].includes(type),
    },
  },
  data() {
    return {
      localValue: null,
    };
  },
  computed: {
    formattedOptions() {
      return this.options.map(item => ({
        key: this.getKey(item),
        label: this.getLabel(item),
        option: item,
      }));
    },
  },
  watch: {
    value(value) {
      if (value === this.localValue) return;
      this.localValue = value;
    },
  },
  created() {
    this.localValue = this.value;
  },
  methods: {
    isSelected(option) {
      return option.key === this.getKey(this.localValue);
    },
    onInput(option) {
      // invalid input
      if (!option || option.key === undefined) return;

      // if already checked, we might need to un-check it
      if (this.getKey(this.localValue) === option.key) {
        if (this.required) return;
        this.localValue = null;
      }

      // otherwise check the un-checked option
      else {
        this.localValue = option.option;
      }

      this.$emit('change', this.getReturnValue(this.localValue));
    },
    getLabel(option) {
      if (
        (typeof option === 'string' || typeof option === 'number') &&
        !this.labelExtractor
      ) {
        return option;
      }

      if (typeof this.labelExtractor === 'function') {
        return this.labelExtractor(option);
      }

      if (typeof this.labelExtractor === 'string') {
        return get(option, this.labelExtractor, '');
      }

      return '';
    },
    getKey(option) {
      if (typeof option === 'string' || typeof option === 'number') {
        return option;
      }

      if (typeof this.keyExtractor === 'function') {
        return this.keyExtractor(option);
      }

      if (typeof this.keyExtractor === 'string') {
        return get(option, this.keyExtractor, JSON.stringify(option));
      }

      return JSON.stringify(option);
    },
    getReturnValue(option) {
      if (this.returnType === 'key') return this.getKey(option);
      return option;
    },
  },
};
</script>

<style lang="scss">
.base-radio-input-group {
  position: relative;
}
</style>
