
import _ from 'lodash';

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
 
function drowTree (designTree) {
  return `{\n${exportResult(designTree).join('\n')}\n}`;
}


export {drowTree, exportResult}