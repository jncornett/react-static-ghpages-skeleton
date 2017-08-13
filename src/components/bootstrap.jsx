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

export function BsCountInput(props) {
  if (props.label)
    return (
      <div className="form-group">
        <label className="form-control-label">
          {props.label}
          <input
              type="number"
              min="0"
              className="form-control"
              value={props.value}
              onChange={(e) => props.onChange && props.onChange(e.target.value)} />
        </label>
      </div>
    );

  return (
    <div className="form-group">
      <input
          type="number"
          min="0"
          className="form-control"
          value={props.value}
          onChange={(e) => props.onChange && props.onChange(e.target.value)} />
    </div>
  );
}
