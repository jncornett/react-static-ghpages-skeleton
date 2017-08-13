import CopyToClipboard from 'react-copy-to-clipboard';

import { BsJumbotron, BsButton } from './components/bootstrap.jsx';

import dummyGenerator from './generators/dummy-generator';
const dummyGeneratePassword = dummyGenerator(['foo', 'bar', 'dummy']);

function PasswordDisplay(props) {
  return <h1 className="display-1"><code>{props.value}</code></h1>;
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
    this.state = {
      generatedPassword: this.props.generatorFunction()
    };
    this.handleGenerate = this.handleGenerate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.generatorFunction != nextProps.generatorFunction) {
      this.setState({generatedPassword: nextProps.generatorFunction()});
    }
  }

  handleGenerate() {
    this.setState({
      generatedPassword: this.props.generatorFunction()
    });
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
