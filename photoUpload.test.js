const { test, mock } = require('node:test');
const assert = require('node:assert');

// Simple DOM Mock setup
const createMockElement = (tag) => {
  return {
    tagName: tag.toUpperCase(),
    style: {},
    children: [],
    attributes: {},
    textContent: '',
    innerHTML: '',
    disabled: false,
    files: [],
    classList: {
      toggle: mock.fn(),
      add: mock.fn(),
      remove: mock.fn()
    },
    querySelectorAll: () => [],
    closest: () => ({ querySelector: () => null }),
    appendChild: function(child) {
      if (!this.children) this.children = [];
      this.children.push(child);
    },
    addEventListener: mock.fn(),
    setAttribute: function(name, value) {
      this.attributes[name] = value;
    },
    createTextNode: function(text) {
      return { nodeType: 3, textContent: text };
    }
  };
};

const mockDocument = {
  elements: {},
  querySelector: mock.fn((selector) => {
    if (!mockDocument.elements[selector]) {
      mockDocument.elements[selector] = createMockElement(
        selector.startsWith('#') ? 'DIV' : 'DIV'
      );
    }
    return mockDocument.elements[selector];
  }),
  querySelectorAll: () => [],
  addEventListener: () => {},
  createElement: createMockElement,
  createTextNode: (text) => ({ nodeType: 3, textContent: text }),
};

global.document = mockDocument;
global.window = {
  addEventListener: () => {},
  location: { pathname: '/' },
  scrollY: 0,
};
global.navigator = {
  clipboard: { writeText: () => Promise.resolve() },
};
global.IntersectionObserver = class { observe() {} unobserve() {} };
global.performance = { now: () => Date.now() };
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);

// Mock alert
global.alert = mock.fn();

// Mock FileReader
class MockFileReader {
  constructor() {
    this.result = null;
    this.onload = null;
  }
  readAsDataURL(file) {
    this.result = 'data:image/png;base64,mockdata';
    if (typeof this.onload === 'function') {
      this.onload({ target: { result: this.result } });
    }
  }
}
global.FileReader = MockFileReader;

// Require main.js AFTER setting up globals to trigger the IIFE
require('./main.js');

test('Photo Upload - Read and display preview safely without innerHTML', async (t) => {
  const uploadInput = document.querySelector('#photo-upload');
  const uploadPreview = document.querySelector('#upload-preview');
  const uploadBtn = document.querySelector('#upload-btn');

  // Verify the event listener was attached
  assert.strictEqual(uploadInput.addEventListener.mock.callCount(), 1);
  const changeHandler = uploadInput.addEventListener.mock.calls[0].arguments[1];

  // Set up mock file and trigger change
  const mockFile = { type: 'image/png', size: 1024 };
  const mockEvent = { target: { files: [mockFile] } };

  // Trigger change event, this should read file and call onload
  changeHandler(mockEvent);

  // Validate the resulting DOM structure in uploadPreview
  assert.strictEqual(uploadPreview.children.length, 2, 'Should have exactly 2 children (img and p)');

  const img = uploadPreview.children[0];
  const p = uploadPreview.children[1];

  assert.strictEqual(img.tagName, 'IMG');
  assert.strictEqual(img.src, 'data:image/png;base64,mockdata');
  assert.strictEqual(img.alt, 'Preview');
  assert.strictEqual(img.style.maxWidth, '100%');

  assert.strictEqual(p.tagName, 'P');
  assert.strictEqual(p.textContent, 'Ready to analyze');
  assert.strictEqual(p.style.color, 'var(--color-text-secondary)');

  assert.strictEqual(uploadBtn.disabled, false);
});
