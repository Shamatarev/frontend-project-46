
import { drowTree } from './stylish.js'
import drowTreePlain from './plain.js';


export default (difference, format) => {
  switch (format) {
    case 'stylish':
        return drowTree(difference);
    case 'plain':
        return drowTreePlain(difference);
    case 'json':
        return JSON.stringify(difference);       
    default:
      throw new Error(`The ${format} format is not supported.\nSupported output formats: stylish, plain and json.`);
  }
};