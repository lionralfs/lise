const LIse = require('../src/');
const { test, expect } = require('./utils');

test('2 encodings', () => {
  const testInstance = new LIse();
  testInstance.encodeSingle('x');
  testInstance.encodeSingle('1');
  expect(testInstance.getEncodedString()).toBe('2nx2o1');
});

test('empty string', () => {
  const testInstance = new LIse();
  testInstance.encodeSingle('');
  expect(testInstance.getEncodedString()).toBe('1a');
});

test('2 empty strings', () => {
  const testInstance = new LIse();
  testInstance.encodeSingle('');
  testInstance.encodeSingle('');

  expect(testInstance.getEncodedString()).toBe('1a1a');
});
