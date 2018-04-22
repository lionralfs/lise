module.exports = {
  test: (description, cb) => {
    try {
      cb();
    } catch (e) {
      console.log(`❌ ${description}\n${e}`);
      return process.exit(1);
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
