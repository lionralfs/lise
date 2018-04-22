const LIse = require('../src/');
const { test, expect } = require('./utils');

test('It encodes 2 strings', () => {
  const testInstance = new LIse();
  testInstance.encodeSingle('x');
  testInstance.encodeSingle('1');
  expect(testInstance.getEncodedString()).toBe('2nx2o1');
});

test('It encodes an empty string', () => {
  const testInstance = new LIse();
  testInstance.encodeSingle('');
  expect(testInstance.getEncodedString()).toBe('1a');
});

test('It encodes 2 empty strings', () => {
  const testInstance = new LIse();
  testInstance.encodeSingle('');
  testInstance.encodeSingle('');

  expect(testInstance.getEncodedString()).toBe('1a1a');
});

test('It encodes a string longer than 9', () => {
  const testInstance = new LIse();
  testInstance.encodeSingle('asdfasdfawreasdfasrwers');

  expect(testInstance.getEncodedString()).toBe('224xasdfasdfawreasdfasrwers');
});

test('It decodes a single string', () => {
  const testInstance = new LIse();
  testInstance.encodeSingle('asdfasdfawreasdfasrwers');
  expect(testInstance.decodeMultiple(1)[0]).toBe('asdfasdfawreasdfasrwers');
});

test('It decodes 2 strings', () => {
  const testInstance = new LIse();
  testInstance.encodeSingle('asdfasdfawreasdfasrwers');
  testInstance.encodeSingle('dfew');

  const res = testInstance.decodeMultiple(2);
  expect(res[0]).toBe('asdfasdfawreasdfasrwers');
  expect(res[1]).toBe('dfew');
});
