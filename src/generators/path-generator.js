import GeneratorInfo from './generator-info';
import { ChoiceOption, CountOption } from './generator-options';

import dummyGenerator from './dummy-generator';

const PathGenerator = new GeneratorInfo(
  'Path',
  dummyGenerator(['vsasdf', 'dasdkfd', 'asdiie']),
  {
    handLocalization: new ChoiceOption('Hand-localization', 'none', {
      none: 'None',
      left: 'Left hand',
      right: 'Right hand'
    }),
    minLength: new CountOption('Minimum length', 8),
    requireUppercase: new CountOption('Require uppercase letters', 2),
    requireLowercase: new CountOption('Require lowercase letters', 2),
    requireNumbers: new CountOption('Require numbers', 2),
    requireSpecialCharacters: new CountOption('Require special characters', 2)
  }
);

export default PathGenerator;
