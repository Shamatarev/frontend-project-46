import _ from 'lodash';

function getIsEqual(cont1, cont2) {
    const arrowKeysFile1 = Object.keys(cont1);
    const arrowKeysFile2 = Object.keys(cont2);
    const sumArrowKeys = _.sortBy(_.union(arrowKeysFile1, arrowKeysFile2));
    
  
    //console.log(arrowKeysFile1);
    //console.log(arrowKeysFile2);
    //console.log(sumArrowKeys);
  const result = sumArrowKeys.map((key) => {
    const value1 = cont1[key];
    const value2 = cont2[key];



    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      //console.log('value1', value1)
      //console.log('value2', value2)
        return { 
            type: 'children', 
            key, 
            children: getIsEqual(value1, value2)  
         };
    }
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
// console.log('tree result',result)
return result;
}

export default getIsEqual;