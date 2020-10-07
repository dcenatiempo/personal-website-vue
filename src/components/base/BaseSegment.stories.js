import BaseSegment from './BaseSegment';

export default {
  title: 'BaseSegment',
  component: BaseSegment,
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

export const basics = args => {
  return {
    components: { BaseSegment },
    props: [...Object.keys(args)],
    template: `
      <BaseSegment
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
