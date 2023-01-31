import _ from 'lodash';
import path from 'path';

const makeFormat = (filepath = 'json') => _.trim(path.extname(filepath), '.');

export default makeFormat;
