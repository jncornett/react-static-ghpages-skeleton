import GeneratorInfo from './generator-info';
import { CountOption } from './generator-options';

import dummyGenerator from './dummy-generator';

const WordGenerator = new GeneratorInfo(
  'Word',
  dummyGenerator(['funnyfox', 'fantasticfrog', 'cuddlycat']),
  {
    minWords: new CountOption('Minimum words', 4)
  }
);

export default WordGenerator;
