import _ from 'lodash';

const stringify = (data) => {
    if (_.isPlainObject(data)) {
      return '[complex value]';
    }
    if (typeof data === 'string') {
    return `'${data}'`;
    }
    return String(data);
};
  
const designPath = (node, path) => (path !== '' ? `${path}.${node.key}` : String(node.key));

  const exportNode = (array, path) => array.filter((node) => node.type !== 'unchanged').map((node) =>{
    const key = node.type
    const allPath = designPath(node, path)
 
    switch (key) {
     case 'children':
       return `${exportNode(node.children, allPath).join('\n')}`;
     case 'changed':
       return `Property '${allPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
     case 'added':
       return `Property '${allPath}' was added with value: ${stringify(node.value)}`;
     case 'delited':
       return `Property '${allPath}' was removed`;
       default:
         throw new Error(`Unknown node type ${node.type}.`);
      }
    }); 

function drowTreePlain (designTree) {
 return `${exportNode(designTree, '').join('\n')}`;
}
export default drowTreePlain;