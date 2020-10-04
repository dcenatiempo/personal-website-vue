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
  template: `
    <div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: gray">
      <HamburgerButton :expanded="expanded" />
    </div>
  `,
});

// Primary.argTypes = {
//   expanded: { control: 'boolean', defaultValue: true },
// };
