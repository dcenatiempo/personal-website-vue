import BaseButton from './BaseButton';

export default {
  title: 'BaseButton',
  component: BaseButton,
};

export const Primary = () => ({
  components: { BaseButton },
  template: '<BaseButton />',
});
