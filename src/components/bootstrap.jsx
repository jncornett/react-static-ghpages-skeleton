import FontAwesome from 'react-fontawesome';

export function BsContainer(props) {
  return <div className="container">{props.children}</div>;
}

export function BsJumbotron(props) {
  return <div className="jumbotron"><BsContainer>{props.children}</BsContainer></div>;
}

export function BsButton(props) {
  const type = props.type || 'default';
  return (
    <button
        type="button"
        className={"btn btn-" + type}
        onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export function BsRow(props) {
  return <div className="row">{props.children}</div>;
}

export function BsCol(props) {
  const colClasses = (props.col || []).map(s => `col-${s}`);
  if (colClasses.length == 0)
    colClasses.push('col');

  return <div className={colClasses.join(' ')}>{props.children}</div>;
}

export function BsSelector(props) {
  const options = Object.entries(props.choices)
    .map(([key, name]) => <option key={key} value={key}>{name}</option>);

  if (props.label)
    return (
      <div className="form-group">
        <label className="form-control-label">
          {props.label}
          <select
              className="form-control"
              value={props.value}
              onChange={(e) => props.onChange && props.onChange(e.target.value)}>
            {options}
          </select>
        </label>
      </div>
    );

  return (
    <div className="form-group">
      <select
          className="form-control"
          value={props.value}
          onChange={(e) => props.onChange && props.onChange(e.target.value)}>
        {options}
      </select>
    </div>
  );
}

export class BsCountInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  handleIncrement(e) {
    if (this.props.onChange) {
      this.props.onChange(this.props.value + 1);
    }
  }

  handleDecrement() {
    if (this.props.onChange && this.props.value > 0) {
      this.props.onChange(this.props.value - 1);
    }
  }

  render() {
    return (
      <div className="form-group">
        <label className="form-control-label">
          {this.props.label}
          <div className="input-group">
            <input
                type="number"
                className="form-control"
                min="0"
                step="1"
                value={this.props.value}
                onChange={this.handleChange} />
            <div className="input-group-btn">
              <BsButton type="secondary" onClick={this.handleDecrement}>
                <FontAwesome name="minus" />
              </BsButton>
              <BsButton type="secondary" onClick={this.handleIncrement}>
                <FontAwesome name="plus" />
              </BsButton>
            </div>
          </div>
        </label>
      </div>
    );
  }
};

export function BsCheckbox(props) {
  return (
    <div className="form-group">
      <div className="form-check">
        <label className="form-check-label">
          <input
              type="checkbox"
              className="form-check-input"
              checked={props.value}
              onChange={(e) => props.onChange && props.onChange(e.target.checked)} />
          &nbsp;{props.label}
        </label>
      </div>
    </div>
  );
}
