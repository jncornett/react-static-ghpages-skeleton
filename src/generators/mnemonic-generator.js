import mpass from 'mpass';

import GeneratorInfo from './generator-info';
import { CountOption, BooleanOption } from './generator-options';

function generate(options) {
  console.log(mpass);
  const pass = mpass(options.words, options.useSpecialCharacters);
  return Promise.resolve(pass);
}

const MnemonicGenerator = new GeneratorInfo(
  'Mnemonic',
  generate,
  {
    words: new CountOption('Number of words', 3),
    useSpecialCharacters: new BooleanOption('Use special characters')
  }
);

export default MnemonicGenerator;
