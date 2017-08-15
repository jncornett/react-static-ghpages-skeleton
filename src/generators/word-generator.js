import GeneratorInfo from './generator-info';
import { CountOption } from './generator-options';

const WORD_LIST_URL = 'https://raw.githubusercontent.com/jacksonrayhamilton/wordlist-english/master/english-words.json';

function randomChoice(seq) {
  return seq[Math.floor(Math.random() * seq.length)];
}

const WordGenerator = new GeneratorInfo(
  'Word',
  function(options) {
    return import('./data/english-words.json').then(words => {
      const pass = [];
      for (let i = 0; i < options.minWords; i++)
        pass.push(randomChoice(words));
      return pass.join('');
    });
  },
  {
    minWords: new CountOption('Minimum words', 4)
  }
);

export default WordGenerator;
