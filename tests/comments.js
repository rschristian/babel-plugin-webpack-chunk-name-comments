import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { transformSync } from '@babel/core';

import chunkNameCommentsPlugin from '../index.js';

const transformHelper = (input) =>
    transformSync(input, { plugins: [chunkNameCommentsPlugin] });

test('Keeps existing chunk name comment', () => {
    const input = 'import(/*webpackChunkName: "b"*/"./a.js")';
    const result = transformHelper(input);
    assert.equal(result.code, 'import(\n/*webpackChunkName: "b"*/\n"./a.js");');
});

test('Merges into existing magic comments', () => {
    const input = 'import(/*webpackMode: "lazy"*/"./a.js")';
    const result = transformHelper(input);
    assert.equal(result.code, 'import(\n/*webpackChunkName: "a"*/\n\n/*webpackMode: "lazy"*/\n"./a.js");');
});

test.run();
