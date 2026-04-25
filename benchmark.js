const { performance } = require('perf_hooks');



// Since jsdom is not installed, we can write a simple DOM mock

function createMockElement(isTarget = false, isVisible = false) {
    return {
        classList: { add: () => {} },
        matches: (selector) => {
            if (selector === '.animate-on-scroll:not(.visible)') {
                return !isVisible;
            }
            return true;
        }
    };
}

class MockParent {
    constructor(childCount) {
        this.children = [];
        for (let i = 0; i < childCount; i++) {
            const child = createMockElement(true, false);
            child.parentElement = this;
            this.children.push(child);
        }
    }

    querySelectorAll(selector) {
        if (selector === '.animate-on-scroll:not(.visible)') {
            return this.children.filter(c => c.matches(selector));
        }
        return [];
    }
}

const numParents = 50;
const childrenPerParent = 100;
const entries = [];

for (let p = 0; p < numParents; p++) {
    const parent = new MockParent(childrenPerParent);
    for (const child of parent.children) {
        entries.push({
            isIntersecting: true,
            target: child
        });
    }
}

const mockObserver = { unobserve: () => {} };
global.setTimeout = (cb, ms) => {};

// Original implementation
function runOriginal() {
    const start = performance.now();
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const siblings = Array.from(entry.target.parentElement.querySelectorAll('.animate-on-scroll:not(.visible)'));
            const index = siblings.indexOf(entry.target);
            setTimeout(() => { entry.target.classList.add('visible'); }, index * 80);
            mockObserver.unobserve(entry.target);
        }
    });
    return performance.now() - start;
}

// Optimized implementation
function runOptimized() {
    const start = performance.now();
    const parentCache = new Map();
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const parent = entry.target.parentElement;
            if (!parentCache.has(parent)) {
                parentCache.set(parent, Array.from(parent.querySelectorAll('.animate-on-scroll:not(.visible)')));
            }
            const siblings = parentCache.get(parent);
            const index = siblings.indexOf(entry.target);
            setTimeout(() => { entry.target.classList.add('visible'); }, index * 80);
            mockObserver.unobserve(entry.target);
        }
    });
    return performance.now() - start;
}

// Warmup
runOriginal();
runOptimized();

let originalTime = 0;
let optimizedTime = 0;
const iterations = 50;

for (let i = 0; i < iterations; i++) {
    originalTime += runOriginal();
    optimizedTime += runOptimized();
}

console.log(`Original Avg: ${(originalTime / iterations).toFixed(2)} ms`);
console.log(`Optimized Avg: ${(optimizedTime / iterations).toFixed(2)} ms`);
console.log(`Improvement: ${((originalTime - optimizedTime) / originalTime * 100).toFixed(2)}%`);
