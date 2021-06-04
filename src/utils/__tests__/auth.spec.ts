import { add } from '../auth';

test('function adds numbers', () => {
  expect(add(1, 3)).toEqual(4);
  expect(add(5, 5)).toEqual(10);
  expect(add(2, 3)).toEqual(5);
});
