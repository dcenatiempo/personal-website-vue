import BaseCheckbox from './BaseCheckbox';

export default {
  title: 'Checkbox/BaseCheckbox',
  component: BaseCheckbox,
  argTypes: {
    id: { control: { type: 'text' } },
    name: { control: { type: 'text' } },
    checked: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
    returnType: { control: { type: 'radio', options: ['boolean', 'binary'] } },
    change: { action: { type: 'change' } },
  },
  args: {
    id: 'some-id',
    name: 'some-name',
    checked: false,
    disabled: false,
    required: false,
    label: 'My label',
  },
  decorators: [
    () => ({
      template: `<div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: AliceBlue; padding: 20px;">
          <story/>
        </div>`,
    }),
  ],
};

// export const docs = args => ({
//   components: { BaseCheckbox },
//   data: () => ({ args }),
//   methods: {
//     onChange(v) {
//       this.args.checked = v;
//     },
//   },
//   template: `
//     <BaseCheckbox
//       v-bind="args"
//       @change="onChange"
//     />`,
// });

export const basic = args => {
  return {
    props: [...Object.keys(args)],
    template: `
      <BaseCheckbox
        :id="id"
        :name="name"
        :label="label"
        :checked="checked"
        :disabled="disabled"
        :required="required"
        :returnType="returnType"
        @change="change"
      />`,
  };
};
