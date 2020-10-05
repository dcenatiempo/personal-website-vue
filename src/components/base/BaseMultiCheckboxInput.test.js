import { render, fireEvent } from '@testing-library/vue';
import BaseMultiCheckboxInput from './BaseMultiCheckboxInput';

// props:
//   id
//   options
//   valuevs
//   labelExtractor
//   keyExtractor
//   required
//   disabled
//   returnType

test('it requires an id prop', () => {
  console.error = jest.fn();

  const props = { id: null };
  render(BaseMultiCheckboxInput, { props });

  expect(console.error).toHaveBeenCalled();
});

// array of primitives
test('it handles an array of number/string options', () => {
  const props = { id: 'some-id', value: ['b'], options: ['a', 'b', 'c'] };
  const utils = render(BaseMultiCheckboxInput, { props });

  const a = utils.getByText('a');
  const b = utils.getByText('b');

  fireEvent.click(a);
  expect(utils.emitted().change[0][0]).toEqual(['b', 'a']);

  fireEvent.click(a);
  expect(utils.emitted().change[1][0]).toEqual(['b']);

  fireEvent.click(b);
  expect(utils.emitted().change[2][0]).toEqual([]);
});

test('disabled prop prevents toggle', () => {
  const props = {
    id: 'some-id',
    value: ['b'],
    options: ['a', 'b', 'c'],
    disabled: true,
  };
  const utils = render(BaseMultiCheckboxInput, { props });

  const a = utils.getByText('a');

  fireEvent.click(a);
  expect(utils.emitted().change).not.toBeDefined();
});

test('required prop prevents toggle off', () => {
  const props = {
    id: 'some-id',
    value: [],
    options: ['a', 'b', 'c'],
    required: true,
  };
  const utils = render(BaseMultiCheckboxInput, { props });

  const a = utils.getByText('a');

  fireEvent.click(a);
  expect(utils.emitted().change[0][0]).toEqual(['a']);

  fireEvent.click(a);
  expect(utils.emitted().change[1]).not.toBeDefined();
});

// array of objects
test('it handles an array of object options and emits array of object', () => {
  const props = {
    id: 'some-id',
    value: null,
    options: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
    labelExtractor: 'id',
    keyExtractor: 'id',
  };
  const utils = render(BaseMultiCheckboxInput, { props });

  const a = utils.getByText('a');

  fireEvent.click(a);
  expect(utils.emitted().change[0][0]).toEqual([{ id: 'a' }]);

  fireEvent.click(a);
  expect(utils.emitted().change[1][0]).toEqual([]);
});

test('it handles an array of object options and emits array of key', () => {
  const props = {
    id: 'some-id',
    value: null,
    options: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
    labelExtractor: 'id',
    keyExtractor: 'id',
    returnType: 'key',
  };
  const utils = render(BaseMultiCheckboxInput, { props });

  const a = utils.getByText('a');

  fireEvent.click(a);
  expect(utils.emitted().change[0][0]).toEqual(['a']);
});

test('it extracts key/label with string', () => {
  const props = {
    id: 'some-id',
    value: null,
    options: [
      { data: { id: 'a' }, meta: { label: 'A label' } },
      { data: { id: 'b' }, meta: { label: 'B label' } },
      { data: { id: 'c' }, meta: { label: 'C label' } },
    ],
    labelExtractor: 'meta.label',
    keyExtractor: 'data.id',
    returnType: 'key',
  };
  const utils = render(BaseMultiCheckboxInput, { props });

  const a = utils.getByText('A label');

  fireEvent.click(a);
  expect(utils.emitted().change[0][0]).toEqual(['a']);
});

test('it extracts key/label with function', () => {
  const props = {
    id: 'some-id',
    value: null,
    options: [
      { data: { id: 1 }, meta: { label: 'a' } },
      { data: { id: 2 }, meta: { label: 'b' } },
      { data: { id: 3 }, meta: { label: 'c' } },
    ],
    labelExtractor: option => option?.meta?.label + ' label',
    keyExtractor: option => option?.data?.id,
    returnType: 'key',
  };
  const utils = render(BaseMultiCheckboxInput, { props });

  const a = utils.getByText('a label');

  fireEvent.click(a);
  expect(utils.emitted().change[0][0]).toEqual([1]);
});

test('it accepts an key as value', () => {
  const props = {
    id: 'some-id',
    value: [10],
    options: [
      { id: 1, label: 'a' },
      { id: 2, label: 'b' },
      { id: 3, label: 'c' },
    ],
    labelExtractor: 'label',
    keyExtractor: option => (option?.id || 0) * 10,
    required: true,
    returnType: 'key',
  };
  const utils = render(BaseMultiCheckboxInput, { props });

  const a = utils.getByText('a');
  const b = utils.getByText('b');

  // no event since its required, and value (10) is selected key
  fireEvent.click(a);
  expect(utils.emitted().change).not.toBeDefined();

  // 20 is the new selected item's key
  fireEvent.click(b);
  expect(utils.emitted().change[0][0]).toEqual([10, 20]);
});
