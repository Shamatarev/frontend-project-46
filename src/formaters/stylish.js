
import _ from 'lodash';

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
};


    const getNode = (array, depth = 1) => array.map((result) =>{
     const key = result.type
  
     switch (key) {
      case 'children':
        return `${separator(depth, true)}${result.key}: {\n${getNode(result.children, depth + 1).join('\n')}\n${separator(depth, true)}}`;
      case 'unchanged':
        return `${separator(depth, true)}${result.key}: ${stringify(result.value, depth)}`;
      case 'changed':
        return `${separator(depth)}- ${result.key}: ${stringify(result.value1, depth)}\n${separator(depth)}+ ${result.key}: ${stringify(result.value2, depth)}`;
      case 'added':
        return `${separator(depth)}+ ${result.key}: ${stringify(result.value, depth)}`;
      case 'deleted':
        return `${separator(depth)}- ${result.key}: ${stringify(result.value, depth)}`;
        default:
          throw new Error(`Unknown node type ${result.type}.`);
       }
     }); 
 
function generateTree (designTree) {
  return `{\n${getNode(designTree).join('\n')}\n}`;
}


export default generateTree;