import _ from 'lodash';

function makeTree(cont1, cont2) {
    const arrowKeysFile1 = Object.keys(cont1);
    const arrowKeysFile2 = Object.keys(cont2);
    const sumArrowKeys = _.sortBy(_.union(arrowKeysFile1, arrowKeysFile2));

    const result = sumArrowKeys.map((key) => {
    const value1 = cont1[key];
    const value2 = cont2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return { 
            type: 'children', 
            key, 
            children: makeTree(value1, value2)  
         };
    }
    if(_.isEqual(value1, value2)){
        return {
            type: 'unchanged',
            key,
            value: value1,
          }; 
    }
    if(!Object.hasOwn(cont1, key)){
        return {
            type: 'added',
            key,
            value: value2,
          }; 
    }
       if(!Object.hasOwn(cont2, key)){
        return {
            type: 'deleted',
            key,
            value: value1,
          }; 
    }
    if(!_.isEqual(value1, value2)){
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

export default makeTree;