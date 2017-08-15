import { BsContainer } from './components/bootstrap.jsx';
import PasswordGenerator from './password-generator.jsx';
import PasswordOptions from './password-options.jsx';

import ComplexGenerator from './generators/complex-generator';
import MnemonicGenerator from './generators/mnemonic-generator';
import WordGenerator from './generators/word-generator';

const AVAILABLE_GENERATORS = {
  ComplexGenerator,
  MnemonicGenerator,
  WordGenerator,
};

function settingKey(generator, setting) {
  return `generator:${generator}:${setting}`;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.generators = AVAILABLE_GENERATORS;
    this.initializeState();
  }

  getDefaultSetting(generator, setting) {
    return this.generators[generator].options[setting].defaultValue;
  }

  getSetting(generator, setting) {
    return this.state[settingKey(generator, setting)];
  }

  setSetting(generator, setting, value) {
    if (value == null)
      value = getDefaultSetting(generator, setting);

    this.setState({
      [settingKey(generator, setting)]: value
    });
  }

  exportSettings() {
    const exported = {};
    const generatorName = this.state.selectedGenerator;
    const generatorInfo = this.generators[generatorName];
    for (const [key, option] of Object.entries(generatorInfo.options)) {
      exported[key] = this.getSetting(generatorName, key);
    }
    return exported;
  }

  initializeState() {
    this.state = {
      selectedGenerator: Object.keys(AVAILABLE_GENERATORS)[0]
    };
    for (const [key, generatorInfo] of Object.entries(AVAILABLE_GENERATORS)) {
      for (const [name, option] of Object.entries(generatorInfo.options)) {
        this.state[settingKey(key, name)] = option.defaultValue;
      }
    }
  }

  getPasswordGenerator() {
    const generate = this.generators[this.state.selectedGenerator].generate;
    const settings = this.exportSettings();
    return () => generate(settings);
  }

  render() {
    const generatorChoices = {};
    for (const [k, v] of Object.entries(this.generators))
      generatorChoices[k] = v.name;

    const generatorOptions = {};
    for (const [k, o] of Object.entries(this.generators[this.state.selectedGenerator].options)) {
      generatorOptions[k] = {
        value: this.getSetting(this.state.selectedGenerator, k),
        option: o
      };
    }

    return (
      <div>
        <PasswordGenerator generatorFunction={this.getPasswordGenerator()} />
        <PasswordOptions
            selectedGenerator={this.state.selectedGenerator}
            generatorChoices={generatorChoices}
            onSelectGenerator={(sel) => this.setState({selectedGenerator: sel})}
            generatorOptions={generatorOptions}
            onChangeOption={(key, val) => this.setSetting(this.state.selectedGenerator, key, val)} />
      </div>
    );
  }
}
