
import { drowTree } from './stylish.js'


export default (difference, format) => {
  switch (format) {
    case 'stylish':
        return drowTree(difference);
    default:
      throw new Error(`The ${format} format is not supported.\nSupported output formats: stylish, plain and json.`);
  }
};