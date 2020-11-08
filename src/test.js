import { objectGrep } from './index';

test('base test', () => {
  expect(objectGrep({foo: 'bar'}, 'foo')).toBe('bar');
});
