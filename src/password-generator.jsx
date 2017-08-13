import CopyToClipboard from 'react-copy-to-clipboard';

import { BsJumbotron, BsButton } from './components/bootstrap.jsx';

import dummyGenerator from './generators/dummy-generator';
const dummyGeneratePassword = dummyGenerator(['foo', 'bar', 'dummy']);

function getDisplayClass(value) {
  if (value.length < 10)
    return 'display-1';
  else if (value.length < 20)
    return 'display-2';
  else if (value.length < 30)
    return 'display-3';
  else if (value.length < 40)
    return 'display-4';
  else if (value.length < 50)
    return 'display-5';
  return 'display-6';
}

function PasswordDisplay(props) {
  const displayClass = getDisplayClass(props.value || '');
  console.log('displayClass for', props.value, displayClass);
  return <h1 className={displayClass}><code>{props.value}</code></h1>;
}

class PasswordToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value != nextProps.value) {
      this.setState({copied: false});
    }
  }

  render() {
    return (
      <div className="btn-toolbar">
        <div className="btn-group mr-2">
          <BsButton type="outline-primary" onClick={this.props.onClick}>
            Generate another
          </BsButton>
        </div>
        <div className="btn-group mr-2">
          <CopyToClipboard
              text={this.props.value}
              onCopy={() => this.setState({copied: true})}>
            <BsButton type="outline-secondary">Copy</BsButton>
          </CopyToClipboard>
        </div>
        {this.state.copied && <span>Copied!</span>}
      </div>
    );
  }
}

export default class PasswordGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.generatorFunction().then(pass => this.setState({generatedPassword: pass}));
    this.handleGenerate = this.handleGenerate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.generatorFunction != nextProps.generatorFunction) {
      nextProps.generatorFunction().then(pass => this.setState({generatedPassword: pass}));
    }
  }

  handleGenerate() {
    this.props.generatorFunction().then(pass => this.setState({generatedPassword: pass}));
  }

  render() {
    return (
      <BsJumbotron>
        <PasswordDisplay value={this.state.generatedPassword} />
        <hr />
        <PasswordToolbar value={this.state.generatedPassword} onClick={this.handleGenerate} />
      </BsJumbotron>
    );
  }
}
