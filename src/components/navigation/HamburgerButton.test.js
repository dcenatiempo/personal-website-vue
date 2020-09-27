import { render, fireEvent } from '@testing-library/vue';
import HamburgerButton from './HamburgerButton';

test('emits expanded on button press', async () => {
  const utils = render(HamburgerButton);

  const button = utils.getByRole('button');

  // starts false
  fireEvent.click(button);
  expect(utils.emitted().click[0][0]).toEqual(true);

  fireEvent.click(button);
  expect(utils.emitted().click[1][0]).toEqual(false);

  fireEvent.click(button);
  expect(utils.emitted().click[2][0]).toEqual(true);
});

test('takes expanded prop', async () => {
  const props = { expanded: true };
  const utils = render(HamburgerButton, { props });

  const button = utils.getByRole('button');

  // starts true
  fireEvent.click(button);
  expect(utils.emitted().click[0][0]).toEqual(false);

  fireEvent.click(button);
  expect(utils.emitted().click[1][0]).toEqual(true);

  fireEvent.click(button);
  expect(utils.emitted().click[2][0]).toEqual(false);
});
