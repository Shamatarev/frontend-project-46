

import { test, expect, describe } from '@jest/globals';
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

const formats = ['json', 'yaml', 'yml'];

describe('gendiff', () => {
    test.each(formats)('genDiff should work with %p', (format) => {
    const file1 = getFixturePath(`file1.${format}`);
    const file2 = getFixturePath(`file2.${format}`); 
    //const filepath1 = getFixturePath(`filepath1.yml`);
    //const filepath2 = getFixturePath(`filepath2.yml`); 
    expect(gendiff(file1, file2, 'stylish')).toEqual(readFixture('expectedStylish.txt'));
    expect(gendiff(file1, file2, 'plain')).toEqual(readFixture('expectedPlain.txt'));
    expect(gendiff(file1, file2, 'json')).toEqual(readFixture('expectedJSON.txt')); 
    });  
});
