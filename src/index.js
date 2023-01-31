import { readFileSync } from 'node:fs';
// eslint-disable-next-line import/extensions
import makeParse from './makeParse.js';
// eslint-disable-next-line import/extensions
import makeFormat from './makeFormat.js';
// eslint-disable-next-line import/extensions
import functionFormat from './formaters/index.js';
// eslint-disable-next-line import/extensions
import makeTree from './makeTree.js';

const getFileContent = (path) => readFileSync(path, 'utf-8');

function gendiff(filePath1, filePath2, format = 'stylish') {
  const dataParse1 = makeParse(getFileContent(filePath1), makeFormat(filePath1));
  const dataParse2 = makeParse(getFileContent(filePath2), makeFormat(filePath2));
  const difference = makeTree(dataParse1, dataParse2);
  return functionFormat(difference, format);
}

export default gendiff;
