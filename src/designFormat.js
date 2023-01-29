
import _ from 'lodash';
import path from 'path';

const getFormat = (filepath = 'json') => _.trim(path.extname(filepath), '.');
//console.log(getFormat('__fixtures__/file1.json'))

export default getFormat