class Component {
  constructor($target) {
    this.$target = $target;
    this.setInitValue();
    this.render();
    this.initEventHandlers();
  }

  setInitValue() {}

  makeTemplate() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.makeTemplate();
  }

  initEventHandlers() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}

export default Component;
