// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
// eslint-disable-next-line import/extensions
import gendiff from '../src/index.js';

const filename1 = fileURLToPath(import.meta.url);
const dirname1 = dirname(filename1);

const getFixturePath = (filename) => path.join(dirname1, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yaml', 'yml'];

describe('gendiff', () => {
  test.each(formats)('genDiff should work with %p', (format) => {
    const file1 = getFixturePath(`file1.${format}`);
    const file2 = getFixturePath(`file2.${format}`);

    expect(gendiff(file1, file2, 'stylish')).toEqual(readFixture('expectedStylish.txt'));
    expect(gendiff(file1, file2, 'plain')).toEqual(readFixture('expectedPlain.txt'));
    expect(gendiff(file1, file2, 'json')).toEqual(readFixture('expectedJSON.txt'));
  });
});
