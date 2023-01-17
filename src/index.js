import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import _ from 'lodash';

function gendiff(file1, file2) {
    const path = (file) => resolve(cwd(),file);
    const content = (path) => JSON.parse(readFileSync(path, 'utf-8'));
    
    //console.log(content(path(file1)));

    const cont1 = content(path(file1));
    const cont2 = content(path(file2));
    //console.log(cont1);
    //console.log(cont2);

    function getIsEqual(cont1, cont2) {
        const arrowKeysFile1 = Object.keys(cont1);
        const arrowKeysFile2 = Object.keys(cont2);
        const sumArrowKeys = _.sortBy(_.union(arrowKeysFile1, arrowKeysFile2));
        

        //console.log(arrowKeysFile1);
        //console.log(arrowKeysFile2);
        //console.log(sumArrowKeys);

        const result = sumArrowKeys.map((key) => {
            const value1 = cont1[key];
            //console.log(value1)
            const value2 = cont2[key];
           // console.log(value2)
            if(_.isEqual(value1, value2)){
                //console.log({type: 'unchanged', key, value: value1})
                return {
                    type: 'unchanged',
                    key,
                    value: value1,
                  }; 
            }
            if(!Object.hasOwn(cont1, key)){
                //console.log({type: 'added', key, value: value2})
                return {
                    type: 'added',
                    key,
                    value: value2,
                  }; 
            }
               if(!Object.hasOwn(cont2, key)){
                //console.log({type: 'delited', key, value: value1})
                return {
                    type: 'delited',
                    key,
                    value: value1,
                  }; 
            }
            if(!_.isEqual(value1, value2)){
                //console.log({type: 'changed', key, value: value1})
                return {
                    type: 'changed',
                    key,
                    value1,
                    value2,
                  }; 
                }
            });
        return result;
        }
       
    const genInfo = getIsEqual(cont1, cont2);
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


export default gendiff