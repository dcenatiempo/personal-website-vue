import HamburgerButton from './HamburgerButton';

export default {
  title: 'HamburgerButton',
  component: HamburgerButton,
  // argTypes: {
  //   expanded: {
  //     description: 'overwritten description',
  //     control: 'boolean',
  //     defaultValue: true,
  //   },
  // },
};

export const Primary = args => ({
  components: { HamburgerButton },
  data: () => args,
  template: '<HamburgerButton :expanded="expanded" />',
});

// Primary.argTypes = {
//   expanded: { control: 'boolean', defaultValue: true },
// };
