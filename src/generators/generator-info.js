export default class GeneratorInfo {
  constructor(name, generate, options) {
    this.name = name;
    this.generate = generate;
    this.options = options || {};
  }
}
