const { test, mock } = require('node:test');
const assert = require('node:assert');

// Mock DOM before requiring main.js
global.document = {
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {},
};
global.window = {
  addEventListener: () => {},
  location: { pathname: '/' },
  scrollY: 0,
};
global.navigator = {
  clipboard: {
    writeText: () => Promise.resolve(),
  },
};
global.IntersectionObserver = class {
  observe() {}
  unobserve() {}
};
global.performance = {
  now: () => Date.now(),
};
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);

const { debounce } = require('./main.js');

test('debounce function', async (t) => {
  // Enable mock timers for all subtests
  mock.timers.enable();

  t.after(() => {
    mock.timers.reset();
  });

  await t.test('should call the function after the wait time', () => {
    const fn = mock.fn();
    const debounced = debounce(fn, 100);

    debounced();
    assert.strictEqual(fn.mock.callCount(), 0);

    mock.timers.tick(100);
    assert.strictEqual(fn.mock.callCount(), 1);
  });

  await t.test('should debounce multiple calls', () => {
    const fn = mock.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();
    assert.strictEqual(fn.mock.callCount(), 0);

    mock.timers.tick(50);
    debounced(); // reset timer
    assert.strictEqual(fn.mock.callCount(), 0);

    mock.timers.tick(50);
    assert.strictEqual(fn.mock.callCount(), 0);

    mock.timers.tick(50);
    assert.strictEqual(fn.mock.callCount(), 1);
  });

  await t.test('should pass arguments correctly', () => {
    const fn = mock.fn();
    const debounced = debounce(fn, 100);

    debounced('hello', 'world');
    mock.timers.tick(100);

    assert.strictEqual(fn.mock.callCount(), 1);
    assert.deepStrictEqual(fn.mock.calls[0].arguments, ['hello', 'world']);
  });

  await t.test('should execute again after wait time', () => {
    const fn = mock.fn();
    const debounced = debounce(fn, 100);

    debounced();
    mock.timers.tick(100);
    assert.strictEqual(fn.mock.callCount(), 1);

    mock.timers.tick(50); // wait some more
    debounced();
    mock.timers.tick(100);
    assert.strictEqual(fn.mock.callCount(), 2);
  });

  await t.test('should preserve "this" context', () => {
    const obj = {
      value: 42,
      fn: mock.fn(function() {
        assert.strictEqual(this.value, 42);
      })
    };
    const debounced = debounce(obj.fn, 100);

    debounced.call(obj);
    mock.timers.tick(100);

    assert.strictEqual(obj.fn.mock.callCount(), 1);
  });
});
