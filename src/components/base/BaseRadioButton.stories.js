import BaseRadioButton from './BaseRadioButton';

export default {
  title: 'Radio/BaseRadioButton',
  component: BaseRadioButton,
  argTypes: {
    id: { control: { type: 'text' } },
    name: { control: { type: 'text' } },
    checked: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
    returnValue: { control: { type: 'radio', options: ['boolean', 'binary'] } },
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

// export const Docs = args => ({
//   components: { BaseRadioButton },
//   data: () => ({ args }),
//   methods: {
//     onChange(v) {
//       this.args.checked = v;
//     },
//   },
//   template: `
//     <BaseRadioButton
//       v-bind="args"
//       @change="change"
//     />`,
// });

export const basic = args => {
  return {
    props: [...Object.keys(args)],
    template: `
      <BaseRadioButton
        :id="id"
        :name="name"
        :label="label"
        :checked="checked"
        :disabled="disabled"
        :required="required"
        :returnValue="returnValue"
        @change="change"
      />`,
  };
};
