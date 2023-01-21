

import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
//console.log(__filename)
const __dirname = dirname(__filename);
console.log(__dirname)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');



test('gendiff', () => {
const file1 = getFixturePath(`file1.json`);
const file2 = getFixturePath(`file2.json`); 
const filepath1 = getFixturePath(`filepath1.yml`);
const filepath2 = getFixturePath(`filepath2.yml`); 

expect(gendiff(file1,file2)).toEqual(readFixture('expected.txt'));
expect(gendiff(filepath1,filepath2)).toEqual(readFixture('expected.txt'));
});