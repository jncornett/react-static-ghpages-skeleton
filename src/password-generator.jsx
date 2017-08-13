import CopyToClipboard from 'react-copy-to-clipboard';

import { BsJumbotron, BsButton } from './components/bootstrap.jsx';

function getDisplayClass(value) {
  if (value.length < 6)
    return 'display-1';
  else if (value.length < 6)
    return 'display-2';
  else if (value.length < 8)
    return 'display-3';
  else if (value.length < 10)
    return 'display-4';
  else if (value.length < 13)
    return 'h1';
  else if (value.length < 16)
    return 'h2';
  else if (value.length < 19)
    return 'h3';
  else if (value.length < 22)
    return 'h4';
  else if (value.length < 26)
    return 'h5';
  else if (value.length < 32)
    return 'h6';

  return 'small';
}

function PasswordDisplay(props) {
  const displayClass = getDisplayClass(props.value || '');
  return <p className={displayClass}><code>{props.value}</code></p>;
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
