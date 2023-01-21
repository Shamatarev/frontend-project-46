
//import _ from 'lodash';
import YAML from 'js-yaml';

 const getParse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return YAML.load(data);
    default:
      throw new Error(`Unknown format ${format}.\nSupported formats: json, yml.`);
  }
};



export default getParse;