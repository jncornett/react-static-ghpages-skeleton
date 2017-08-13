import uuidv4 from 'uuid/v4';

import { BsContainer, BsSelector, BsCountInput, BsRow, BsCol } from './components/bootstrap.jsx';

export default function PasswordOptions(props) {
  const options = Object.entries(props.generatorOptions).map(([k, v]) => {
    switch(v.option.type) {
      case 'choice':
        return (
          <BsSelector
              key={k}
              label={v.option.text}
              choices={v.option.choices}
              value={v.value}
              onChange={(val) => props.onChangeOption && props.onChangeOption(k, val)} />
        );
      case 'count':
        return (
          <BsCountInput
              key={k}
              label={v.option.text}
              value={v.value}
              onChange={(val) => props.onChangeOption && props.onChangeOption(k, val)} />
        );
    }
    return null;
  }).filter(o => o);
  return (
    <BsContainer>
      <BsRow>
        <BsCol col={["md-6"]}>
          <h4>Generator</h4>
          <div className="form">
            <BsSelector
              value={props.selectedGenerator}
              choices={props.generatorChoices}
              onChange={props.onSelectGenerator} />
          </div>
        </BsCol>
        <BsCol col={["md-6"]}>
          <h4>Options</h4>
          <div className="form">
            {options}
          </div>
        </BsCol>
      </BsRow>
    </BsContainer>
  );
};
