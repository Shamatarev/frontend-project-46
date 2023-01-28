//import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
//import * as path from 'path';
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import getIsEqual from './designTree.js'
import getParse from './designParse.js'
import getFormat from './designFormat.js'

// const getPath = (file) => path.resolve(cwd(),file);
const indent = ' ';

const separator = (depth, full = false) => {
  const size = depth * 4;
  return full ? indent.repeat(size) : indent.repeat(size - 2);
};

const stringify = (data , depth) => {

  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${separator(depth + 1, true)}${key}: ${stringify(value, depth + 1)}`);
    return `{\n${lines.join('\n')}\n${separator(depth, true)}}`;
}

const getFileContent = (path) => readFileSync(path, 'utf-8')


//console.log(content);

function gendiff(file1, file2) {
   
    // const path1 = getPath(file1);
    // const path2 = getPath(file2)

    // console.log('path1',path1);
    // console.log('path2',path2);

    const cont1 = getFileContent(file1);
    const cont2 = getFileContent(file2);
 
    // console.log('cont1',cont1);
    // console.log('cont2',cont2);

    const dataParse1 = getParse(cont1, getFormat(file1));
    const dataParse2 = getParse(cont2, getFormat(file2));

    // console.log('dataParse1',dataParse1)
    // console.log('ddormat file 1',getFormat(file1))
    // console.log('dataParse2',dataParse2)
    
    
    const genInfo = getIsEqual(dataParse1, dataParse2);

    //console.log('genInfo',genInfo);

    const exportResult = (array, depth = 1) => array.map((result) =>{
     const key = result.type
     //const line = stringify(Object.assign({}, result.children));
     //console.log(result.children)
  
     switch (key) {
      case 'children':
        return `${separator(depth, true)}${result.key}: {\n${exportResult(result.children, depth + 1).join('\n')}\n${separator(depth, true)}}`;
      case 'unchanged':
        return `${separator(depth, true)}${result.key}: ${stringify(result.value, depth)}`;
      case 'changed':
        return `${separator(depth)}- ${result.key}: ${stringify(result.value1, depth)}\n${separator(depth)}+ ${result.key}: ${stringify(result.value2, depth)}`;
      case 'added':
        return `${separator(depth)}+ ${result.key}: ${stringify(result.value, depth)}`;
      case 'delited':
        return `${separator(depth)}- ${result.key}: ${stringify(result.value, depth)}`;
        default:
          throw new Error(`Unknown node type ${result.type}.`);
       }
     }); 
     
  return `{\n${exportResult(genInfo).join('\n')}\n}`;
}

//console.log(gendiff('__fixtures__/file1.json','__fixtures__/file2.json'))
//console.log(gendiff('__fixtures__/filepath1.yml','__fixtures__/filepath1.yml'))

export default gendiff