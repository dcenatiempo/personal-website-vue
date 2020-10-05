<template>
  <fieldset class="base-multi-checkbox-input">
    <template v-for="option in formattedOptions">
      <BaseCheckbox
        :id="id + '-' + option.key"
        :key="option.key"
        :name="id"
        :checked="isSelected(option.key)"
        :label="`${option.label}`"
        :required="isRequired(option)"
        :disabled="disabled"
        @change="onInput(option)"
      />
    </template>
  </fieldset>
</template>

<script>
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';

export default {
  // breaks storybook
  // model: {
  //   prop: 'value',
  //   event: 'change',
  // },
  props: {
    id: { type: [Number, String], required: true },
    options: { type: [Array], default: () => [] },
    value: { type: [Array], default: () => [] },
    labelExtractor: { type: [String, Function], default: () => item => item },
    keyExtractor: { type: [String, Function], default: () => item => item },
    returnType: {
      type: String,
      default: 'value',
      validator: type => ['key', 'value'].includes(type),
    },
    single: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedMap: {},
    };
  },
  computed: {
    isPrimitiveOptions() {
      const option = this.options?.[0];
      return typeof option === 'string' || typeof option === 'number';
    },
    formattedOptions() {
      return this.options.map(item => ({
        key: this.getKey(item),
        label: this.getLabel(item),
        option: item,
      }));
    },
  },
  watch: {
    value(next) {
      const prevMap = this.selectedMap;
      const nextMap = this.buildSelectedMap(next);
      if (isEqual(Object.keys(prevMap), Object.keys(nextMap))) return;
      this.selectedMap = nextMap;
    },
  },
  created() {
    this.selectedMap = this.buildSelectedMap(this.value);
  },
  methods: {
    isRequired(option) {
      return (
        this.required &&
        this.isSelected(option.key) &&
        Object.keys(this.selectedMap).length === 1
      );
    },
    isSelected(key) {
      const isSelected = this.selectedMap[key] !== undefined;
      return isSelected;
    },
    buildSelectedMap(selected) {
      if (!selected || !Array.isArray(selected)) return [];

      const map = selected.reduce((map, item) => {
        const key = this.getKey(item);
        if (key !== undefined) {
          map[key] = item;
        }
        return map;
      }, {});
      return map;
    },
    onInput({ key, option }) {
      // if key is empty - option was invalid
      if (key === undefined) return;

      // if key is already in selectedMap - we might need to remove it
      if (this.selectedMap[key] !== undefined) {
        const keys = Object.keys(this.selectedMap);

        // maybe do nothing
        if (this.required && keys.length === 1) {
          // this.selectedMap = { ...this.selectedMap };
          return;
        }

        // remove option from selectedMap
        this.selectedMap = keys.reduce((obj, k) => {
          if (k !== `${key}`) {
            obj[k] = this.selectedMap[k];
          }
          return obj;
        }, {});
      }

      // if key is not in selectedMap - we need to add it.
      else if (this.single) {
        this.selectedMap = { [key]: option };
      } else {
        this.selectedMap = {
          ...this.selectedMap,
          [key]: option,
        };
      }

      const newVal = this.getReturnValue(this.selectedMap);

      this.$emit('change', newVal);
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
    getReturnValue(selectedMap) {
      const vm = this;
      if (this.returnType === 'key')
        return Object.keys(selectedMap).map(key =>
          this.getKey(selectedMap[key])
        );

      // else returnType === 'value'
      return Object.keys(selectedMap).map(key => {
        let value = selectedMap[key];

        // we already have value as object
        if (isObject(value)) return value;

        // we already have value as string/number
        if (vm.isPrimitiveOptions) return value;

        // we need get value from this.options
        return vm.formattedOptions.find(item => `${item.key}` === key).option;
      });
    },
  },
};
</script>

<style lang="scss">
.base-multi-checkbox-input {
  position: relative;

  // input[type='checkbox'] {
  //   // position: absolute !important;
  //   // opacity: 0;
  //   // height: 0;
  //   // width: 0;
  // }

  // input[type='checkbox'] + label {
  //   display: block;
  //   position: relative;
  // }

  // input[type='checkbox'] + label::before {
  //   content: '';
  //   position: relative;
  //   display: inline-block;
  //   margin-right: 10px;
  //   width: 20px;
  //   height: 20px;
  //   background: rgba(200, 200, 200, 0.5);
  // }

  // input[type='checkbox']:checked + label::before {
  //   background: #5ac5c9;
  // }

  // input[type='checkbox']:checked + label::after {
  //   content: '';
  //   position: absolute;
  //   top: 3px;
  //   left: 3px;
  //   border-left: 2px solid black;
  //   border-bottom: 2px solid black;
  //   height: 6px;
  //   width: 13px;
  //   transform: rotate(-45deg);
  // }

  // input[type='checkbox']:focus + label::before {
  //   outline: #5d9dd5 solid 1px;
  //   box-shadow: 0 0px 8px #5e9ed6;
  // }

  // input[type='checkbox']:disabled + label {
  //   color: #575757;
  // }

  // input[type='checkbox']:disabled + label::before {
  //   background: #ddd;
  // }
}
</style>
