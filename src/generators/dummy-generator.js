class DummyGenerator {
  constructor(choices) {
    this.index = 0;
    this.choices = choices;
  }

  generate() {
    const choice = this.choices[this.index];
    this.index = (this.index + 1) % this.choices.length;
    return choice;
  }

  asFunction() {
    return () => this.generate();
  }
}

export default function dummyGenerator(choices) {
  return new DummyGenerator(choices).asFunction();
}
