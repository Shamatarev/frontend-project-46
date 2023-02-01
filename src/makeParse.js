import YAML from 'js-yaml';

const makeParse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml': case 'yaml': return YAML.load(data);
    default:
      throw new Error(`Unknown format ${format}.\nSupported formats: json, yml.`);
  }
};

export default makeParse;
