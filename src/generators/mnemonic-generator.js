import GeneratorInfo from './generator-info';
import { CountOption, BooleanOption } from './generator-options';

const MnemonicGenerator = new GeneratorInfo(
  'Mnemonic',
  function(options) {
    return import('mpass')
      .then(mpass => mpass(options.words, options.useSpecialCharacters));
  },
  {
    words: new CountOption('Number of words', 3),
    useSpecialCharacters: new BooleanOption('Use special characters')
  }
);

export default MnemonicGenerator;
