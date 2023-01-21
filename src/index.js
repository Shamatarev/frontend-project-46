//import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
//import * as path from 'path';
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import getIsEqual from './designTree.js'
import getParse from './designParse.js'
import getFormat from './designFormat.js'

// const getPath = (file) => path.resolve(cwd(),file);

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
    //console.log(genInfo);
    const exportResult = genInfo.map((result) =>{
     const key = result.type
     switch (key) {
      case 'unchanged':
        return `  ${result.key}: ${result.value}`;
      case 'changed':
          return `- ${result.key}: ${result.value1}\n+ ${result.key}: ${result.value2}`;
      case 'added':
        return `+ ${result.key}: ${result.value}`;
      case 'delited':
        return `- ${result.key}: ${result.value}`;
      default:
        return null;
       }
     }); 
  return `{\n${exportResult.join('\n')}\n}`;
}

//console.log(gendiff('__fixtures__/file1.json','__fixtures__/file2.json'))
//console.log(gendiff('__fixtures__/filepath1.yml','__fixtures__/filepath1.yml'))

export default gendiff