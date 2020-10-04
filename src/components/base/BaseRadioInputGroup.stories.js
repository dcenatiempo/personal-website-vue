import BaseRadioInputGroup from './BaseRadioInputGroup';

export default {
  title: 'Radio/BaseRadioInputGroup',
  component: BaseRadioInputGroup,
  component: BaseRadioInputGroup,
  argTypes: {
    id: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'object' },
    },
    options: {
      control: { type: 'object' },
    },
    labelExtractor: {
      control: { type: 'text' },
    },
    keyExtractor: {
      control: { type: 'text' },
    },
    returnType: {
      control: { type: 'select', options: ['value', 'key'] },
    },
    required: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    change: { action: { type: 'change' } },
  },
  args: {
    id: 'someId',
    value: { label: 'c', meta: { id: 13 } },
    options: [
      { label: 'a', meta: { id: 11 }, active: false },
      { label: 'b', meta: { id: 12 }, active: true },
      { label: 'c', meta: { id: 13 }, active: false },
    ],
    labelExtractor: 'label',
    keyExtractor: 'meta.id',
    returnType: 'value',
    required: false,
    disabled: false,
  },
  decorators: [
    () => ({
      template: `<div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: AliceBlue; padding: 20px;">
            <story/>
          </div>`,
    }),
  ],
};

export const ArrayOfObjects = args => {
  return {
    components: { BaseRadioInputGroup },
    props: [...Object.keys(args)],
    template: `
    <BaseRadioInputGroup
      id="ArrayOfObjects"
      :value="value"
      :options="options"
      :labelExtractor="labelExtractor"
      :keyExtractor="keyExtractor"
      :returnType="returnType"
      :required="required"
      :disabled="disabled"
      @change="change"s
    />`,
  };
};

export const ArrayOfStrings = args => ({
  components: { BaseRadioInputGroup },
  props: ['value', 'options', 'change'],
  template: `
    <BaseRadioInputGroup
      id="ArrayOfStrings"
      :value="value"
      :options="options"
      @change="change"
    />`,
});

ArrayOfStrings.args = {
  options: ['a', 'b', 'c'],
  value: 'a',
};
ArrayOfStrings.argTypes = {
  id: { table: { disable: true } },
  labelExtractor: { table: { disable: true } },
  keyExtractor: { table: { disable: true } },
  single: { table: { disable: true } },
  required: { table: { disable: true } },
  disabled: { table: { disable: true } },
  returnType: { table: { disable: true } },
};

export const ArrayOfNumbers = args => ({
  components: { BaseRadioInputGroup },
  props: ['value', 'options', 'change'],
  template: `
    <BaseRadioInputGroup
      id="ArrayOfNumbers"
      :value="value"
      :options="options"
      @change="change"
    />`,
});
ArrayOfNumbers.args = {
  options: [1, 2, 3],
  value: 2,
};
ArrayOfNumbers.argTypes = {
  id: { table: { disable: true } },
  labelExtractor: { table: { disable: true } },
  keyExtractor: { table: { disable: true } },
  single: { table: { disable: true } },
  required: { table: { disable: true } },
  disabled: { table: { disable: true } },
  returnType: { table: { disable: true } },
};
