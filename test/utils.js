module.exports = {
  test: (description, cb) => {
    try {
      cb();
    } catch (e) {
      throw new Error(`❌ ${description}\n${e}`);
    }
    return console.log(`✅ ${description}`);
  },

  expect: result => ({
    toBe: target => {
      if (result !== target) {
        throw new Error(`Expected ${target} but got ${result}`);
      }
    }
  })
};
