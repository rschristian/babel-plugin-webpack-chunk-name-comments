import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { transformSync } from '@babel/core';

import chunkNameCommentsPlugin from '../index.js';

const transformHelper = (input) =>
    transformSync(input, { plugins: [chunkNameCommentsPlugin] });

test('Avoids rewriting unnecessarily', () => {
    const input = 'console.log("foo")';
    const result = transformHelper(input);
    assert.equal(result.map, null);
});

test('Handles simple module paths', () => {
    const input = 'import("./a.js")';
    const result = transformHelper(input);
    assert.equal(result.code, 'import(\n/*webpackChunkName: "a"*/\n"./a.js");');
});

test('Handles nested module paths', () => {
    let input = 'import("./a/b.js")';
    let result = transformHelper(input);
    assert.equal(result.code, 'import(\n/*webpackChunkName: "a-b"*/\n"./a/b.js");');

    input = 'import("./a/b/c.js")';
    result = transformHelper(input);
    assert.equal(result.code, 'import(\n/*webpackChunkName: "a-b-c"*/\n"./a/b/c.js");');
});

// We only want to strip `-index` if more than a couple layers deep
test('Handles nested module paths ending with `-index`', () => {
    let input = 'import("./index.js")';
    let result = transformHelper(input);
    assert.equal(result.code, 'import(\n/*webpackChunkName: "index"*/\n"./index.js");');

    input = 'import("./a/index.js")';
    result = transformHelper(input);
    assert.equal(result.code, 'import(\n/*webpackChunkName: "a-index"*/\n"./a/index.js");');

    input = 'import("./a/b/index.js")';
    result = transformHelper(input);
    assert.equal(result.code, 'import(\n/*webpackChunkName: "a-b"*/\n"./a/b/index.js");');
});

test('Handles camelCased module paths', () => {
    const input = 'import("./aB.js")';
    const result = transformHelper(input);
    assert.equal(result.code, 'import(\n/*webpackChunkName: "a-b"*/\n"./aB.js");');
});

test('Handles nested camelCased module paths', () => {
    const input = 'import("./A/bC.js")';
    const result = transformHelper(input);
    assert.equal(result.code, 'import(\n/*webpackChunkName: "a-b-c"*/\n"./A/bC.js");');
});

test.run();
