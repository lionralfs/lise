const LIse = require('../src/');

const testInstance = new LIse();

testInstance.encodeSingle('x');
testInstance.encodeSingle('1');
if (testInstance.getEncodedString() !== '2nx2o1') {
  throw new Error('Test failed');
}

// TODO: add more tests
