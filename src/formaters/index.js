import generateTree from './stylish.js';
import generateTreePlain from './plain.js';

export default (difference, format) => {
  switch (format) {
    case 'stylish':
      return generateTree(difference);
    case 'plain':
      return generateTreePlain(difference);
    case 'json':
      return JSON.stringify(difference);
    default:
      throw new Error(`The ${format} format is not supported.\nSupported output formats: stylish, plain and json.`);
  }
};
