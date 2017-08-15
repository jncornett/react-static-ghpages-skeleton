import GeneratorInfo from './generator-info';
import { CountOption, BooleanOption } from './generator-options';

const ComplexGenerator = new GeneratorInfo(
  'Complex',
  function(options) {
    options = Object.assign({ strict: true }, options);
    return import('generate-password')
      .then(g => g.generate(options));
  },
  {
    length: new CountOption('Number of characters', 8),
    numbers: new BooleanOption('Include numbers'),
    symbols: new BooleanOption('Include symbols'),
    uppercase: new BooleanOption('Include uppercase letters'),
    excludeSimilarCharacters: new BooleanOption('Exclude similar characters (like "i" and "l")')
  }
);

export default ComplexGenerator;
