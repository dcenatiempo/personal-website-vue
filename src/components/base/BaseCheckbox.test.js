import { render, fireEvent } from '@testing-library/vue';
import BaseCheckbox from './BaseCheckbox';

test('it emits true/false by default', async () => {
  const props = { id: 'some-id' };
  const utils = render(BaseCheckbox, { props });

  const button = utils.getByRole('checkbox');

  // starts false
  fireEvent.click(button);
  expect(utils.emitted().change[0][0]).toEqual(true);

  fireEvent.click(button);
  expect(utils.emitted().change[1][0]).toEqual(false);

  fireEvent.click(button);
  expect(utils.emitted().change[2][0]).toEqual(true);
});

test("it emits 0/1 if returnType is 'binary'", async () => {
  const props = { id: 'some-id', returnType: 'binary' };
  const utils = render(BaseCheckbox, { props });

  const button = utils.getByRole('checkbox');

  fireEvent.click(button);
  expect(utils.emitted().change[0][0]).toEqual(1);

  fireEvent.click(button);
  expect(utils.emitted().change[1][0]).toEqual(0);

  fireEvent.click(button);
  expect(utils.emitted().change[2][0]).toEqual(1);
});

test('it takes checked and label props', async () => {
  const props = { id: 'some-id', checked: true, label: 'my label' };
  const utils = render(BaseCheckbox, { props });

  const button = utils.getByRole('checkbox');
  const label = utils.getByText('my label');

  fireEvent.click(button);
  expect(utils.emitted().change[0][0]).toEqual(false);

  expect(label).toBeDefined();
});

test('disabled prop prevents toggle', async () => {
  const props = { id: 'some-id', disabled: true };
  const utils = render(BaseCheckbox, { props });

  const button = utils.getByRole('checkbox');

  // we cannot toggle on
  fireEvent.click(button);
  expect(utils.emitted().change).toEqual(undefined);
});

test('required prop prevents toggle off', async () => {
  const props = { id: 'some-id', required: true };
  const utils = render(BaseCheckbox, { props });

  const button = utils.getByRole('checkbox');

  // we are able to toggle on
  fireEvent.click(button);
  expect(utils.emitted().change[0][0]).toEqual(true);

  // but we are not able to toggle off
  fireEvent.click(button);
  expect(utils.emitted().change[1]).toEqual(undefined);
});
