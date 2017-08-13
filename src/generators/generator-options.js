class BaseOption {
  constructor(type, text, defaultValue) {
    this.type = type;
    this.text = text;
    this.defaultValue = defaultValue;
  }
};

export class ChoiceOption extends BaseOption {
  constructor(text, defaultValue, choices) {
    super('choice', text, defaultValue);
    this.choices = choices;
  }
};

export class CountOption extends BaseOption {
  constructor(text, defaultCount) {
    super('count', text, defaultCount);
  }
};

export class BooleanOption extends BaseOption {
  constructor(text, defaultValue) {
    super('boolean', text, !!defaultValue);
  }
}
