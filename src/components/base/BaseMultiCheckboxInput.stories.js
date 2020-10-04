import BaseMultiCheckboxInput from './BaseMultiCheckboxInput';

export default {
  title: 'Checkbox/BaseMultiCheckboxInput',
  component: BaseMultiCheckboxInput,
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
    value: [{ label: 'c', meta: { id: 13 } }],
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
    components: { BaseMultiCheckboxInput },
    props: [...Object.keys(args)],
    template: `
    <BaseMultiCheckboxInput
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
  components: { BaseMultiCheckboxInput },
  props: ['value', 'options', 'change'],
  template: `
    <BaseMultiCheckboxInput
      id="ArrayOfStrings"
      :value="value"
      :options="options"
      @change="change"
    />`,
});

ArrayOfStrings.args = {
  options: ['a', 'b', 'c'],
  value: ['a'],
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
  components: { BaseMultiCheckboxInput },
  props: ['value', 'options', 'change'],
  template: `
    <BaseMultiCheckboxInput
      id="ArrayOfNumbers"
      :value="value"
      :options="options"
      @change="change"
    />`,
});
ArrayOfNumbers.args = {
  options: [1, 2, 3],
  value: [2],
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

// export const WithExtractorStrings = args => ({
//   components: { BaseMultiCheckboxInput },
//   data: () => ({
//     value: [{ label: 'c', id: 23 }],
//     options: [
//       { label: 'a', id: 21 },
//       { label: 'b', id: 22 },
//       { label: 'c', id: 23 },
//     ],
//   }),
//   template: `
//   <div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: lightgray">
//     <BaseMultiCheckboxInput
//       id="ArrayOfObjects"
//       v-model="value"
//       :options="options"
//       labelExtractor="label"
//       keyExtractor="id"
//     />
//   </div>`,
// });

// export const WithExtractorFunctions = args => ({
//   components: { BaseMultiCheckboxInput },
//   data: () => ({
//     value: [{ label: 'c', id: 23 }],
//     options: [
//       { label: 'a', id: 21 },
//       { label: 'b', id: 22 },
//       { label: 'c', id: 23 },
//     ],
//   }),
//   template: `
//     <div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: lightgray">
//       <BaseMultiCheckboxInput
//           id="ArrayOfObjects2"
//           v-model="value"
//         :options="options"
//         :labelExtractor="item => 'Option ' + item.label"
//         :keyExtractor="item => item.id + '-' + item.label"
//       />
//     </div>`,
// });

// export const WithKeyAsPropAndEmitsKey = args => ({
//   components: { BaseMultiCheckboxInput },
//   data: () => ({
//     value: [313],
//     options: [
//       { label: 'a', data: { id: 311 } },
//       { label: 'b', data: { id: 312 } },
//       { label: 'c', data: { id: 313 } },
//     ],
//   }),
//   template: `
//       <div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: lightgray">
//         <BaseMultiCheckboxInput
//           id="ArrayOfObjects3"
//           v-model="value"
//           :options="options"
//           labelExtractor="data.id"
//           keyExtractor="data.id"
//           returnType="key"
//         />
//       </div>`,
// });

// export const WithKeyAsPropButEmitsValue = args => ({
//   components: { BaseMultiCheckboxInput },
//   data: () => ({
//     value: [313],
//     options: [
//       { label: 'a', data: { id: 1 } },
//       { label: 'b', data: { id: 312 } },
//       { label: 'c', data: { id: 313 } },
//     ],
//   }),
//   template: `
//       <div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: lightgray">
//         <BaseMultiCheckboxInput
//           required
//           id="ArrayOfObjects4"
//           :value="value"
//           :options="options"
//           :labelExtractor="item => 'My Option ' + item.label"
//           keyExtractor="data.id"
//           @change="val => value = val.map(item => item.data.id)"
//         />
//       </div>`,
// });

// export const WithValueAsPropButEmitsKey = args => ({
//   components: { BaseMultiCheckboxInput },
//   data: () => ({
//     value: [{ label: 'c', data: { id: 313 } }],
//     options: [
//       { label: 'a', data: { id: 311 } },
//       { label: 'b', data: { id: 312 } },
//       { label: 'c', data: { id: 313 } },
//     ],
//   }),
//   template: `
//       <div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: lightgray">
//         <BaseMultiCheckboxInput
//           id="ArrayOfObjects5"
//           :value="value"
//           :options="options"
//           :labelExtractor="item => 'Option ' + item.label"
//           keyExtractor="data.id"
//           returnType="key"
//           @change="val => value = val"
//         />
//       </div>`,
// });
