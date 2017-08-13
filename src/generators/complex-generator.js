import * as _generator from 'generate-password';

import GeneratorInfo from './generator-info';
import { CountOption, BooleanOption } from './generator-options';

function generate(options) {
  console.log(options);
  options = Object.assign({strict: true}, options);
  const pass = _generator.generate(options);
  return Promise.resolve(pass);
}

const ComplexGenerator = new GeneratorInfo(
  'Complex',
  generate,
  {
    length: new CountOption('Number of characters', 8),
    numbers: new BooleanOption('Include numbers'),
    symbols: new BooleanOption('Include symbols'),
    uppercase: new BooleanOption('Include uppercase letters'),
    excludeSimilarCharacters: new BooleanOption('Exclude similar characters (like "i" and "l")')
  }
);

export default ComplexGenerator;
