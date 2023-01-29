//import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
//import * as path from 'path';
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import getIsEqual from './designTree.js'
import getParse from './designParse.js'
import getFormat from './designFormat.js'
import functionFormat from './formaters/index.js'
// const getPath = (file) => path.resolve(cwd(),file);



//console.log(content);

function gendiff(file1, file2, format = 'stylish') {
   
    const getFileContent = (path) => readFileSync(path, 'utf-8')
    
    const cont1 = getFileContent(file1);
    const cont2 = getFileContent(file2);
 
    // console.log('cont1',cont1);
    // console.log('cont2',cont2);

    const dataParse1 = getParse(cont1, getFormat(file1));
    const dataParse2 = getParse(cont2, getFormat(file2));

     //console.log('dataParse1',dataParse1)
     //console.log('format file 1',getFormat(file1))
    //console.log('dataParse2',dataParse2)
     const difference = getIsEqual(dataParse1, dataParse2)
      //console.log('difference',difference)
      //console.log('format', format)
      //console.log('functionFormat',drowTree(difference))
    return functionFormat(difference, format)
}
  

//console.log(gendiff('__fixtures__/file1.json','__fixtures__/file2.json'))
//console.log(gendiff('__fixtures__/filepath1.yml','__fixtures__/filepath1.yml'))

export default gendiff