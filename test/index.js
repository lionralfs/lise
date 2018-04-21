const LIse = require('../src/');

let testInstance = new LIse();
testInstance.encodeSingle('x');
testInstance.encodeSingle('1');
if (testInstance.getEncodedString() !== '2nx2o1') {
  throw new Error('Test failed');
}

testInstance = new LIse();
testInstance.encodeSingle('');
if (testInstance.getEncodedString() !== '1a') {
  throw new Error('Test failed');
}

testInstance = new LIse();
testInstance.encodeSingle('');
testInstance.encodeSingle('');
if (testInstance.getEncodedString() !== '1a1a') {
  throw new Error('Test failed');
}

// TODO: add more tests
