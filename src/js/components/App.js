import { $ } from '../utils/dom.js';
import Calculator from './Calculator.js';
import Component from './Component.js';

class App extends Component {
  constructor($target) {
    super($target);
    this.calculator = new Calculator($('.calculator-box'));
  }

  makeTemplate() {
    return `<header>
      <h1>vanilla-calculator</h1>
    </header>
    <section class="calculator-box"></section>`;
  }
}

export default App;
